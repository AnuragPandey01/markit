const InputField = ({ name, type, placeholder, icon: Icon, value, onChange }) => (
  <div className="group border-1 rounded-xl inline-flex items-center pl-5 pr-5 pt-3 pb-3 focus-within:border-blue-500 focus-within:border-3 transition-colors">
    <Icon className="inline-flex text-2xl group-focus-within:text-blue-500 transition-colors" />
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="outline-none bg-transparent pl-5 w-full"
    />
  </div>
);
export default InputField;