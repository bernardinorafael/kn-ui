import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/src/components/ui/button.tsx";
import { RegisterForm } from "@/src/modules/auth/components/register-form.tsx";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <>
      <h1 className="font-extrabold text-4xl tracking-tight">Criar conta</h1>
      <RegisterForm />
      <Button
        asChild
        className="max-w-[620px] p-0 text-zinc-400"
        variant="link"
        size="lg"
      >
        <Link to="/login">Entrar agora</Link>
      </Button>
    </>
  );
}
