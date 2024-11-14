import { Facebook, Github, X } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Vitrav</h3>
            <p className="text-sm text-gray-600">
              Vitrav helps you discover amazing attractions and experiences
              in cities around the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <X className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Vitrav. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
