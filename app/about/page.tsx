import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <h1 className="text-4xl font-bold text-gray-100">How It Works</h1>
          <hr className="my-4 border-gray-600" />
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link href="/memories" className="hover:text-blue-400">Memories</Link></li>
              <li><Link href="/submit" className="hover:text-blue-400">Submit</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8 text-gray-100">
        <article className="bg-gray-800/90 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Welcome to the Graveyard of Memories</h2>
          <p className="text-lg mb-4">
            This platform is a sanctuary for all those unsent words and unspoken emotions. Here, you can leave a memory dedicated to a person, an animal, a loved one, or anything that holds meaning in your life – a memory that you never had the chance to send.
          </p>
          <p className="text-lg mb-4">
            Every memory you submit appears as a card. These cards not only hold your heartfelt messages but also feature unique designs that reflect your chosen emotions. If a card has a star (★) at the beginning, it means you selected a special effect, giving that memory an extra layer of poignancy.
          </p>
          <p className="text-lg mb-4">
            Tap on any card on the home page to flip it and reveal the full message along with additional details like the date, time, and more. The flipping animation is a symbolic journey from the surface to the depths of unexpressed emotions.
          </p>
          <p className="text-lg">
            Explore the site, share your unsent words, and find solace in the collective memories that bind us all together.
          </p>
        </article>
        <div className="text-center mt-6">
          <Link href="/" className="text-blue-400 hover:underline">
            Return to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} If Only I Sent This
        </div>
      </footer>
    </div>
  );
}
