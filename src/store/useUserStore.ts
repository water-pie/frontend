import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    email: string;
    type: number; // 1: Influencer, 2: Marketing, 3: Advertising Agency
  } | null;
  login: (email: string, type: number) => void;
  logout: () => void;
}

const useUserStore = create(
  persist<UserState>((set) => ({
    isLoggedIn: false,
    userInfo: null,
    login: (email, type) => set({ isLoggedIn: true, userInfo: { email, type } }),
    logout: () => set({ isLoggedIn: false, userInfo: null }),
  }), {
    name: "userStore",
  })
);

export default useUserStore;
