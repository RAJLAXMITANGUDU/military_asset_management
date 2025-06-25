'use client'
import useSWR from 'swr'
import fetcher from '@/services/fetcher'

export default function Dashboard() {
  const today = new Date().toISOString().slice(0,10)
  const { data, error } = useSWR(`/api/dashboard?date=${today}`, fetcher)
  if (error) return <div>Error loading</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">Opening: {data.opening}</div>
        <div className="p-4 bg-white shadow rounded">Purchased: {data.purchased}</div>
        <div className="p-4 bg-white shadow rounded">Net: {data.net}</div>
      </div>
    </div>
  )
}
