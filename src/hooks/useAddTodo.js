import pb from "../lib/pb"
import {useState} from "react"

export default function useAddTodo() {

    const [loading , setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const addTodo = async (title,priority) => {
        try{
            setLoading(true);
            const data = {
                "user_id": pb.authStore.record.id,
                "text": title,
                "priority": priority,
                "is_completed": false
            };
            
            const res = await pb.collection('todo').create(data);
            setData(res);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }

    };

    return {
        addTodo,
        loading,
        error,
        data
    };
}