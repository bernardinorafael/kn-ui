import { Box } from '@/src/components/box'
import { Input } from '@/src/components/ui/input'

import { ToggleTheme } from './components/toggle-theme'
import { UpdatePasswordForm } from './form/update-password-form'
import { UpdateProfileForm } from './form/update-profile-form'

export function ProfileModule() {
  return (
    <section className="flex flex-col gap-6">
      <Box title="informações da conta">
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
              value="***.845.109-**"
            />
          </div>
        </div>
      </Box>

      <UpdateProfileForm />
      <UpdatePasswordForm />
      <ToggleTheme />
    </section>
  )
}
