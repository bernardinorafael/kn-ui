import { Box } from '@/src/components/box'
import { Input } from '@/src/components/ui/input'
import { ToggleTheme } from '@/src/modules/profile/components/toggle-theme.tsx'
import { UpdatePasswordForm } from '@/src/modules/profile/form/update-password-form.tsx'
import { UpdateProfileForm } from '@/src/modules/profile/form/update-profile-form.tsx'

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
