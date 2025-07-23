import { readFile, writeFile } from "node:fs/promises";
import { getIconsCSS } from "@iconify/utils";
import { locate } from "@iconify/json";

/**
 * List of icons. Key is icon set prefix, value is array of icons
 *
 * @type {Record<string, string[]>}
 */
const icons = {
  mdi: ["home", "menu", "account-outline", "password-outline", "form-textbox-password", "eye-outline", "eye-off"],// 睁眼，闭眼
  "mdi-light": ["circle", "help-circle"],// 圆圈，圆圈问号
  tabler: ["search"], // 搜索
  gg: ["close-o"], // 圆圈叉号
  "line-md": ["confirm"], // 对号
  "icon-park-outline": ["right"], // 右箭头
  "material-symbols-light": ["error-outline"], // 圆圈叹号
  codicon: ["error"], // 圆圈叉号
  iconoir: ["warning-circle", "info-circle"], // 圆圈叹号，圆圈反叹号
  bxs: ["like"], // 点赞
};

// Parse each icon set
let code = "";
for (const prefix in icons) {
  // Find location of .json file
  const filename = locate(prefix);

  // Load file and parse it
  /** @type {import("@iconify/types").IconifyJSON} */
  const iconSet = JSON.parse(await readFile(filename, "utf8"));

  // Get CSS
  const css = getIconsCSS(iconSet, icons[prefix]);

  // Add it to code
  code += css;
}

// Save CSS file
await writeFile("miniprogram/assets/icon.scss", code, "utf8");
console.log(`Saved CSS (${code.length} bytes)`);
