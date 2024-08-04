import { z } from "zod"

export const otpCodeSchema = z.object({
	code: z.string().length(6),
})
