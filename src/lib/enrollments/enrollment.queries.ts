import { getCourseCapacityInfo } from '@/lib/courses/course.capacity'
import type { Course } from '@/types/course'
import type { Student } from '@/types/student'

/** Tổng số lượt đăng ký (mỗi học viên trên mỗi khóa tính 1 lượt). */
export function getTotalEnrollmentCount(courses: Course[]): number {
  return courses.reduce((sum, course) => sum + course.enrolledStudentIds.length, 0)
}

export function getEnrolledCourses(courses: Course[], studentId: string): Course[] {
  return courses.filter((course) => course.enrolledStudentIds.includes(studentId))
}

/** Khóa đang mở, còn chỗ và học viên chưa đăng ký. */
export function getEnrolledStudentsForCourse(students: Student[], course: Course): Student[] {
  return course.enrolledStudentIds
    .map((id) => students.find((student) => student.id === id))
    .filter((student): student is Student => student !== undefined)
}

export function getStudentsNotEnrolledInCourse(students: Student[], course: Course): Student[] {
  return students.filter((student) => !course.enrolledStudentIds.includes(student.id))
}

export function canEnrollMoreStudents(course: Course): boolean {
  if (course.status !== 'open') return false
  const { isFull } = getCourseCapacityInfo(course)
  return !isFull
}

export function getAvailableCoursesForEnrollment(
  courses: Course[],
  studentId: string,
): Course[] {
  return courses.filter((course) => {
    if (course.status !== 'open') return false
    if (course.enrolledStudentIds.includes(studentId)) return false
    const { isFull } = getCourseCapacityInfo(course)
    return !isFull
  })
}
