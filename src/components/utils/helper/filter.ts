/** 剔除对象中值为空的属性 */
export function omitNullObj(obj) {
  const shallowCopy = Object.assign({}, obj)
  const values = Object.values(shallowCopy)
  const keys = Object.keys(shallowCopy)
  for (let i = 0; i < values.length; i += 1) {
    const value: any = values[i]
    if (value === null || value === '' || Object.is(value, Number.NaN))
      delete shallowCopy[keys[i]]
  }
  return shallowCopy
}
