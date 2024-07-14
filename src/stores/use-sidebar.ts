import { create } from "zustand"
import { persist } from "zustand/middleware"

interface StoreProps {
	expanded: boolean
	toggle(): void
}

export const useSidebar = create<StoreProps>()(
	persist(
		(set, get) => ({
			expanded: true,

			toggle() {
				const prev = get()
				set({ expanded: !prev.expanded })
			},
		}),
		{ name: "kn_sidebar_state" }
	)
)
