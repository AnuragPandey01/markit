const TodoItem = ({ todo, onToggle}) => {
  
    // Priority color mapping
    const priorityColors = {
      High: 'bg-red-100 border-red-400 text-red-800',
      Medium: 'bg-yellow-100 border-yellow-400 text-yellow-800',
      Low: 'bg-blue-100 border-blue-400 text-blue-800',
    };
  
    return (
      <div 
        className={`w-full md:w-sm flex items-center justify-between p-4 mb-2 rounded-lg border-l-4 transition-all duration-200 ${
          priorityColors[todo.priority] || 'bg-gray-100 border-gray-400'
        } ${todo.is_completed ? 'opacity-70' : ''}`}
      >
        <div className="flex items-center space-x-3">
          {/* Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={()=>onToggle(todo)}
              className={`w-5 h-5 rounded border-2 ${
                todo.is_completed 
                  ? 'border-green-500 bg-green-500' 
                  : 'border-gray-300'
              } focus:ring-0 focus:ring-offset-0 cursor-pointer transition-colors`}
            />
          </div>
  
          {/* Todo Text */}
          <span className={`text-lg text-wrap mr-3 ${
            todo.is_completed 
              ? 'line-through text-gray-500' 
              : 'text-gray-800'
          }`}>
            {todo.text}
          </span>
        </div>
  
        <div className="flex items-center space-x-2">
          {/* Priority Badge */}
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
    );
  };

  export default TodoItem;