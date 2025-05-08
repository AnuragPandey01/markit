import { create } from "zustand";
import pb from "../lib/pb";

const useTodoStore = create((set) => ({
  todos: [], // Initial state for todos
  loading: false,
  error: null,

  fetchTodos: async (priority = "All") => {
    set({ loading: true });
    try {
      const filter =
        priority === "All"
          ? `user_id = "${pb.authStore.model.id}"`
          : `user_id = "${pb.authStore.model.id}" && priority = "${priority}"`;
      const res = await pb.collection("todo").getList(1, 30, { filter });
      set({ todos: res.items, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Add a new todo
  addTodo: async (title, priority) => {
    const newTodo = {
      user_id: pb.authStore.record.id,
      text: title,
      priority: priority,
      is_completed: false,
      tempId: Date.now(),
    };
    set((state) => ({ todos: [newTodo, ...state.todos] })); // Optimistic update
    try {
      const createdTodo = await pb.collection("todo").create(newTodo);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.tempId === newTodo.tempId ? createdTodo : todo
        ),
      }));
    } catch (err) {
      set((state) => ({
        todos: state.todos.filter((todo) => todo.tempId !== newTodo.tempId),
        error: err.message,
      }));
    }
  },

  // Toggle todo completion status
  toggleTodoCompletion: async (it) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === it.id ? { ...todo, is_completed: !todo.is_completed } : todo
      ),
    })); // Optimistic update
    try {
      await pb.collection("todo").update(it.id, { is_completed: !it.is_completed });
    } catch (err) {
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === it.id ? { ...todo, is_completed: !it.is_completed } : todo
        ),
        error: err.message,
      }));
    }
  },

  deleteTodo: async (it) => {

    set((state) => ({
      todos: state.todos.filter((todo) => todo.id != it.id )
    }));
    try{
      await pb.collection("todo").delete(it.id);
    }catch(err){
      set((state) => ({
        todos: [...state.todos, it],
        error: err.message
      }));
    }
  },

}));

export default useTodoStore;