const HorizontalDivider = ({ text = "OR" }) => {
    return (
        <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm font-medium">{text}</span>
            <div className="flex-1 border-t border-gray-300"></div>
        </div>
    );
};

export default HorizontalDivider;