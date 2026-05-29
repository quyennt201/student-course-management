import type { Student } from '@/types/student'

export function generateStudentId(students: Student[]): string {
  const maxNum = students.reduce((max, s) => {
    const match = /^HV(\d+)$/i.exec(s.id)
    if (!match) return max
    return Math.max(max, Number.parseInt(match[1], 10))
  }, 0)
  return `HV${String(maxNum + 1).padStart(3, '0')}`
}
