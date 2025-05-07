import { create } from "zustand";
import pb from "../lib/pb";

const useAuthStore = create((set) => ({
    loading: false,
    error: null,
    authenticated: pb.authStore.isValid,

    signup : async (user) => {
        set({loading: true})
        try{
            await pb.collection("users").create(user);
            await pb.collection("users").authWithPassword(user.email,user.password);
            set({loading:false,authenticated:true});
        }catch(err){
            set({error: err.message});
        }
    },

    login : async (user) => {
        set({loading: true})
        try{
            await pb.collection("users").authWithPassword(user.email,user.password);
            set({loading:false,authenticated:true});
        }catch(err){
            set({error: err.message});
        }
    },

    logout : () => {
        pb.authStore.clear();
        set({authenticated:false});
    }
}));

export default useAuthStore;