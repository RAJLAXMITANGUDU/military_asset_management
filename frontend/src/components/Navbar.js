import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white p-4 shadow">
      <ul className="flex space-x-4">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/purchases">Purchases</Link></li>
        <li><Link href="/transfers">Transfers</Link></li>
        <li><Link href="/assignments">Assignments</Link></li>
      </ul>
    </nav>
  )
}
