/**
 * 验证手机号是否正确
 */
export function validatePhoneNumber(phone: string): boolean {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

/**
 * 验证是否是全数字
 */
export function validateAllNumber(value: string): boolean {
  const reg = /^\d+$/
  return reg.test(value)
}
