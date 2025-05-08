import { MdOutlineCheck, MdOutlineMoreHoriz, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useRef, useEffect } from "react";
import { useTodoStore } from "../store";

const TodoItem = ({ todo, onToggle, isOptionsOpen, onOptionsToggle, onOptionsClose }) => {
  const optionsRef = useRef(null);

  const {deleteTodo} = useTodoStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        onOptionsClose();
      }
    };

    if (isOptionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOptionsOpen, onOptionsClose]);

  return <div className={`flex items-center`}>

    {/* Checkbox */}
    <div className={`w-5 h-5 rounded border-2 border-black ${todo.is_completed ? 'opacity-60': 'opacity-100'}`} onClick={() => onToggle(todo)}>
      {todo.is_completed && <MdOutlineCheck/>}
    </div>  

    <div className={`flex items-center flex-grow px-4 ${todo.is_completed ? 'opacity-60': 'opacity-100'}`}>

      <div className="flex flex-col">
        <div className={`${todo.is_completed ? 'line-through text-gray-400': ''}`}> {todo.text}</div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-sm w-min ${
            todo.priority === 'High' 
              ? 'bg-red-200 text-red-800' 
              : todo.priority === 'Medium' 
                ? 'bg-yellow-200 text-yellow-800' 
                : 'bg-blue-200 text-blue-800'
          }`}>
            {todo.priority}
          </span>
      </div>  

    </div>

    <div className="relative" ref={optionsRef}>
      <button 
        onClick={() => onOptionsToggle(todo.id)}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <MdOutlineMoreHoriz/>
      </button>

      {isOptionsOpen && (
        <div className="absolute right-0 mt-2 min-w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              // TODO: Implement edit functionality
              onOptionsClose();
            }}
          >
            <MdOutlineEdit className="mr-2" />
            Edit
          </button>
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={() => {
              deleteTodo(todo)
              onOptionsClose();
            }}
          >
            <MdOutlineDelete className="mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  </div>

}

export default TodoItem;