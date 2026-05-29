import { normalizePhoneNumber } from '@/lib/students/phone.utils'
import type { StudentFormValues } from '@/lib/students/student-form.types'
import type { Student, StudentInput } from '@/types/student'

export function formatDateOfBirthForDisplay(isoDate: string): string {
  const [y, m, d] = isoDate.split('-')
  if (!y || !m || !d) return isoDate
  return `${d}/${m}/${y}`
}

export function parseDisplayDateToIso(display: string): string {
  const slashMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(display.trim())
  if (slashMatch) {
    const [, d, m, y] = slashMatch
    return `${y}-${m}-${d}`
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(display.trim())) {
    return display.trim()
  }

  return ''
}

export function mapStudentToFormValues(student: Student): StudentFormValues {
  return {
    fullName: student.fullName,
    email: student.email,
    phone: student.phone,
    dateOfBirth: parseDisplayDateToIso(student.dateOfBirth),
  }
}

export function mapFormToStudentInput(values: StudentFormValues): StudentInput {
  return {
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: normalizePhoneNumber(values.phone),
    dateOfBirth: formatDateOfBirthForDisplay(values.dateOfBirth),
  }
}
