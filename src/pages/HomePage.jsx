import { useEffect, useState } from "react";
import { Button, Spinner, TodoItem, FilterDropdown, EditTodoModal, SearchBar, TaskProgress } from "../components";
import { useTodoStore, useAuthStore } from "../store"
import { toast } from "react-toastify"
import { PiUserRectangle } from "react-icons/pi";

const HomePage = () => {

    const priorityFilters = ["Low", "Medium", "High"];
    const statusFilters = ["pending", "completed"]

    const [selectedPriorityFilter, setSelectedPriorityFilter] = useState(null);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);

    const [newTodo, setNewTodo] = useState({
        title: "",
        priority: "Low"
    });

    const [openOptionsId, setOpenOptionsId] = useState(null);

    const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

    const { todos, loading, error, fetchTodos, addTodo, toggleTodoCompletion, updateTodo } = useTodoStore()

    const percentage = todos.length > 0 ? (todos.filter(todo => todo.is_completed).length / todos.length) * 100 : 0

    const [filteredTodos, setFilteredTodos] = useState([]);

    const { logout } = useAuthStore();

    const [searchQuery, setSearchQuery] = useState("");

    const filterByPriority = (todo) => {
        return !selectedPriorityFilter || todo.priority === selectedPriorityFilter;
    };

    const filterBySearch = (todo) => {
        return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
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

    const handleAddTodo = (newTodo) => {
        if (newTodo.user_id) updateTodo(newTodo);
        else addTodo(newTodo.title, newTodo.priority);
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

    const handleTodoEditClick = (todo) => {
        setNewTodo(todo);
        setAddTodoModalOpen(true);
    }

    return <div className="flex flex-col items-center px-4">
        <h2 className="text-2xl font-semibold mb-4" onClick={logout}>Mark it</h2>

        {todos.length > 0 && <TaskProgress percentage={percentage}/>}

        <div className="w-full md:w-lg flex mb-4">
            <SearchBar placeholder="Search todo" className="w-full" onChange={handleSearchQueryChange} value={searchQuery} />
            <Button text="+" className="aspect-square rounded-md! ms-2 text-white font-bold" onClick={() => setAddTodoModalOpen(true)} />
        </div>

        {addTodoModalOpen &&
            <EditTodoModal
                todo={newTodo}
                onCancelClick={handleCancelTodoAdd}
                onDone={handleAddTodo}
            />
        }

        <div className="flex w-full md:w-xl gap-4">
            <FilterDropdown
                title="All"
                onItemClick={setSelectedPriorityFilter}
                items={priorityFilters}
                selectedItem={selectedPriorityFilter}
                onClear={() => { setSelectedPriorityFilter(null) }}
            />

            <FilterDropdown
                title="status"
                onItemClick={setSelectedStatusFilter}
                items={statusFilters}
                selectedItem={selectedStatusFilter}
                onClear={() => { setSelectedStatusFilter(null) }}
            />

        </div>

        {loading && <Spinner />}

        <div className="flex flex-col gap-4 mt-4 w-full md:w-xl">
            {!loading && filteredTodos.map((todo) => (
                <TodoItem
                    key={todo.id || todo.tempId}
                    todo={todo}
                    onToggle={() => { toggleTodoCompletion(todo) }}
                    isOptionsOpen={openOptionsId === todo.id}
                    onOptionsToggle={handleOptionsToggle}
                    onOptionsClose={handleOptionsClose}
                    onEditClick={() => handleTodoEditClick(todo)}
                />
            ))}
        </div>

    </div>
}

export default HomePage;