import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/src/components/ui/button.tsx";
import { LoginForm } from "@/src/modules/auth/components/login-form.tsx";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <>
      <h1 className="font-extrabold text-4xl tracking-tight">Entrar</h1>
      <LoginForm />
      <Button
        asChild
        className="mt-5 text-zinc-400"
        variant="link"
        size="default"
      >
        <Link to="/register">Não possui uma conta? Cadastre-se</Link>
      </Button>
    </>
  );
}
