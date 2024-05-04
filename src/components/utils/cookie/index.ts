interface ICookieOptions {
  name: string
  value: string
  exdays?: number
  path?: string
  domain?: string
}

// 设置cookie
export function setCookie({ name, value = '', exdays, domain, path = '/' }: ICookieOptions) {
  if (name) {
    const _domain = domain ? `domain=${domain};` : ''
    const _path = `path=${path}`
    let expires = ''
    // create the expiration date
    if (exdays) {
      const d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      expires = `expires=${d.toUTCString()}`
    }

    document.cookie = `${name}=${value};${_domain}${_path};${expires}`

    return true
  }
  return false
}
