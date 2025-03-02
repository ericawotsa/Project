import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-bold text-gray-100">How It Works</h1>
          <hr className="my-4 border-gray-700" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link href="/" className="hover:text-red-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/memories" className="hover:text-red-400">
                  Memories
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-red-400">
                  Submit
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <article className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-gray-100">Welcome to the Graveyard of Memories</h2>
          <p className="text-lg text-gray-300 mb-4">
            This platform is a sanctuary for memories that were never sent, a digital graveyard where unsaid words find solace.
            Whether it&apos;s a message for a person, an animal, a lost love, or anything dear to your heart, here you can archive the words
            you couldn&apos;t send. Every memory is stored with care, preserving the pain, beauty, and depth of your unexpressed emotions.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            On the home page, you&apos;ll find a collection of these memories. Each card represents an unsent message. By tapping a card,
            it flips to reveal the full content. Notice the star symbol on some cards? That star indicates the card has a special effect applied&mdash;a mark of extra emotional intensity.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            The design is inspired by 1980s aesthetics&mdash;sadistic, depressing, yet visually captivating. From the revamp of card designs and animations
            to the rhythmic, rotating quotes, every detail aims to immerse you in a world where pain meets beauty.
          </p>
          <p className="text-lg text-gray-300">
            If you&apos;re new, we encourage you to explore this page to understand all the features. Experience the art of unsent memories,
            where every word holds a story, and every story is a glimpse into the soul.
          </p>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
