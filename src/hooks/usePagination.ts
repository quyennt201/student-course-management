import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_PAGE_SIZE } from '@/lib/pagination/pagination.constants'
import { paginate } from '@/lib/pagination/paginate'

type UsePaginationOptions = {
  initialPageSize?: number
  /** Đổi giá trị này (vd. chuỗi tìm kiếm) để quay về trang 1. */
  resetKey?: string | number
}

export function usePagination<T>(items: T[], options: UsePaginationOptions = {}) {
  const { initialPageSize = DEFAULT_PAGE_SIZE, resetKey = '' } = options
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  useEffect(() => {
    setPage(1)
  }, [resetKey, pageSize])

  const result = useMemo(() => paginate(items, page, pageSize), [items, page, pageSize])

  useEffect(() => {
    if (page > result.totalPages) {
      setPage(result.totalPages)
    }
  }, [page, result.totalPages])

  const setPageSizeAndReset = (size: number) => {
    setPageSize(size)
    setPage(1)
  }

  return {
    ...result,
    page,
    pageSize,
    setPage,
    setPageSize: setPageSizeAndReset,
  }
}
