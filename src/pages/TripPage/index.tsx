import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { parseTripData } from '../../utils/parser'
import type { TripData } from '../../types'
import Timeline from '../../components/Timeline'

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; data: TripData }

export default function TripPage() {
  const { id } = useParams<{ id: string }>()
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    if (!id) return
    setState({ status: 'loading' })
    fetch(`/adventure-time/trips/${id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        return res.json()
      })
      .then((json: unknown) => {
        const data = parseTripData(json)
        setState({ status: 'ok', data })
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : '알 수 없는 오류'
        setState({ status: 'error', message })
      })
  }, [id])

  if (state.status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        불러오는 중...
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-2 text-gray-500">
        <p className="text-lg font-medium">여행 정보를 찾을 수 없습니다</p>
        <p className="text-sm">{state.message}</p>
      </div>
    )
  }

  return <Timeline data={state.data} />
}
