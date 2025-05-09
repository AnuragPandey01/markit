const Button = ({text,className="",...props}) =>{
    return <button className={`h-[48px] bg-blue-400 cursor-pointer rounded-xl hover:shadow-blue-500/50 hover:shadow-lg ${className}`} {...props}>
    <p className="text-white font-bold">{text}</p>
</button>
};

export default Button;

