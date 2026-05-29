import type { Course, CourseStatus } from '@/types/course'

export type CourseStatusFilter = 'all' | CourseStatus

export const courseStatusFilterOptions: { value: CourseStatusFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'draft', label: 'Bản nháp' },
  { value: 'open', label: 'Đang mở' },
  { value: 'closed', label: 'Đã đóng' },
]

export function filterCoursesByStatus(
  courses: Course[],
  statusFilter: CourseStatusFilter,
): Course[] {
  if (statusFilter === 'all') return courses
  return courses.filter((course) => course.status === statusFilter)
}
