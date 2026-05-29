import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  emptyStudentFormValues,
  type StudentFormErrors,
  type StudentFormField,
  type StudentFormValues,
} from '@/lib/students/student-form.types'
import { mapFormToStudentInput, mapStudentToFormValues } from '@/lib/students/student.mapper'
import {
  hasFormErrors,
  validateStudentField,
  validateStudentForm,
} from '@/lib/students/student.validation'
import { useStudentStore } from '@/stores/useStudentStore'

export type StudentFormMode =
  | { type: 'add' }
  | { type: 'edit'; studentId: string }

type UseStudentFormOptions = {
  mode: StudentFormMode
  open: boolean
  onSuccess: () => void
}

type TouchedFields = Partial<Record<StudentFormField, boolean>>

export function useStudentForm({ mode, open, onSuccess }: UseStudentFormOptions) {
  const students = useStudentStore((s) => s.students)
  const addStudent = useStudentStore((s) => s.addStudent)
  const updateStudent = useStudentStore((s) => s.updateStudent)
  const [values, setValues] = useState<StudentFormValues>(emptyStudentFormValues)
  const [errors, setErrors] = useState<StudentFormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})

  const editingStudentId = mode.type === 'edit' ? mode.studentId : undefined

  const validateOptions = useMemo(
    () => ({
      existingStudents: students,
      editingStudentId,
    }),
    [students, editingStudentId],
  )

  const setFieldError = useCallback(
    (field: StudentFormField, nextValues: StudentFormValues) => {
      const message = validateStudentField(field, nextValues, validateOptions)
      setErrors((prev) => ({ ...prev, [field]: message }))
    },
    [validateOptions],
  )

  const reset = useCallback(() => {
    setValues(emptyStudentFormValues)
    setErrors({})
    setTouched({})
  }, [])

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  useEffect(() => {
    if (!open) return

    if (mode.type === 'add') {
      setValues(emptyStudentFormValues)
      setErrors({})
      setTouched({})
      return
    }

    const student = students.find((s) => s.id === mode.studentId)
    if (student) {
      setValues(mapStudentToFormValues(student))
      setErrors({})
      setTouched({})
    }
  }, [open, mode, students])

  const updateField = (field: StudentFormField, value: string) => {
    const nextValues = { ...values, [field]: value }
    setValues(nextValues)
    if (touched[field]) {
      setFieldError(field, nextValues)
    }
  }

  const blurField = (field: StudentFormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setValues((current) => {
      const message = validateStudentField(field, current, validateOptions)
      setErrors((prev) => ({ ...prev, [field]: message }))
      return current
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      dateOfBirth: true,
    })

    const nextErrors = validateStudentForm(values, validateOptions)
    if (hasFormErrors(nextErrors)) {
      setErrors(nextErrors)
      return
    }

    const input = mapFormToStudentInput(values)

    if (mode.type === 'edit') {
      updateStudent(mode.studentId, input)
    } else {
      addStudent(input)
    }

    reset()
    onSuccess()
  }

  const studentCode =
    mode.type === 'edit' ? students.find((s) => s.id === mode.studentId)?.id : undefined

  return {
    values,
    errors,
    studentCode,
    updateField,
    blurField,
    reset,
    handleSubmit,
  }
}
