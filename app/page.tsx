// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">If Only I Sent This</h1>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  href="/memories"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Memories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Submit
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-8">
        <p className="text-lg">
          Welcome to <span className="font-semibold">If Only I Sent This</span> – a modern take on
          unsent messages and memories.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
