interface dataType {
  meta: {
    pagination: {
      /** 总数据量 */
      total: number
      /** 总页数 */
      count: number
      /** 当前页码 */
      page: number
      /** 分页大小 */
      page_size: number
      /** 是否有下一页 */
      has_more: boolean
    }
  }
  list: Array<Record<string, any>>
}
/**
 *  将新分页数据修改为老格式
 *  新格式：data:{meta:{pagination:{}},list:[]}
 *  老格式：data:{data:[],...rest}
 */
export function convertNewToOldFormat(newData: dataType): any {
  const { meta, list } = newData || {}
  if (!meta || !list)
    return newData
  const { total, count, page, page_size, has_more } = meta?.pagination || {}
  return {
    data: list,
    total,
    count,
    current_page: page,
    page_size,
    has_more,
  }
}
