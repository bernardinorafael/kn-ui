import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { mask } from 'remask'

import { ProfileBox } from './components/profile-box'
import { UpdateProfileForm } from './form/update-profile-form'

export function ProfileModule() {
  return (
    <section className="flex flex-col gap-6">
      <ProfileBox title="informações da conta">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">username</span>
            <Input
              disabled
              className="max-w-[520px] 992px:max-w-[380px]"
              value="bernardinorafael"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">cpf</span>
            <Input
              disabled
              className="max-w-[520px] 992px:max-w-[380px]"
              value="103******06"
            />
          </div>
        </div>
      </ProfileBox>

      <UpdateProfileForm />

      <ProfileBox title="alterar senha">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">senha atual</span>
            <Input
              className="max-w-[520px] 992px:max-w-[380px]"
              placeholder="************"
              type="password"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">nova senha</span>
            <Input
              className="max-w-[520px] 992px:max-w-[380px]"
              placeholder="************"
              type="password"
            />
          </div>
        </div>

        <footer className="flex items-start justify-end gap-2 border-t border-zinc-200 p-4">
          <Button disabled variant="outline" size="sm">
            cancelar
          </Button>
          <Button disabled size="sm">
            salvar
          </Button>
        </footer>
      </ProfileBox>

      <ProfileBox title="tema da interface">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">tema</span>

            <div className="w-full max-w-[520px] 992px:max-w-[380px]">
              <Select>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">claro</SelectItem>
                  <SelectItem value="dark">escuro</SelectItem>
                  <SelectItem value="system">sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </ProfileBox>
    </section>
  )
}
