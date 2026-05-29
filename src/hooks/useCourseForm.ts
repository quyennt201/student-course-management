import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  emptyCourseFormValues,
  type CourseFormErrors,
  type CourseFormField,
  type CourseFormValues,
} from '@/lib/courses/course-form.types'
import { mapCourseToFormValues, mapFormToCourseInput } from '@/lib/courses/course.mapper'
import {
  hasFormErrors,
  validateCourseField,
  validateCourseForm,
} from '@/lib/courses/course.validation'
import { useCourseStore } from '@/stores/useCourseStore'

export type CourseFormMode = { type: 'add' } | { type: 'edit'; courseId: string }

type UseCourseFormOptions = {
  mode: CourseFormMode
  open: boolean
  onSuccess: () => void
}

type TouchedFields = Partial<Record<CourseFormField, boolean>>

export function useCourseForm({ mode, open, onSuccess }: UseCourseFormOptions) {
  const courses = useCourseStore((s) => s.courses)
  const addCourse = useCourseStore((s) => s.addCourse)
  const updateCourse = useCourseStore((s) => s.updateCourse)
  const [values, setValues] = useState<CourseFormValues>(emptyCourseFormValues)
  const [errors, setErrors] = useState<CourseFormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})

  const editingCourse =
    mode.type === 'edit' ? courses.find((c) => c.id === mode.courseId) : undefined

  const validateOptions = useMemo(
    () => ({
      enrolledCount: editingCourse?.enrolledStudentIds.length ?? 0,
    }),
    [editingCourse],
  )

  const setFieldError = useCallback(
    (field: CourseFormField, nextValues: CourseFormValues) => {
      const message = validateCourseField(field, nextValues, validateOptions)
      setErrors((prev) => ({ ...prev, [field]: message }))
    },
    [validateOptions],
  )

  const reset = useCallback(() => {
    setValues(emptyCourseFormValues)
    setErrors({})
    setTouched({})
  }, [])

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  useEffect(() => {
    if (!open) return

    if (mode.type === 'add') {
      setValues(emptyCourseFormValues)
      setErrors({})
      setTouched({})
      return
    }

    const course = courses.find((c) => c.id === mode.courseId)
    if (course) {
      setValues(mapCourseToFormValues(course))
      setErrors({})
      setTouched({})
    }
  }, [open, mode, courses])

  const updateField = (field: CourseFormField, value: string) => {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)
    if (touched[field]) {
      setFieldError(field, nextValues)
    }
  }

  const blurField = (field: CourseFormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setValues((current) => {
      const message = validateCourseField(field, current, validateOptions)
      setErrors((prev) => ({ ...prev, [field]: message }))
      return current
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setTouched({
      name: true,
      description: true,
      status: true,
      maxStudents: true,
    })

    const nextErrors = validateCourseForm(values, validateOptions)
    if (hasFormErrors(nextErrors)) {
      setErrors(nextErrors)
      return
    }

    const input = mapFormToCourseInput(values)

    if (mode.type === 'edit') {
      updateCourse(mode.courseId, input)
    } else {
      addCourse(input)
    }

    reset()
    onSuccess()
  }

  const enrolledCount = editingCourse?.enrolledStudentIds.length ?? 0

  return {
    values,
    errors,
    courseCode: editingCourse?.id,
    enrolledCount,
    updateField,
    blurField,
    reset,
    handleSubmit,
  }
}
