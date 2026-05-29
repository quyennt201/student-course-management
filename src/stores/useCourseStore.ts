import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { EnrollmentResult } from '@/lib/enrollments/enrollment.types'
import {
  createCourse,
  deleteCourseRecord,
  updateCourseRecord,
} from '@/services/courseService'
import {
  enrollStudentInCourse,
  removeStudentFromAllCourses,
  unenrollStudentFromCourse,
} from '@/services/enrollmentService'
import { useStudentStore } from '@/stores/useStudentStore'
import type { Course, CourseInput } from '@/types/course'

type CourseState = {
  courses: Course[]
  addCourse: (input: CourseInput) => void
  updateCourse: (id: string, input: CourseInput) => void
  deleteCourse: (id: string) => void
  enrollStudent: (courseId: string, studentId: string) => EnrollmentResult
  unenrollStudent: (courseId: string, studentId: string) => EnrollmentResult
  removeStudentFromAllCourses: (studentId: string) => void
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      courses: [],
      addCourse: (input) =>
        set((state) => ({
          courses: [...state.courses, createCourse(state.courses, input)],
        })),
      updateCourse: (id, input) =>
        set((state) => ({
          courses: updateCourseRecord(state.courses, id, input),
        })),
      deleteCourse: (id) =>
        set((state) => ({
          courses: deleteCourseRecord(state.courses, id),
        })),
      enrollStudent: (courseId, studentId) => {
        const students = useStudentStore.getState().students
        let result: EnrollmentResult = { ok: false, message: 'Lỗi không xác định' }

        set((state) => {
          result = enrollStudentInCourse(state.courses, students, courseId, studentId)
          if (!result.ok) return state
          return { courses: result.courses }
        })

        return result
      },
      unenrollStudent: (courseId, studentId) => {
        const students = useStudentStore.getState().students
        let result: EnrollmentResult = { ok: false, message: 'Lỗi không xác định' }

        set((state) => {
          result = unenrollStudentFromCourse(state.courses, students, courseId, studentId)
          if (!result.ok) return state
          return { courses: result.courses }
        })

        return result
      },
      removeStudentFromAllCourses: (studentId) =>
        set((state) => ({
          courses: removeStudentFromAllCourses(state.courses, studentId),
        })),
    }),
    {
      name: 'course-app-storage',
      partialize: (state) => ({ courses: state.courses }),
    },
  ),
)
