import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  createStudent,
  deleteStudentRecord,
  updateStudentRecord,
} from '@/services/studentService'
import type { Student, StudentInput } from '@/types/student'

type StudentState = {
  students: Student[]
  addStudent: (input: StudentInput) => void
  updateStudent: (id: string, input: StudentInput) => void
  deleteStudent: (id: string) => void
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set) => ({
      students: [],
      addStudent: (input) =>
        set((state) => ({
          students: [...state.students, createStudent(state.students, input)],
        })),
      updateStudent: (id, input) =>
        set((state) => ({
          students: updateStudentRecord(state.students, id, input),
        })),
      deleteStudent: (id) =>
        set((state) => ({
          students: deleteStudentRecord(state.students, id),
        })),
    }),
    {
      name: 'student-app-storage',
      partialize: (state) => ({ students: state.students }),
    },
  ),
)
