import { Plus } from "@phosphor-icons/react";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export function CreateProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="default">
          <Plus weight="bold" size={15} />
          Criar produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar um novo produto</DialogTitle>
        </DialogHeader>

        <form className="my-4 space-y-4">
          <Label>
            Nome
            <Input autoFocus />
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Label>
              Quantidade
              <Input />
            </Label>
            <Label>
              Preço
              <Input />
            </Label>
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
