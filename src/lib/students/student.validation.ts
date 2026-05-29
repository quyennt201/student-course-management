import type { Student } from '@/types/student'
import type {
  StudentFormErrors,
  StudentFormField,
  StudentFormValues,
} from '@/lib/students/student-form.types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^(0\d{9})$/

type ValidateOptions = {
  existingStudents: Student[]
  editingStudentId?: string
}

export function validateStudentForm(
  values: StudentFormValues,
  options: ValidateOptions,
): StudentFormErrors {
  const errors: StudentFormErrors = {}
  const fullName = values.fullName.trim()
  const email = values.email.trim().toLowerCase()
  const phone = values.phone.trim()

  if (!fullName) {
    errors.fullName = 'Vui lòng nhập họ và tên'
  } else if (fullName.length < 2) {
    errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự'
  } else if (fullName.length > 100) {
    errors.fullName = 'Họ và tên không được quá 100 ký tự'
  }

  if (!email) {
    errors.email = 'Vui lòng nhập email'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Email không hợp lệ'
  } else {
    const duplicate = options.existingStudents.some(
      (s) =>
        s.email.toLowerCase() === email &&
        s.id !== options.editingStudentId,
    )
    if (duplicate) {
      errors.email = 'Email đã được sử dụng bởi học viên khác'
    }
  }

  if (!phone) {
    errors.phone = 'Vui lòng nhập số điện thoại'
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0'
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Vui lòng chọn ngày sinh'
  } else {
    const dob = new Date(values.dateOfBirth)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (Number.isNaN(dob.getTime())) {
      errors.dateOfBirth = 'Ngày sinh không hợp lệ'
    } else if (dob > today) {
      errors.dateOfBirth = 'Ngày sinh không được ở tương lai'
    } else {
      const age =
        today.getFullYear() -
        dob.getFullYear() -
        (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0)
      if (age < 6) {
        errors.dateOfBirth = 'Học viên phải từ 6 tuổi trở lên'
      }
      if (age > 100) {
        errors.dateOfBirth = 'Ngày sinh không hợp lệ'
      }
    }
  }

  return errors
}

export function validateStudentField(
  field: StudentFormField,
  values: StudentFormValues,
  options: ValidateOptions,
): string | undefined {
  return validateStudentForm(values, options)[field]
}

export function hasFormErrors(errors: StudentFormErrors): boolean {
  return Object.keys(errors).length > 0
}
