const InputField = ({ className, icon: Icon, disabled, ...props }) => (
  <div className={`group border-gray-200 border-2 rounded-md inline-flex items-center pl-5 pr-5 pt-3 pb-3 focus-within:border-blue-300 focus-within:border-3 transition-colors ${disabled ? 'bg-gray-50' : ''} ${className}`}>
    {Icon && <Icon className={`inline-flex text-2xl mr-2 ${disabled ? 'text-gray-400' : 'group-focus-within:text-blue-300'} transition-colors`} />}
    <input
      {...props}
      disabled={disabled}
      className={`outline-none bg-transparent w-full ${disabled ? 'cursor-not-allowed text-gray-500' : ''}`}
    />
  </div>
);

export default InputField;