import { useEffect, useState } from "react";
import { Button, Spinner, TodoItem, PriorityDropdown, FilterDropdown } from "../components";
import { useTodoStore, useAuthStore } from "../store"
import { toast } from "react-toastify"
import { SearchBar, FilterButton } from "../components";

const HomePage = () => {

    const priorityFilters = ["Low", "Medium", "High"];
    const statusFilters = ["pending","completed"]

    const [selectedPriorityFilter, setSelectedPriorityFilter] = useState(null);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  
    const [newTodo, setNewTodo] = useState({
        title: "",
        priority: "Low"
    });
    const [openOptionsId, setOpenOptionsId] = useState(null);

    const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

    const { todos, loading, error, fetchTodos, addTodo, toggleTodoCompletion } = useTodoStore()

    const [filteredTodos, setFilteredTodos] = useState([]);

    const { logout } = useAuthStore();

    const [searchQuery, setSearchQuery] = useState("");

    const filterByPriority = (todo) => {
        return !selectedPriorityFilter || todo.priority === selectedPriorityFilter;
    };

    const filterBySearch = (todo) => {
        return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    };

    const filterByStatus = (todo) => {
        if (!selectedStatusFilter) return true;
        return selectedStatusFilter === "completed" ? todo.is_completed : !todo.is_completed;
    };

    useEffect(() => {
        setFilteredTodos(
            todos.filter(todo => 
                filterByPriority(todo) && 
                filterBySearch(todo) && 
                filterByStatus(todo)
            )
        );
    }, [todos, searchQuery, selectedPriorityFilter, selectedStatusFilter]);

    useEffect(() => {
        fetchTodos();
    }, [])

    useEffect(() => {
        toast.error(error)
    }, [error])

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setSelectedPriorityFilter(e.target.innerText);
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



    return <div className="flex flex-col items-center px-4">
        <h2 className="text-2xl font-semibold mb-4" onClick={logout}>Mark it</h2>
        <div className="w-full md:w-sm flex mb-4">
            <SearchBar placeholder="Search todo" className="w-full" onChange={handleSearchQueryChange} value={searchQuery} />
            <Button text="+" className="aspect-square rounded-md! ms-2 text-white font-bold" onClick={() => setAddTodoModalOpen(true)} />
        </div>
        {addTodoModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h3 className="text-xl font-semibold mb-4">Add New Todo</h3>
                    <input
                        placeholder="enter todo"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ title: e.target.value, priority: newTodo.priority })}
                        className="w-full outline-none bg-transparent text-md border-gray-100 border-2 focus:border-blue-400 rounded-md px-2 py-2 mb-4"
                    />
                    <PriorityDropdown
                        selectedPriority={newTodo.priority}
                        onSelect={(it) => {
                            setNewTodo({ ...newTodo, priority: it });
                        }}
                    />
                    <div className="flex justify-end items-center mt-4 gap-2">
                        <p onClick={handleCancelTodoAdd} className="px-4">cancel</p>
                        <p onClick={handleAddTodo} className="text-blue-400 font-bold">Done</p>
                    </div>
                </div>
            </div>
        )}

        <div className="flex w-full md:w-xl gap-4">
            <FilterDropdown
                title="All"
                onItemClick={setSelectedPriorityFilter}
                items={priorityFilters}
                selectedItem={selectedPriorityFilter}
                onClear={()=>{setSelectedPriorityFilter(null)}}
            />

            <FilterDropdown
                title="status"
                onItemClick={setSelectedStatusFilter}
                items={statusFilters}
                selectedItem={selectedStatusFilter}
                onClear={()=>{setSelectedStatusFilter(null)}}
            />

        </div>

        {loading && <Spinner />}

        <div className="flex flex-col gap-4 mt-4 w-full md:w-xl">
            {!loading && filteredTodos.map((todo) => (
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

    </div>
}

export default HomePage;