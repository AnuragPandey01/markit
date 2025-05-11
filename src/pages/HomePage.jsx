import { useEffect, useState } from "react";
import { Button, Spinner, TodoItem, FilterDropdown, EditTodoModal, SearchBar, TaskProgress, ProfileDrawer } from "../components";
import { useTodoStore, useAuthStore } from "../store"
import { toast } from "react-toastify"
import { useShallow } from 'zustand/react/shallow'

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

    const { todos, loading, error, fetchTodos, addTodo, toggleTodoCompletion, updateTodo } = useTodoStore(
        useShallow((state) => ({
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            fetchTodos: state.fetchTodos,
            addTodo: state.addTodo,
            toggleTodoCompletion: state.toggleTodoCompletion,
            updateTodo: state.updateTodo
        }))
    )

    const percentage = todos.length > 0 ? (todos.filter(todo => todo.is_completed).length / todos.length) * 100 : 0

    const [filteredTodos, setFilteredTodos] = useState([]);

    const { logout, avatar } = useAuthStore(
        useShallow((state) => ({
            logout: state.logout,
            avatar: state.avatar
        }))
    )

    const [searchQuery, setSearchQuery] = useState("");

    const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

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

        <div className="flex justify-between w-full md:w-xl mb-6 items-center">
            <h2 className="text-2xl font-semibold ">
                <span className="text-blue-400">M</span>
                <span>ark</span>
                <span className="text-blue-400">i</span>t
            </h2>
            <img
                src={avatar}
                className="rounded-full h-8 w-8 border-blue-400 border-2 cursor-pointer"
                onClick={() => setIsProfileDrawerOpen(true)}
            />
        </div>

        {todos.length > 0 && <TaskProgress percentage={percentage} />}

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

        {isProfileDrawerOpen &&
            <ProfileDrawer
                onClose={() => setIsProfileDrawerOpen(false)}
            />
        }

    </div>
}

export default HomePage;