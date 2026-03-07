import { useState } from 'react'
import type { TripData } from '../../types'
import DaySection from '../DaySection'
import AnimatedBackground from '../AnimatedBackground'

interface Props {
  data: TripData
}

export default function Timeline({ data }: Props) {
  const { meta, categories, days } = data
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggleDark = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    setDark(next)
  }

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground categories={categories} />

      <header className="bg-white/60 dark:bg-black/30 backdrop-blur-xl border-b border-white/40 dark:border-white/10 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 pt-5 pb-3">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-text-hi">{meta.title}</h1>
            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-muted"
              aria-label="Toggle dark mode"
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
          {meta.memo && <p className="text-base text-text-lo mt-1">{meta.memo}</p>}

          {categories && categories.length > 0 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const active = selected.has(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggle(cat.id)}
                    className="shrink-0 text-sm px-3 py-1 rounded-full font-medium transition-all"
                    style={
                      active
                        ? { backgroundColor: cat.color, color: '#fff' }
                        : { backgroundColor: cat.color + '22', color: cat.color }
                    }
                  >
                    {cat.emoji && <span className="mr-1">{cat.emoji}</span>}
                    {cat.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8">
        {days.map((day, i) => (
          <DaySection
            key={day.date}
            day={day}
            categories={categories}
            dayIndex={i}
            selectedCategories={selected}
          />
        ))}
      </main>
    </div>
  )
}
