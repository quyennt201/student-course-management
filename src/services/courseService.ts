import { generateCourseId } from '@/lib/courses/course.id'
import type { Course, CourseInput } from '@/types/course'

export function createCourse(courses: Course[], input: CourseInput): Course {
  return {
    id: generateCourseId(courses),
    enrolledStudentIds: [],
    ...input,
  }
}

export function updateCourseRecord(
  courses: Course[],
  id: string,
  input: CourseInput,
): Course[] {
  return courses.map((course) =>
    course.id === id
      ? {
          ...course,
          ...input,
        }
      : course,
  )
}

export function deleteCourseRecord(courses: Course[], id: string): Course[] {
  return courses.filter((course) => course.id !== id)
}
