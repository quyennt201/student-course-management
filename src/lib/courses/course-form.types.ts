import type { CourseStatus } from '@/types/course'

export type CourseFormValues = {
  name: string
  description: string
  status: CourseStatus
  maxStudents: string
}

export type CourseFormField = keyof CourseFormValues

export type CourseFormErrors = Partial<Record<CourseFormField, string>>

export const emptyCourseFormValues: CourseFormValues = {
  name: '',
  description: '',
  status: 'draft',
  maxStudents: '',
}
