import { type ZodFormattedError, z } from "zod";

const EnvSchema = z.object({
	MODE: z.enum(["production", "development", "test"]).default("development"),
	VITE_SERVER_URL: z
		.string({ required_error: "env not provided!" })
		.url({ message: "must be an URL format." }),
});

const _env = EnvSchema.safeParse(import.meta.env);

function formatErrors(errors: ZodFormattedError<Map<string, string>>) {
	return Object.entries(errors)
		.map(([name, value]) => {
			if (value && "_errors" in value) {
				return `${name}: ${value._errors.join(", ")}\n`;
			}
			return undefined;
		})
		.filter(Boolean);
}

if (!_env.success) {
	console.error(
		"❌ Environment variables error",
		...formatErrors(_env.error.format()),
	);
	console.warn("warn: please check if you have correctly configured your env!");
	throw new Error("invalid environment variables");
}

export const env = _env.data;
