import type { Course } from '@/types/course'
import { getCourseStatusLabel } from '@/lib/courses/course.capacity'

export function filterCoursesByQuery(courses: Course[], query: string): Course[] {
  const q = query.trim().toLowerCase()
  if (!q) return courses

  return courses.filter((course) => {
    const statusLabel = getCourseStatusLabel(course.status).toLowerCase()
    return (
      course.id.toLowerCase().includes(q) ||
      course.name.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      statusLabel.includes(q)
    )
  })
}
