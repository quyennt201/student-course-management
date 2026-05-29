import type { Course } from '@/types/course'

export function generateCourseId(courses: Course[]): string {
  const maxNum = courses.reduce((max, course) => {
    const match = /^KH(\d+)$/i.exec(course.id)
    if (!match) return max
    return Math.max(max, Number.parseInt(match[1], 10))
  }, 0)
  return `KH${String(maxNum + 1).padStart(3, '0')}`
}
