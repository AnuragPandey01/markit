const Spinner = ({className="",...props}) => (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-blue-500"></div>
    </div>
  );
  
export default Spinner;