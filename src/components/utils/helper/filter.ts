/*
 * @Author: yangkunlin
 * @Date: 2024-03-18 10:46:54
 * @Description: 过滤方法
 */
/** 剔除对象中值为空的属性 */
export const omitNullObj = (obj) => {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj)
  const values = Object.values(shallowCopy)
  const keys = Object.keys(shallowCopy)
  for (let i = 0; i < values.length; i += 1) {
    const value: any = values[i]
    if (value === null || value === '' || Object.is(value, NaN)) {
      delete shallowCopy[keys[i]]
    }
  }
  return shallowCopy
}
