import type { StatusUser } from "../enum/user-status"

export interface User {
	public_id: string
	name: string
	email: string
	phone: string
	created_at: string
	status: StatusUser
}
