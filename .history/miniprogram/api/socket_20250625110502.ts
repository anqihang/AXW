// 微信小程序 WebSocket 多连接封装（socketTask 方式）

const SOCKET_URL = "wss://your-server-url/ws"; // 默认 WebSocket 地址

type SocketInstance = {
  socketTask: WechatMiniprogram.SocketTask | null;
  socketOpen: boolean;
  socketMsgQueue: string[];
  heartbeatTimer?: number;
};

const sockets: Record<string, SocketInstance> = {};

const HEARTBEAT_INTERVAL = 15000; // 15秒心跳
const HEARTBEAT_MSG = "__ping__"; // 心跳消息内容

/**
 * 启动心跳
 */
function startHeartbeat(key: string) {
  const instance = sockets[key];
  if (!instance) return;
  stopHeartbeat(key); // 避免重复
  instance.heartbeatTimer = setInterval(() => {
    if (instance.socketOpen) {
      sendSocketMessage(key, HEARTBEAT_MSG);
    }
  }, HEARTBEAT_INTERVAL) as unknown as number;
}

/**
 * 停止心跳
 */
function stopHeartbeat(key: string) {
  const instance = sockets[key];
  if (instance && instance.heartbeatTimer) {
    clearInterval(instance.heartbeatTimer);
    instance.heartbeatTimer = undefined;
  }
}

/**
 * 创建或获取指定 key 的 socket 连接
 * @param key 唯一标识（如业务名）
 * @param url 可选，WebSocket 地址
 */
export function connectSocket(key: string, url: string = SOCKET_URL) {
  if (sockets[key]?.socketTask) {
    return; // 已连接
  }
  const instance: SocketInstance = {
    socketTask: wx.connectSocket({ url }),
    socketOpen: false,
    socketMsgQueue: [],
  };
  sockets[key] = instance;

  instance.socketTask!.onOpen(() => {
    instance.socketOpen = true;
    console.log(`[${key}] WebSocket 已打开`);
    instance.socketMsgQueue.forEach((msg) => sendSocketMessage(key, msg));
    instance.socketMsgQueue = [];
    startHeartbeat(key); // 启动心跳
  });

  instance.socketTask!.onError((err) => {
    instance.socketOpen = false;
    console.error(`[${key}] WebSocket 连接打开失败`, err);
    stopHeartbeat(key);
  });

  instance.socketTask!.onClose(() => {
    instance.socketOpen = false;
    instance.socketTask = null;
    console.log(`[${key}] WebSocket 已关闭`);
    stopHeartbeat(key);
  });
}

/**
 * 发送消息
 */
export function sendSocketMessage(key: string, msg: string) {
  const instance = sockets[key];
  if (instance && instance.socketOpen && instance.socketTask) {
    instance.socketTask.send({
      data: msg,
      success() {
        console.log(`[${key}] 消息已发送`, msg);
      },
      fail(err) {
        console.error(`[${key}] 消消息发送失败`, err);
      },
    });
  } else if (instance) {
    instance.socketMsgQueue.push(msg);
  } else {
    console.warn(`[${key}] socket 未连接，消息未发送`);
  }
}

/**
 * 关闭连接
 */
export function closeSocket(key: string) {
  const instance = sockets[key];
  if (instance && instance.socketTask) {
    instance.socketTask.close({});
  }
}

/**
 * 监听消息
 */
export function onSocketMessage(
  key: string,
  callback: (msg: WechatMiniprogram.SocketTaskOnMessageListenerResult) => void
) {
  const instance = sockets[key];
  if (instance && instance.socketTask) {
    instance.socketTask.onMessage((data) => {
      // 监听心跳断开（如后端返回特定断开消息或无响应可自定义处理）
      if (typeof data.data === "string" && data.data === "__pong__") {
        // 收到心跳响应，可在此处做心跳健康标记
        // console.log(`[${key}] 心跳响应`);
      } else {
        callback(data);
      }
    });

    // 监听连接关闭，自动重连
    instance.socketTask.onClose(() => {
      instance.socketOpen = false;
      instance.socketTask = null;
      stopHeartbeat(key);
      console.log(`[${key}] WebSocket 已关闭，准备重连`);
      // 延迟重连，避免频繁重连
      setTimeout(() => {
        connectSocket(key);
      }, 2000);
    });
  }
}
