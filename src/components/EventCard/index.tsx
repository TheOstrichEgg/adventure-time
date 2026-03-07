import type { TripEvent, Category } from '../../types'

interface Props {
  event: TripEvent
  categories?: Category[]
}

export default function EventCard({ event, categories }: Props) {
  const category = categories?.find((c) => c.id === event.category)

  const handleClick = () => {
    if (event.link) {
      window.open(event.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      className={[
        'relative rounded-2xl overflow-hidden',
        'bg-white/50 dark:bg-white/5 backdrop-blur-md',
        'ring-1 ring-white/60 dark:ring-white/10',
        'transition-all duration-200',
        event.link ? 'cursor-pointer hover:bg-white/70 dark:hover:bg-white/10 hover:-translate-y-0.5' : '',
      ].join(' ')}
      onClick={handleClick}
    >
      {event.required && (
        <div
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{ backgroundColor: category?.color ?? 'var(--color-accent)' }}
        />
      )}

      <div className="flex flex-col gap-1.5 px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-text-muted">
            {event.time}
            {event.time_end && <span> → {event.time_end}</span>}
          </span>
          {category && (
            <span
              className="text-sm px-2.5 py-0.5 rounded-full font-medium shrink-0"
              style={{ backgroundColor: category.color + '33', color: category.color }}
            >
              {category.emoji && <span className="mr-1">{category.emoji}</span>}
              {category.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-text-hi leading-snug">{event.title}</span>
          {event.link && (
            <svg className="w-3.5 h-3.5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </div>

        {event.memo && (
          <p className="text-sm text-text-lo leading-relaxed">{event.memo}</p>
        )}
      </div>
    </div>
  )
}
