
const InputField = ({ className, icon: Icon, ...props }) => (
  <div className={`group border-gray-200 border-2 rounded-md inline-flex items-center pl-5 pr-5 pt-3 pb-3 focus-within:border-blue-300 focus-within:border-3 transition-colors ${className}`}>
    {Icon && <Icon className="inline-flex text-2xl mr-2 group-focus-within:text-blue-300 transition-colors" />}
    <input
      {...props}
      className="outline-none bg-transparent w-full"
    />
  </div>
);
export default InputField;