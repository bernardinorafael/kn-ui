import { z } from "zod"

// TODO: validate passwords
export const updatePasswordSchema = z.object({
	old: z.string(),
	new: z.string(),
})
