import { create } from 'zustand';

type UseType = {
    type: string;
    setType: (type: string) => void,
}

const useType = create<UseType>((set) => ({
  type: '',
  setType: (type) => set(() => ({ type })),
}));

export default useType;
