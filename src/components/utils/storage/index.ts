const storage = {
  getItem(key: string) {
    const value = window.localStorage.getItem(key)
    return JSON.parse(value)
  },
  setItem(key: string, value: any) {
    return window.localStorage.setItem(key, JSON.stringify(value))
  },
  removeItem(key: string) {
    return window.localStorage.removeItem(key)
  },
  clear() {
    return window.localStorage.clear()
  },
}

export default storage
