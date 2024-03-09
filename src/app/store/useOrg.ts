import { create } from 'zustand';

type Organization = {
  organizationId: string,
  setOrganization: (org: string) => void,
}

const useOrganization = create<Organization>((set) => ({
  organizationId: '',
  setOrganization: (org) => set(() => ({ organizationId: org })),
}));

export default useOrganization;
