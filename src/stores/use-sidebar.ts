import { create } from 'zustand'

interface StoreProps {
	expanded: boolean
	toggle(): void
}

export const useSidebar = create<StoreProps>((set, get) => ({
	expanded: true,

	toggle() {
		const prev = get()
		set({ expanded: !prev.expanded })
	},
}))
