import type { Course } from '@/types/course'

export type EnrollmentSuccess = {
  ok: true
  courses: Course[]
}

export type EnrollmentFailure = {
  ok: false
  message: string
}

export type EnrollmentResult = EnrollmentSuccess | EnrollmentFailure
