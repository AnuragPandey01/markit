import { useEffect, useState} from "react";
import { Button, Spinner, TodoItem, PriorityDropdown } from "../components";
import { useTodoStore, useAuthStore } from "../store"
import { toast } from "react-toastify"
import { SearchBar } from "../components";

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
    const [openOptionsId, setOpenOptionsId] = useState(null);

    const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

    const { filteredTodo: todos, loading, error, fetchTodos, addTodo, toggleTodoCompletion, filterTodo } = useTodoStore()
    const { logout } = useAuthStore();

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchTodos();
    }, [])

    useEffect(() => {
        toast.error(error)
    }, [error])

    const handleSearchQueryChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        setTimeout(() => {
            filterTodo(selectedFilter, query);
        }, 500);            
    };

    const handleFilterChange = (e) => {
        const priorityQuery = e.target.innerText;
        setSelectedFilter(priorityQuery);
        filterTodo(priorityQuery, searchQuery);
    };

    const handleAddTodo = () => {
        addTodo(newTodo.title, newTodo.priority);
        setNewTodo({
            title: "",
            priority: "Low"
        });
        setAddTodoModalOpen(false);
    }

    const handleCancelTodoAdd = () => {
        setNewTodo({
            title: "",
            priority: "Low"
        });
        setAddTodoModalOpen(false);
    }

    const handleOptionsToggle = (todoId) => {
        setOpenOptionsId(openOptionsId === todoId ? null : todoId);
    };

    const handleOptionsClose = () => {
        setOpenOptionsId(null);
    };

    

    return <div className="flex flex-col items-center md:justify-center">
        <h2 className="text-2xl font-semibold mb-4" onClick={logout}>Mark it</h2>
        <div className="w-full md:w-sm flex mb-4">
            <SearchBar placeholder="Search todo" className="w-full" onChange ={handleSearchQueryChange} value={searchQuery} />
            <Button text="+" className="w-10 rounded-md! ms-2 text-white font-bold" onClick={() => setAddTodoModalOpen(true)} />
        </div>
        {addTodoModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h3 className="text-xl font-semibold mb-4">Add New Todo</h3>
                    <input
                        placeholder="enter todo"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ title: e.target.value, priority: newTodo.priority })}
                        className="w-full outline-none bg-transparent text-md border-gray-400 border-2 focus:border-blue-400 rounded-md px-2 py-2 mb-4"
                    />
                    <PriorityDropdown
                        selectedPriority={newTodo.priority}
                        onSelect={(it) => {
                            setNewTodo({ ...newTodo, priority: it });
                        }}
                    />
                    <div className="flex justify-end mt-4 gap-2">
                        <Button onClick={handleCancelTodoAdd} className="px-4" text="Cancel" />
                        <Button onClick={handleAddTodo} className="px-4" text="Add Todo" />
                    </div>
                </div>
            </div>
        )}

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

        {loading && <Spinner />}

        {!loading && todos.map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => { toggleTodoCompletion(todo) }}
                isOptionsOpen={openOptionsId === todo.id}
                onOptionsToggle={handleOptionsToggle}
                onOptionsClose={handleOptionsClose}
            />
        ))}
    </div>
}

export default HomePage;