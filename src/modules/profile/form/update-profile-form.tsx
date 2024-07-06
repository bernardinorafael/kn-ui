import React from "react";

import { useSidebar } from "@/src/stores/use-sidebar";
import { cn } from "@/src/util/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mask } from "remask";
import { toast } from "sonner";
import type { z } from "zod";

import { FormError } from "@/src/components/form-error";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { updateProfileSchema } from "@/src/modules/profile/schemas/update-profile-schema.ts";
import { sleep } from "@/src/util/sleep";

const user = {
  name: "rafael",
  surname: "bernardino",
  email: "rafaelferreirab2@gmail.com",
  phone: "48988566239",
  username: "bernardinorafael",
};

export function UpdateProfileForm() {
  const sidebar = useSidebar((store) => ({ expanded: store.expanded }));

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      document: "***.834.***-06",
      username: user.username,
    },
  });

  const errors = form.formState.errors;

  async function handleEditProfile(data: z.infer<typeof updateProfileSchema>) {
    await sleep(1000);
    toast.success("Suas informações foram atualizadas!");
    console.log(data);
  }

  const phone = form.watch("phone");

  React.useEffect(() => {
    form.setValue("phone", mask(phone, "(99) 9 9999-9999"));
  }, [form, phone]);

  return (
    <form
      className="space-y-4 p-4"
      onSubmit={form.handleSubmit(handleEditProfile)}
    >
      <div
        className={cn("grid grid-cols-1 gap-4", {
          "grid-cols-2": !sidebar.expanded,
        })}
      >
        <Label className="w-full transition-all duration-300">
          Nome
          <Input {...form.register("name")} />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </Label>

        <Label className="w-full transition-all duration-300">
          Sobrenome
          <Input {...form.register("surname")} />
          {errors.surname && <FormError>{errors.surname.message}</FormError>}
        </Label>
      </div>

      <div
        className={cn("grid grid-cols-1 gap-4", {
          "grid-cols-2": !sidebar.expanded,
        })}
      >
        <Label className="w-full transition-all duration-300">
          E-mail
          <Input {...form.register("email")} />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </Label>

        <Label className="w-full transition-all duration-300">
          Telefone
          <Input {...form.register("phone")} />
          {errors.phone && <FormError>{errors.phone.message}</FormError>}
        </Label>
      </div>

      <div
        className={cn("grid grid-cols-1 gap-4", {
          "grid-cols-2": !sidebar.expanded,
        })}
      >
        <Label className="w-full transition-all duration-300">
          CPF
          <Input disabled {...form.register("document")} />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </Label>

        <Label className="w-full transition-all duration-300">
          Nome de usuário
          <Input {...form.register("username")} />
          {errors.phone && <FormError>{errors.phone.message}</FormError>}
        </Label>
      </div>
    </form>
  );
}
