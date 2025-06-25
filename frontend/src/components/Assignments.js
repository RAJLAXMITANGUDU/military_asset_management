'use client'
import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '@/services/fetcher'

export default function Assignments() {
  const { data, error, mutate } = useSWR('/api/assignments', fetcher)
  const [personnel, setPersonnel] = useState('')
  const [equipmentType, setEquipmentType] = useState('')
  const [quantity, setQuantity] = useState(0)

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('/api/assignments', {
     method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personnel, equipmentType, quantity })
    })
    setPersonnel(''); setEquipmentType(''); setQuantity(0)
    mutate()
  }

  if (error) return <div>Error loading assignments</div>
  if (!data) return <div>Loading...</div>
return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Assignments & Expenditures</h1>
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white shadow rounded">
        <div className="flex space-x-2 mb-2">
          <input placeholder="Personnel ID" value={personnel} onChange={e=>setPersonnel(e.target.value)} className="border p-2 flex-1" required />
          <input placeholder="Equipment Type" value={equipmentType} onChange={e=>setEquipmentType(e.target.value)} className="border p-2 flex-1" required />
        </div>
        <div className="flex space-x-2 mb-2">
          <input type="number" placeholder="Quantity" value={quantity} onChange={e=>setQuantity(+e.target.value)} className="border p-2 w-24" min="1" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Assign / Expend</button>
      </form>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
        <tr><th className="p-2">Date</th><th className="p-2">Personnel</th><th className="p-2">Type</th><th className="p-2">Qty</th></tr>
        </thead>
        <tbody>
          {data.map(tx => (
            <tr key={tx._id} className="border-t">
              <td className="p-2">{new Date(tx.createdAt).toLocaleDateString()}</td>
              <td className="p-2">{tx.personnel}</td>
              <td className="p-2">{tx.equipmentType}</td>
              <td className="p-2">{tx.quantity}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

