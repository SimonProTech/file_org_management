import { create } from 'zustand';

type UseType = {
    role: string;
    setRole: (role: string) => void;
}

const useUser = create<UseType>((set) => ({
  role: '',
  setRole: (role) => set(() => ({ role })),
}));

export default useUser;
