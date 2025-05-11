import { create } from "zustand";
import pb from "../lib/pb";

const _getAvatar = (record) => {
    return record.avatar ? pb.files.getURL(record,record.avatar) : `https://api.dicebear.com/9.x/thumbs/svg?seed=${record.first_name}`
};

const useAuthStore = create((set) => ({
    loading: {
        signup: false,
        login: false,
        googleAuth: false,
        updateProfile: false
    },
    error: null,
    authenticated: pb.authStore.record.isValid,
    avatar: null,
    firstName: null,
    lastName: null,
    email: null,

    init: () => {
        const record = pb.authStore.record;
        if (record) {
            set({
                authenticated: true,
                avatar: _getAvatar(record),
                firstName: record.first_name,
                lastName: record.last_name,
                email: record.email
            });
        }
    },

    signup: async (user) => {
        set((state) => ({ loading: { ...state.loading, signup: true } }))
        try {
            await pb.collection("users").create(user);
            const authData = await pb.collection("users").authWithPassword(user.email, user.password);
            const record = authData.record;
            set((state) => ({ 
                loading: { ...state.loading, signup: false },
                authenticated: true, 
                avatar: _getAvatar(record),
                firstName: record.first_name,
                lastName: record.last_name,
                email: record.email
            }));
        } catch (err) {
            set((state) => ({ 
                error: err.message, 
                loading: { ...state.loading, signup: false } 
            }));
        }
    },

    login: async (user) => {
        set((state) => ({ loading: { ...state.loading, login: true } }))
        try {
            const authData = await pb.collection("users").authWithPassword(user.email, user.password);
            const record = authData.record;
            set((state) => ({ 
                loading: { ...state.loading, login: false },
                authenticated: true,
                avatar: _getAvatar(record),
                firstName: record.first_name,
                lastName: record.last_name,
                email: record.email
            }));
        } catch (err) {
            set((state) => ({ 
                error: err.message, 
                loading: { ...state.loading, login: false } 
            }));
        }
    },

    logout: () => {
        pb.authStore.clear();
        set({ authenticated: false });
    },

    googleAuth: async () => {
        set((state) => ({ loading: { ...state.loading, googleAuth: true } }))
        try {
            const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
            const meta = authData.meta;
            if (meta.isNew) {
                const first_name = meta.rawUser.given_name;
                const last_name = meta.rawUser.family_name;
                await pb.collection('users').update(authData.record.id, { first_name: first_name, last_name: last_name });
            }
            set((state) => ({ 
                loading: { ...state.loading, googleAuth: false },
                firstName: meta.rawUser.given_name, 
                lastName: meta.rawUser.family_name, 
                email: meta.email, 
                avatar: _getAvatar(record), 
                authenticated: true
            }))
        } catch (err) {
            set((state) => ({ 
                error: err.message,
                loading: { ...state.loading, googleAuth: false }
            }));
        }
    },

    updateProfile: async (firstName, lastName) => {
        set((state) => ({ loading: { ...state.loading, updateProfile: true } }))
        try {
            await pb.collection('users').update(pb.authStore.record.id, {first_name: firstName, last_name: lastName});
            set((state) => ({
                firstName: firstName, 
                lastName: lastName,
                loading: { ...state.loading, updateProfile: false }
            }));
        } catch (err) {
            set((state) => ({ 
                error: err.message,
                loading: { ...state.loading, updateProfile: false }
            }));
        }
    }
}));

export default useAuthStore;