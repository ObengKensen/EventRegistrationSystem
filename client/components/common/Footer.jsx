function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Event Management. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="/contact" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a 
              href="/privacy" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 