import type { Student } from '@/types/student'

export function filterStudentsByQuery(students: Student[], query: string): Student[] {
  const q = query.trim().toLowerCase()
  if (!q) return students

  return students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(q) ||
      student.email.toLowerCase().includes(q) ||
      student.phone.includes(q) ||
      student.id.toLowerCase().includes(q) ||
      student.dateOfBirth.includes(q),
  )
}
