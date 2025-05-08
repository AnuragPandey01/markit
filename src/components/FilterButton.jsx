
const FilterButton = ({ isSelected, text, onSelectChange }) => {
    return <button
        onClick={onSelectChange}
        className={`text-black text-sm bg-gray-100 ${isSelected ? 'border-2 border-blue-400' : ''}  px-4 py-1 rounded-sm`}>
        {text}
    </button>
};

export default FilterButton