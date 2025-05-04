import { useState } from 'react';

const PriorityDropdown = ({ selectedPriority, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const priorities = ['High', 'Medium', 'Low'];

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800'
  };

  const handleSelect = (priority) => {
    onSelect(priority);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mt-2 md:w-sm">
      <button
        type="button"
        className={`w-full flex items-center justify-between px-4 py-2 rounded-md border ${
          selectedPriority ? priorityColors[selectedPriority] : 'bg-gray-100'
        } border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          {selectedPriority || 'Select priority'}
        </span>
        <svg
          className={`h-5 w-5 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none"
          tabIndex={-1}
          role="listbox"
        >
          {priorities.map((priority) => (
            <li
              key={priority}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                priorityColors[priority]
              } ${selectedPriority === priority ? 'font-semibold' : ''}`}
              onClick={() => handleSelect(priority)}
              role="option"
              aria-selected={selectedPriority === priority}
            >
              {priority}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriorityDropdown;