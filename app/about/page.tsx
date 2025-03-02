import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-300">
      {/* Header */}
      <header className="bg-black/70 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-serif text-gray-100">How It Works</h1>
          <hr className="my-4 border-dashed border-gray-500" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6 text-gray-400">
              <li><Link href="/" className="hover:text-blue-300 transition duration-200">Home</Link></li>
              <li><Link href="/memories" className="hover:text-blue-300 transition duration-200">Memories</Link></li>
              <li><Link href="/submit" className="hover:text-blue-300 transition duration-200">Submit</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8">
        <article className="bg-black/70 p-8 rounded-lg shadow-lg text-gray-200">
          <h2 className="text-3xl font-semibold mb-4 text-gray-100">A Graveyard of Unsent Memories</h2>
          <p className="text-lg mb-4">
            This is a sanctuary for the words you could never send—a graveyard of memories where you can lay to rest the unsaid. Whether it’s for a person, an animal, a loved one, or anything that lingers in your heart, this platform lets you share those unspoken thoughts. It’s a safe place to release what haunts you, preserving it in a space that understands silence.
          </p>
          <p className="text-lg mb-4">
            Each memory becomes a card, a fragile piece of the past. Some cards bear a star (★) before the recipient’s name—it’s a mark of a special effect, like bleeding text or handwritten scrawl, chosen to reflect the weight of the words within.
          </p>
          <p className="text-lg mb-4">
            On the home page, tap or click a card to flip it over. The front reveals the recipient, sender (if shared), date, and color—a snapshot of the memory. The back holds the message itself, a quiet confession beneath the words "if only I sent this."
          </p>
          <p className="text-lg mb-4">
            Want to add your own? Head to the "Submit" page. Fill in the recipient, your message, and, if you wish, your name. Choose a color to paint your sorrow and a special effect to etch it deeper. Once submitted, it awaits approval before joining the others.
          </p>
          <p className="text-lg">
            Visit the "Memories" page to wander through all approved cards. Search by recipient to find a specific echo of the past. This is a place of quiet reflection, where every card tells a story of what might have been.
          </p>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-black/70 backdrop-blur-md shadow-lg text-gray-400">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm">
          © {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
