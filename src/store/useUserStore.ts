import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    email: string;
  } | null;
  login: (email: string) => void;
  logout: () => void;
}

const useUserStore = create(
  persist<UserState>((set) => ({
    isLoggedIn: false,
    userInfo: null,
    login: (email) => set({ isLoggedIn: true, userInfo: { email } }),
    logout: () => set({ isLoggedIn: false, userInfo: null }),
  }), {
    name: "userStore",
  })
);

export default useUserStore;
