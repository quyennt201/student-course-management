import type { CourseFormValues } from '@/lib/courses/course-form.types'
import type { Course, CourseInput } from '@/types/course'

export function mapCourseToFormValues(course: Course): CourseFormValues {
  return {
    name: course.name,
    description: course.description,
    status: course.status,
    maxStudents: String(course.maxStudents),
  }
}

export function mapFormToCourseInput(values: CourseFormValues): CourseInput {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
    status: values.status,
    maxStudents: Number.parseInt(values.maxStudents.trim(), 10),
  }
}
