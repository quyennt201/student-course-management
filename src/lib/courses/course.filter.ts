import { getCourseCapacityInfo } from '@/lib/courses/course.capacity'
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

export type CourseSlotFilter = 'all' | 'available' | 'full'

export const courseSlotFilterOptions: { value: CourseSlotFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'available', label: 'Còn chỗ' },
  { value: 'full', label: 'Đã đầy' },
]

export function filterCoursesBySlotStatus(
  courses: Course[],
  slotFilter: CourseSlotFilter,
): Course[] {
  if (slotFilter === 'all') return courses

  return courses.filter((course) => {
    if (course.status !== 'open') return false
    const { slotStatus } = getCourseCapacityInfo(course)
    return slotFilter === 'available' ? slotStatus === 'available' : slotStatus === 'full'
  })
}
