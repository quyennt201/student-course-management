import { FormField } from '@/components/FormField'
import type { StudentFormErrors, StudentFormField, StudentFormValues } from '@/lib/students/student-form.types'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

type StudentFormFieldsProps = {
  idPrefix: string
  values: StudentFormValues
  errors: StudentFormErrors
  onFieldChange: (field: StudentFormField, value: string) => void
  onFieldBlur: (field: StudentFormField, value: string) => void
  autoFocus?: boolean
}

export function StudentFormFields({
  idPrefix,
  values,
  errors,
  onFieldChange,
  onFieldBlur,
  autoFocus,
}: StudentFormFieldsProps) {
  const fieldId = (name: StudentFormField) => `${idPrefix}-${name}`

  return (
    <>
      <FormField id={fieldId('fullName')} label="Họ và tên" required error={errors.fullName}>
        <input
          id={fieldId('fullName')}
          type="text"
          value={values.fullName}
          onChange={(e) => onFieldChange('fullName', e.target.value)}
          onBlur={(e) => onFieldBlur('fullName', e.target.value)}
          maxLength={100}
          className={inputClass}
          autoFocus={autoFocus}
        />
      </FormField>

      <FormField id={fieldId('email')} label="Email" required error={errors.email}>
        <input
          id={fieldId('email')}
          type="email"
          value={values.email}
          onChange={(e) => onFieldChange('email', e.target.value)}
          onBlur={(e) => onFieldBlur('email', e.target.value)}
          maxLength={254}
          className={inputClass}
        />
      </FormField>

      <FormField id={fieldId('phone')} label="Số điện thoại" required error={errors.phone}>
        <input
          id={fieldId('phone')}
          type="tel"
          inputMode="numeric"
          placeholder="0912345678"
          value={values.phone}
          onChange={(e) => onFieldChange('phone', e.target.value)}
          onBlur={(e) => onFieldBlur('phone', e.target.value)}
          maxLength={15}
          className={inputClass}
        />
      </FormField>

      <FormField id={fieldId('dateOfBirth')} label="Ngày sinh" required error={errors.dateOfBirth}>
        <input
          id={fieldId('dateOfBirth')}
          type="date"
          value={values.dateOfBirth}
          onChange={(e) => onFieldChange('dateOfBirth', e.target.value)}
          onBlur={(e) => onFieldBlur('dateOfBirth', e.target.value)}
          className={inputClass}
        />
      </FormField>
    </>
  )
}
