export type StudentFormValues = {
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
}

export type StudentFormField = keyof StudentFormValues

export type StudentFormErrors = Partial<Record<StudentFormField, string>>

export const emptyStudentFormValues: StudentFormValues = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
}
