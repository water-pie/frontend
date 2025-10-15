import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    token: string;
    type: string;
  } | null;
  login: (type: string, token: string) => void;
  logout: () => void;
}

const useUserStore = create(
  persist<UserState>((set) => ({
    isLoggedIn: false,
    userInfo: null,
    login: (type, token) => set({ isLoggedIn: true, userInfo: { type, token } }),
    logout: () => set({ isLoggedIn: false, userInfo: null }),
  }), {
    name: "userStore",
  })
);

export default useUserStore;
