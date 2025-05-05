import { useNavigate } from "react-router-dom";
import pb from "../lib/pb";
import { useEffect, useState } from "react";
import { Button, Spinner, TodoItem, PriorityDropdown, Footer } from "../components";
import useAddTodo from "../hooks/useAddTodo";
import useGetTodos from "../hooks/useGetTodos";

const FilterButton = ({ isSelected, text, onSelectChange }) => {
    return <button onClick={onSelectChange} className={`${isSelected ? 'bg-blue-400 text-white font-semibold' : 'border-gray-400 border-2 text-black'}  px-4 py-1 rounded-md`}>
        {text}
    </button>
};

const HomePage = () => {

    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [newTodo, setNewTodo] = useState({
        title: "",
        priority: "Low"
    });

    const { addTodo, loading: addingTodo, error: addError } = useAddTodo();
    const { getTodos, data, loading: fetchingTodos, error: fetchError } = useGetTodos();

    const createNewTodo = async () => {
        await addTodo(newTodo.title, newTodo.priority)
        getTodos(selectedFilter)
    };

    useEffect(() => {
        getTodos();
    },[])

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.innerText);
    };

    const handleToggle = async (todo) => {
        await pb.collection("todo").update(todo.id, {
            ...todo,
            is_completed: !todo.is_completed
        });
        getTodos();
    };

    return <div className="flex flex-col items-center md:justify-center">
        <h2 className="text-2xl font-semibold">Mark it</h2>
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
        {addingTodo && <Spinner className="my-4"/>}
        {!addingTodo && <Button onClick={createNewTodo} className="w-full md:w-sm my-4" text="Add Todo" />}

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

        {fetchingTodos && <Spinner/>}

        {!fetchingTodos && data.map((todo) => (
            (selectedFilter == "All" || todo.priority == selectedFilter) && <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
            />
        ))}
    </div>
}

export default HomePage;