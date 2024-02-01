import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useStore = create(
  persist(
    (set, get: any) => ({
      urls: [],
      addUrl: (url: string) => set({ urls: [...get().urls, url] }),
      deleteUrls: () => set({ urls: [] }),
      deleteUrl: (url: string) =>
        set((state: any) => ({
          urls: state.urls.filter((u: string) => u !== url),
        })),
    }),
    {
      name: "url-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
