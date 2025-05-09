import React, { useState } from 'react'
import PriorityDropdown from './PriorityDropdown';


function EditTodoModal(
    {
        todo,
        onCancelClick,
        onDone
    }
) {

    const [newTodo,setNewTodo] = useState(todo);


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Add New Todo</h3>
                <input
                    placeholder="enter todo"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo,title:e.target.value })}
                    className="w-full outline-none bg-transparent text-md border-gray-100 border-2 focus:border-blue-400 rounded-md px-2 py-2 mb-4"
                />
                <PriorityDropdown
                    selectedPriority={newTodo.priority}
                    onSelect={(it) => {
                        setNewTodo({ ...newTodo, priority: it });
                    }}
                />
                <div className="flex justify-end items-center mt-4 gap-2">
                    <p onClick={onCancelClick} className="px-4">cancel</p>
                    <p onClick={() => onDone(newTodo)} className="text-blue-400 font-bold">Done</p>
                </div>
            </div>
        </div>
    )
}

export default EditTodoModal