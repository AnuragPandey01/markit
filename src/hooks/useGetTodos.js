import { useState } from "react";
import pb from "../lib/pb"


export default function useGetTodos() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const getTodos = async (priority = "All") => {
        try {
            setLoading(true);
            const filter = priority === "All"
                ? pb.filter("user_id = {:id}", { id: pb.authStore.record.id })
                : pb.filter("user_id = {:id} && priority = {:priority}", {
                    id: pb.authStore.record.id,
                    priority: priority
                });
            const res = await pb.collection('todo').getList(1, 30, {
                filter: filter
            });
            setData(res.items);
            console.log(res);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        getTodos,
        loading,
        error,
        data
    };

}