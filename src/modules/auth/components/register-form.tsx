import { useAuth } from "@/src/stores/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { FormError } from "@/src/components/form-error.tsx";
import { Loading } from "@/src/components/loading.tsx";
import { Button } from "@/src/components/ui/button.tsx";
import { Input } from "@/src/components/ui/input.tsx";
import { Label } from "@/src/components/ui/label";
import { authErrors } from "@/src/modules/auth/constants/auth-errors.ts";
import { RegisterSchema } from "@/src/modules/auth/schemas/register-schema.ts";
import { sleep } from "@/src/util/sleep.ts";

const emailAlreadyTaken = authErrors.emailAlreadyTaken;
const documentAlreadyTaken = authErrors.documentAlreadyTaken;
const unknownError = authErrors.unknownError;

export function RegisterForm() {
  const register = useAuth((store) => store.register);
  const navigate = useNavigate({ from: "/register" });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  async function handleRegister(data: z.infer<typeof RegisterSchema>) {
    try {
      /**
       * INFO: sleep fn is forcing a loading state to improve ui
       */
      await sleep(500);

      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      await navigate({ to: "/" });
    } catch (err) {
      if (isAxiosError(err)) {
        const message = err.response?.data.message;
        if (message.includes("email is already taken")) {
          toast.error(emailAlreadyTaken.title, {
            description: emailAlreadyTaken.description,
          });
          return;
        }

        if (message.includes("document is already taken")) {
          toast.error(documentAlreadyTaken.title, {
            description: documentAlreadyTaken.description,
          });
          return;
        }

        toast.error(unknownError.title, {
          description: unknownError.description,
        });
      }
    }
  }
  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      className="w-full max-w-[620px] space-y-4 px-6"
      onSubmit={form.handleSubmit(handleRegister)}
    >
      <Label>
        Nome
        <Input autoFocus {...form.register("name")} />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </Label>

      <Label>
        E-mail
        <Input {...form.register("email")} />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </Label>

      <Label>
        Senha
        <Input type="password" {...form.register("password")} />
        {errors.password && <FormError>{errors.password.message}</FormError>}
      </Label>

      <Button
        size="lg"
        className="w-full"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? <Loading /> : "Cadastrar e entrar"}
      </Button>
    </form>
  );
}
