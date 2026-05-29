export type PaginateResult<T> = {
  items: T[]
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
  startIndex: number
  endIndex: number
}

export function paginate<T>(items: T[], page: number, pageSize: number): PaginateResult<T> {
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize) || 1)
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  return {
    items: items.slice(startIndex, endIndex),
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    startIndex,
    endIndex,
  }
}
