import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center
      text-white">
      Hello World
      <br/>
      <Link href={'/login'}>Go to login</Link>
    </main>
  );
}
