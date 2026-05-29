import { enrollmentMessages } from '@/lib/enrollments/enrollment.messages'
import type { EnrollmentResult } from '@/lib/enrollments/enrollment.types'
import type { Course } from '@/types/course'
import type { Student } from '@/types/student'

function findCourse(courses: Course[], courseId: string): Course | undefined {
  return courses.find((course) => course.id === courseId)
}

function findStudent(students: Student[], studentId: string): Student | undefined {
  return students.find((student) => student.id === studentId)
}

export function enrollStudentInCourse(
  courses: Course[],
  students: Student[],
  courseId: string,
  studentId: string,
): EnrollmentResult {
  const course = findCourse(courses, courseId)
  if (!course) {
    return { ok: false, message: enrollmentMessages.courseNotFound }
  }

  if (!findStudent(students, studentId)) {
    return { ok: false, message: enrollmentMessages.studentNotFound }
  }

  if (course.status === 'closed') {
    return { ok: false, message: enrollmentMessages.courseClosed }
  }

  if (course.status === 'draft') {
    return { ok: false, message: enrollmentMessages.courseDraft }
  }

  if (course.enrolledStudentIds.includes(studentId)) {
    return { ok: false, message: enrollmentMessages.alreadyEnrolled }
  }

  if (course.enrolledStudentIds.length >= course.maxStudents) {
    return { ok: false, message: enrollmentMessages.courseFull }
  }

  return {
    ok: true,
    courses: courses.map((item) =>
      item.id === courseId
        ? { ...item, enrolledStudentIds: [...item.enrolledStudentIds, studentId] }
        : item,
    ),
  }
}

export function unenrollStudentFromCourse(
  courses: Course[],
  students: Student[],
  courseId: string,
  studentId: string,
): EnrollmentResult {
  const course = findCourse(courses, courseId)
  if (!course) {
    return { ok: false, message: enrollmentMessages.courseNotFound }
  }

  if (!findStudent(students, studentId)) {
    return { ok: false, message: enrollmentMessages.studentNotFound }
  }

  if (!course.enrolledStudentIds.includes(studentId)) {
    return { ok: false, message: enrollmentMessages.notEnrolled }
  }

  return {
    ok: true,
    courses: courses.map((item) =>
      item.id === courseId
        ? {
            ...item,
            enrolledStudentIds: item.enrolledStudentIds.filter((id) => id !== studentId),
          }
        : item,
    ),
  }
}

export function removeStudentFromAllCourses(
  courses: Course[],
  studentId: string,
): Course[] {
  return courses.map((course) => ({
    ...course,
    enrolledStudentIds: course.enrolledStudentIds.filter((id) => id !== studentId),
  }))
}
