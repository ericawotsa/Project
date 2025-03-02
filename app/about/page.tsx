import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">How It Works</h1>
          <hr className="my-4 border-gray-300" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/memories" className="hover:text-blue-600">
                  Memories
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-blue-600">
                  Submit
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <article className="bg-white/90 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            A Sanctuary for Unsent Words
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            "If Only I Sent This" is a digital graveyard where unsent messages,
            regrets, and memories find their final resting place. It’s a space
            for anyone who has ever held back words meant for a person, an
            animal, or even an abstract concept—words that were too painful,
            too late, or simply too impossible to send.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Here, you can submit your unsent memory, choosing a color and
            optional special effects like bleeding text or handwritten style
            to reflect the emotion behind your words. Once approved, your
            memory becomes a card in this archive, a quiet testament to what
            was never said.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            On the home page, you’ll see recent memories. Each card can be
            flipped to reveal the message inside, accompanied by the haunting
            phrase "If Only I Sent This." A star (★) beside a card indicates it
            has a special effect, marking it as a particularly poignant piece
            of the past.
          </p>
          <p className="text-lg text-gray-700">
            This site is for those who seek closure, catharsis, or simply a
            place to let their unspoken words rest. It’s a graveyard of
            memories, somber yet safe, where the unsent is finally given a
            voice.
          </p>
        </article>
      </main>

      <footer className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
