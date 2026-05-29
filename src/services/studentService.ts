import { generateStudentId } from '@/lib/students/student.id'
import type { Student, StudentInput } from '@/types/student'

export function createStudent(
  students: Student[],
  input: StudentInput,
): Student {
  return {
    id: generateStudentId(students),
    ...input,
  }
}

export function updateStudentRecord(
  students: Student[],
  id: string,
  input: StudentInput,
): Student[] {
  return students.map((student) =>
    student.id === id ? { ...student, ...input } : student,
  )
}

export function deleteStudentRecord(students: Student[], id: string): Student[] {
  return students.filter((student) => student.id !== id)
}
