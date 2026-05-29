import type { Course, CourseStatus } from '@/types/course'

const STATUS_SORT_ORDER: Record<CourseStatus, number> = {
  open: 0,
  draft: 1,
  closed: 2,
}

/** Sắp xếp mặc định: Đang mở → Bản nháp → Đã đóng, rồi theo tên. */
export function sortCoursesByStatus(courses: Course[]): Course[] {
  return [...courses].sort(
    (a, b) =>
      STATUS_SORT_ORDER[a.status] - STATUS_SORT_ORDER[b.status] ||
      a.name.localeCompare(b.name, 'vi'),
  )
}
