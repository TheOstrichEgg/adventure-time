import type { TripData } from '../../types'
import DaySection from '../DaySection'

interface Props {
  data: TripData
}

export default function Timeline({ data }: Props) {
  const { meta, categories, days } = data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">{meta.title}</h1>
          {meta.memo && <p className="text-sm text-gray-500 mt-1">{meta.memo}</p>}
        </div>
      </header>

      {/* 타임라인 */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {days.map((day, i) => (
          <DaySection key={day.date} day={day} categories={categories} dayIndex={i} />
        ))}
      </main>
    </div>
  )
}
