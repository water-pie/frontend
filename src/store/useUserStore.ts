import { create } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    email: string;
  } | null;
  login: (email: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  userInfo: null,
  login: (email) => set({ isLoggedIn: true, userInfo: { email } }),
  logout: () => set({ isLoggedIn: false, userInfo: null }),
}));

export default useUserStore;
