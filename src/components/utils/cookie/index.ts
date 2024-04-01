type ICookieOptions = {
  name: string
  value: string
  exdays?: number
  path?: string
  domain?: string
}

//设置cookie
export function setCookie({ name, value = '', exdays, domain, path = '/' }: ICookieOptions) {
  if (name) {
    let _domain = domain ? 'domain=' + domain + ';' : ''
    let _path = 'path=' + path
    let expires = ''
    // create the expiration date
    if (exdays) {
      let d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      expires = 'expires=' + d.toUTCString()
    }

    document.cookie = name + '=' + value + ';' + _domain + _path + ';' + expires

    return true
  }
  return false
}
