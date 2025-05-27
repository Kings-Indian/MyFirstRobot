import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Welcome to My App</h1>
      <Link href="/about">Go to About</Link>
    </main>
  )
}
