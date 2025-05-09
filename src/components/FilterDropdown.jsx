import { useState } from "react";
import { MdOutlineClose, MdOutlineKeyboardArrowDown } from "react-icons/md";


function FilterDropdown({ title, items, selectedItem,onItemClick,onClear }) {

    const [dropDownVisible, setDropDownVisible] = useState(false);

    const handleItemClick = (item) => {
        onItemClick(item);
        setDropDownVisible(false);
    };

    const toggleDropDown = () => {
        setDropDownVisible(!dropDownVisible);
    }

    return (
        <div className="cursor-pointer text-sm">
            <div className={`flex items-end px-4 py-1 border-2 ${selectedItem ? 'border-blue-400' : 'border-gray-200' }  rounded-sm`} onClick={selectedItem ? onClear : toggleDropDown}>
                {selectedItem ? selectedItem : title}
                {selectedItem ? <MdOutlineClose size={16} className="ms-1 text-blue-400"/> : <MdOutlineKeyboardArrowDown size={16} className="ms-1" />}
                
            </div>

            {dropDownVisible && <div className="flex flex-col gap-1 absolute border-gray-200 z-10 border-2 shadow-md rounded-sm bg-white">
                {items.map((item,index) => (
                    <p key={index} className="hover:bg-gray-100 px-4 py-1" onClick={()=>{handleItemClick(item)}}>{item}</p>
                ))}
            </div>}
        </div>

    );
}

export default FilterDropdown;   
