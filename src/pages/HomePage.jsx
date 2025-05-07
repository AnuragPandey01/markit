import { useEffect, useState } from "react";
import { Button, Spinner, TodoItem, PriorityDropdown} from "../components";
import {useTodoStore, useAuthStore} from "../store"
import {toast} from "react-toastify"

const FilterButton = ({ isSelected, text, onSelectChange }) => {
    return <button onClick={onSelectChange} className={`${isSelected ? 'bg-blue-400 text-white font-semibold' : 'border-gray-400 border-2 text-black'}  px-4 py-1 rounded-md`}>
        {text}
    </button>
};

const HomePage = () => {

    const [selectedFilter, setSelectedFilter] = useState("All");
    const [newTodo, setNewTodo] = useState({
        title: "",
        priority: "Low"
    });

    const {todos,loading,error,fetchTodos,addTodo,markTodoAsDone} = useTodoStore()
    const {logout} = useAuthStore();

    useEffect(() => {
        fetchTodos();
    },[])

    useEffect(() => {
        toast.error(error)
    },[error])

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.innerText);
    };

    const handleAddTodo = () => {
        addTodo(newTodo.title,newTodo.priority);
        setNewTodo({
            title: "",
            priority: "Low"
        });
    }

    return <div className="flex flex-col items-center md:justify-center">
        <h2 className="text-2xl font-semibold" onClick={logout}>Mark it</h2>
        <input
            placeholder="enter todo"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ title: e.target.value, priority: newTodo.priority })}
            className="w-full md:w-sm outline-none bg-transparent text-md border-gray-400 border-3 focus:border-blue-400 rounded-md px-2 py-2 mt-5"
        />
        <PriorityDropdown
            selectedPriority={newTodo.priority}
            onSelect={(it) => {
                setNewTodo({ ...newTodo, priority: it });
            }}
        />
        {/* {addingTodo && <Spinner className="my-4"/>} */}
        <Button onClick={handleAddTodo} className="w-full md:w-sm my-4" text="Add Todo" />

        <div className="flex gap-4 flex-wrap mb-3">
            <FilterButton
                isSelected={selectedFilter == "All"}
                text={"All"}
                onSelectChange={handleFilterChange}
            />
            <FilterButton
                isSelected={selectedFilter == "High"}
                text={"High"}
                onSelectChange={handleFilterChange}
            />
            <FilterButton
                isSelected={selectedFilter == "Medium"}
                text={"Medium"}
                onSelectChange={handleFilterChange}
            />
            <FilterButton
                isSelected={selectedFilter == "Low"}
                text={"Low"}
                onSelectChange={handleFilterChange}
            />
        </div>

        {loading && <Spinner/>}

        {!loading && todos.map((todo) => (
            (selectedFilter == "All" || todo.priority == selectedFilter) && <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => {markTodoAsDone(todo.id)}}
            />
        ))}
    </div>
}

export default HomePage;