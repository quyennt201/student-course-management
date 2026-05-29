# Frontend (Vite + TypeScript)

Stack: **Vite**, **React**, **TypeScript**, **Tailwind CSS v4**, **Zustand**.

## Bắt đầu

```bash
npm install
npm run dev
```

Mở http://localhost:5173

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production |
| `npm run preview` | Xem bản build |
| `npm run lint` | ESLint |

## Cấu trúc

```
src/
  App.tsx              # Entry UI
  main.tsx             # React bootstrap
  index.css            # Tailwind (@import 'tailwindcss')
  stores/
    useCounterStore.ts # Ví dụ Zustand — xóa khi không cần
```

Import alias: `@/` → `src/` (ví dụ `import { x } from '@/stores/useCounterStore'`).
