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
  addTodo: async (title,priority) => {
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

  // Mark a todo as done
  markTodoAsDone: async (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, is_completed: true } : todo
      ),
    })); // Optimistic update
    console.log()
    try {
      await pb.collection("todo").update(id, { is_completed: true });
    } catch (err) {
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, is_completed: false } : todo
        ),
        error: err.message,
      }));
    }
  },
}));

export default useTodoStore;