import { MdOutlineSearch } from "react-icons/md";

const SearchBar = ({value, placeholder, className, ...props}) => {
    return (
        <div className={`flex items-center px-[16px] py-[12px] rounded-sm bg-gray-100 ${className}`}>
            <MdOutlineSearch size={24} className="mr-2" style={{color: "#667085"}}/>
            <input
                placeholder={placeholder}
                className="bg-transparent outline-none grow-1"
                value={value}
                {...props}
            />
        </div>
    )
}

export default SearchBar;   
