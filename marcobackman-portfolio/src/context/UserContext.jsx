import { create } from "zustand";

const useAuthStore = create((set) => ({
    userData: {
        user: null,
        token: null,
        isAuthenticated: false,
    },

    // Function to set or update user data
    setUserData: (user, token) =>
        set(() => ({
            userData: {
                user,
                token,
                isAuthenticated: true,
            },
        })),

    // Function to reset user data (logout)
    resetUserData: () =>
        set(() => ({
            userData: {
                user: null,
                token: null,
                isAuthenticated: false,
            },
        })),
}));

export default useAuthStore;