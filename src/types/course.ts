export type CourseStatus = 'draft' | 'open' | 'closed'

export type Course = {
  id: string
  name: string
  description: string
  status: CourseStatus
  maxStudents: number
  /** Danh sách mã học viên đã đăng ký — dùng cho tính sĩ số và slot. */
  enrolledStudentIds: string[]
}

export type CourseInput = Omit<Course, 'id' | 'enrolledStudentIds'>
