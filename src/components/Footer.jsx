const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 py-6 mt-8 border-t border-gray-200 w-full md:w-sm mx-auto">
        <div className="mx-auto px-4 flex flex-col items-center text-center">
          {/* Made with love */}
          <div className="flex items-center mb-2">
            <span className="text-gray-600 mr-1">Made with</span>
            <svg 
              className="w-5 h-5 text-red-500 animate-pulse" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-600 ml-1">in India</span>
          </div>
          
          {/* Developer credit with LinkedIn */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Developed by</span>
            <a 
              href="https://www.linkedin.com/in/anurag-pandey-643514263/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
            >
              Anurag Pandey
              <svg 
                className="w-4 h-4 ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;