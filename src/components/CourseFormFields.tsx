import { FormField } from '@/components/FormField'
import type {
  CourseFormErrors,
  CourseFormField,
  CourseFormValues,
} from '@/lib/courses/course-form.types'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

type CourseFormFieldsProps = {
  idPrefix: string
  values: CourseFormValues
  errors: CourseFormErrors
  enrolledCount: number
  onFieldChange: (field: CourseFormField, value: string) => void
  onFieldBlur: (field: CourseFormField, value: string) => void
  autoFocus?: boolean
}

export function CourseFormFields({
  idPrefix,
  values,
  errors,
  enrolledCount,
  onFieldChange,
  onFieldBlur,
  autoFocus,
}: CourseFormFieldsProps) {
  const fieldId = (name: CourseFormField) => `${idPrefix}-${name}`

  return (
    <>
      <FormField id={fieldId('name')} label="Tên khóa học" required error={errors.name}>
        <input
          id={fieldId('name')}
          type="text"
          value={values.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
          onBlur={(e) => onFieldBlur('name', e.target.value)}
          maxLength={200}
          className={inputClass}
          autoFocus={autoFocus}
        />
      </FormField>

      <FormField id={fieldId('description')} label="Mô tả" error={errors.description}>
        <textarea
          id={fieldId('description')}
          rows={3}
          value={values.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          onBlur={(e) => onFieldBlur('description', e.target.value)}
          maxLength={500}
          className={inputClass}
          placeholder="Mô tả ngắn về khóa học (không bắt buộc)"
        />
      </FormField>

      <FormField id={fieldId('status')} label="Trạng thái" required error={errors.status}>
        <select
          id={fieldId('status')}
          value={values.status}
          onChange={(e) => onFieldChange('status', e.target.value)}
          onBlur={(e) => onFieldBlur('status', e.target.value)}
          className={inputClass}
        >
          <option value="draft">Bản nháp</option>
          <option value="open">Đang mở</option>
          <option value="closed">Đã đóng</option>
        </select>
      </FormField>

      <FormField
        id={fieldId('maxStudents')}
        label="Giới hạn học viên"
        required
        error={errors.maxStudents}
      >
        <input
          id={fieldId('maxStudents')}
          type="number"
          min={enrolledCount > 0 ? enrolledCount : 1}
          max={500}
          inputMode="numeric"
          value={values.maxStudents}
          onChange={(e) => onFieldChange('maxStudents', e.target.value)}
          onBlur={(e) => onFieldBlur('maxStudents', e.target.value)}
          step={1}
          className={inputClass}
        />
        {enrolledCount > 0 && (
          <p className="mt-1 text-xs text-slate-500">
            Đã có {enrolledCount} học viên đăng ký — giới hạn không được nhỏ hơn số này.
          </p>
        )}
      </FormField>
    </>
  )
}
