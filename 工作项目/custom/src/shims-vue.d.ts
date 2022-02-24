/* eslint-disable */

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare module '*.js'
declare module 'VConsole.js'
declare module 'hammerjs'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}