export interface ComponentProp {
  [key: string]: any;
}
export interface ComponentMethod {
  [key: string]: (...args: any[]) => any;
}
