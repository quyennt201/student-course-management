/** Thông tin cơ bản của học viên (chưa gồm đăng ký khóa học). */
export type Student = {
  id: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
}

export type StudentInput = Omit<Student, 'id'>
