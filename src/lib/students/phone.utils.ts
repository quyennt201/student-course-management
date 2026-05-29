/** Chuẩn hóa SĐT: chỉ giữ số, hỗ trợ +84 → 0, tối đa 10 số. */
export function normalizePhoneNumber(raw: string): string {
  let digits = raw.replace(/\D/g, '')

  if (digits.startsWith('84') && digits.length >= 11) {
    digits = `0${digits.slice(2)}`
  }

  return digits.slice(0, 10)
}
