import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Pet Match</h3>
            <p className="text-gray-300">
              Our mission is to help you find the perfect pet companion for your lifestyle,
              creating harmonious and happy human-pet relationships.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/questionnaire" className="text-gray-300 hover:text-white transition-colors">
                  Questionnaire
                </Link>
              </li>
              <li>
                <Link href="/pets" className="text-gray-300 hover:text-white transition-colors">
                  Pet Encyclopedia
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Have questions or suggestions? Feel free to reach out to us.
            </p>
            <p className="text-gray-300 mt-2">
              Email: contact@petmatch.example.com
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Pet Match. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}