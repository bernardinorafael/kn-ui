'use client'

import React from 'react'

import { Breadcrumb } from '@/src/components/breadcrumb'
import { Loading } from '@/src/components/loading'
import { Button } from '@/src/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { Textarea } from '@/src/components/ui/textarea'
import { api } from '@/src/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const CreateCategorySchema = z.object({
  name: z.string().min(3, 'mínimo de 3 letras para o nome da categoria.'),
  type: z.enum(['convencional', 'enumerated', 'unique']),
  obs: z.string().nullable(),
})

type CreateCategoryInput = z.infer<typeof CreateCategorySchema>

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(CreateCategorySchema),
  })

  async function handleCreateNewCategory(data: CreateCategoryInput) {
    await api.post('/categories', {
      name: data.name,
      type: data.type,
      obs: data.obs || null,
    })

    toast.success('categoria criada com sucesso!', {
      description: 'já disponível para utilização em produtos.',
    })

    setIsDialogOpen(false)
    form.reset()
  }

  return (
    <>
      <Breadcrumb path={['categorias']} />

      <div className="p-4">
        <section className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>criar categoria</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>criar nova categoria</DialogTitle>
              </DialogHeader>

              <form
                id="create-category"
                className="my-4 grid gap-4"
                onSubmit={form.handleSubmit(handleCreateNewCategory)}
              >
                <Label className="grid gap-2">
                  name
                  <Input autoFocus {...form.register('name')} />
                </Label>

                <Controller
                  control={form.control}
                  name="type"
                  render={({ field }) => {
                    return (
                      <Label className="grid gap-2">
                        grade de tamanhos
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="convencional">
                              convencional
                            </SelectItem>
                            <SelectItem value="enumerated">enumerados</SelectItem>
                            <SelectItem value="unique">único</SelectItem>
                          </SelectContent>
                        </Select>
                      </Label>
                    )
                  }}
                />

                <Label className="grid gap-2">
                  obs
                  <Textarea {...form.register('obs')} />
                </Label>
              </form>

              <DialogFooter>
                <DialogClose asChild>
                  <Button disabled={form.formState.isSubmitting} variant="outline">
                    fechar
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  form="create-category"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? <Loading /> : 'cadastrar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </>
  )
}
