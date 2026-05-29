import type { Course, CourseStatus } from '@/types/course'

export type CourseSlotStatus = 'available' | 'full'

export type CourseCapacityInfo = {
  enrolledCount: number
  maxStudents: number
  remainingSlots: number
  isFull: boolean
  /** Chỉ áp dụng khi khóa đang mở. */
  slotStatus: CourseSlotStatus | null
}

export function getCourseCapacityInfo(course: Course): CourseCapacityInfo {
  const enrolledCount = course.enrolledStudentIds.length
  const remainingSlots = Math.max(0, course.maxStudents - enrolledCount)
  const isFull = enrolledCount >= course.maxStudents
  const slotStatus: CourseSlotStatus | null =
    course.status === 'open' ? (isFull ? 'full' : 'available') : null

  return {
    enrolledCount,
    maxStudents: course.maxStudents,
    remainingSlots,
    isFull,
    slotStatus,
  }
}

export function getCourseStatusLabel(status: CourseStatus): string {
  switch (status) {
    case 'draft':
      return 'Bản nháp'
    case 'open':
      return 'Đang mở'
    case 'closed':
      return 'Đã đóng'
  }
}

export function getCourseSlotLabel(course: Course): string {
  const { enrolledCount, maxStudents, remainingSlots, slotStatus } =
    getCourseCapacityInfo(course)

  if (course.status === 'draft') {
    return `Bản nháp — chưa mở đăng ký (${enrolledCount}/${maxStudents})`
  }

  if (course.status === 'closed') {
    return `Khóa đã đóng (${enrolledCount}/${maxStudents})`
  }

  if (slotStatus === 'full') {
    return `Đã đầy (${enrolledCount}/${maxStudents})`
  }

  return `Còn chỗ — còn ${remainingSlots} chỗ (${enrolledCount}/${maxStudents})`
}
