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
        'relative pl-4 py-3 rounded-lg bg-white border border-gray-100 shadow-sm',
        event.link ? 'cursor-pointer hover:shadow-md transition-shadow' : '',
        event.required ? 'border-l-4' : 'border-l-4 border-l-transparent',
      ].join(' ')}
      style={event.required ? { borderLeftColor: category?.color ?? '#6366f1' } : undefined}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-end shrink-0 text-xs text-gray-400 pt-0.5 w-12">
          <span className="font-medium text-gray-600">{event.time}</span>
          {event.time_end && <span>{event.time_end}</span>}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-900 text-sm">{event.title}</span>
            {category && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: category.color + '22', color: category.color }}
              >
                {category.emoji && <span className="mr-1">{category.emoji}</span>}
                {category.label}
              </span>
            )}
            {event.link && (
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </div>
          {event.memo && (
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">{event.memo}</p>
          )}
        </div>
      </div>
    </div>
  )
}
