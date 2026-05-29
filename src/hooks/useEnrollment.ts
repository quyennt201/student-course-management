import { enrollmentMessages } from '@/lib/enrollments/enrollment.messages'
import type { EnrollmentResult } from '@/lib/enrollments/enrollment.types'
import { useCourseStore } from '@/stores/useCourseStore'

export function useEnrollment() {
  const enrollStudent = useCourseStore((s) => s.enrollStudent)
  const unenrollStudent = useCourseStore((s) => s.unenrollStudent)

  const enroll = (courseId: string, studentId: string): EnrollmentResult => {
    const result = enrollStudent(courseId, studentId)
    return result
  }

  const unenroll = (courseId: string, studentId: string): EnrollmentResult => {
    const result = unenrollStudent(courseId, studentId)
    return result
  }

  return {
    enroll,
    unenroll,
    messages: enrollmentMessages,
  }
}
