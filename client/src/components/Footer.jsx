import { Link } from "react-router-dom"

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">&copy; {year} Microblog. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-blue-500 text-sm">
              About
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-500 text-sm">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-500 text-sm">
              Privacy
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
