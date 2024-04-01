import type { Request } from '.'

declare global {
  interface Window {
    $: {
      post: Request['post']
      get: Request['get']
    }
  }
}

export interface CustomConfig {
  showMsg?: boolean
}
