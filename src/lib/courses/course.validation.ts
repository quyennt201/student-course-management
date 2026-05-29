import type {
  CourseFormErrors,
  CourseFormField,
  CourseFormValues,
} from '@/lib/courses/course-form.types'

type ValidateOptions = {
  enrolledCount?: number
}

function parseMaxStudents(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (!/^\d+$/.test(trimmed)) return null
  const num = Number.parseInt(trimmed, 10)
  if (!Number.isFinite(num) || num < 1) return null
  return num
}

export function validateCourseForm(
  values: CourseFormValues,
  options: ValidateOptions = {},
): CourseFormErrors {
  const errors: CourseFormErrors = {}
  const name = values.name.trim()

  if (!name) {
    errors.name = 'Vui lòng nhập tên khóa học'
  } else if (name.length < 2) {
    errors.name = 'Tên khóa học phải có ít nhất 2 ký tự'
  } else if (name.length > 200) {
    errors.name = 'Tên khóa học không được quá 200 ký tự'
  }

  if (values.description.trim().length > 500) {
    errors.description = 'Mô tả không được quá 500 ký tự'
  }

  const maxStudents = parseMaxStudents(values.maxStudents)
  if (!values.maxStudents.trim()) {
    errors.maxStudents = 'Vui lòng nhập giới hạn học viên'
  } else if (maxStudents === null) {
    errors.maxStudents = 'Giới hạn học viên phải là số nguyên dương'
  } else if (maxStudents > 500) {
    errors.maxStudents = 'Giới hạn học viên không được vượt quá 500'
  } else if (
    options.enrolledCount !== undefined &&
    maxStudents < options.enrolledCount
  ) {
    errors.maxStudents = `Giới hạn học viên không được nhỏ hơn số đã đăng ký (${options.enrolledCount})`
  }

  if (values.status !== 'draft' && values.status !== 'open' && values.status !== 'closed') {
    errors.status = 'Trạng thái khóa học không hợp lệ'
  }

  return errors
}

export function validateCourseField(
  field: CourseFormField,
  values: CourseFormValues,
  options: ValidateOptions = {},
): string | undefined {
  return validateCourseForm(values, options)[field]
}

export function hasFormErrors(errors: CourseFormErrors): boolean {
  return Object.keys(errors).length > 0
}
