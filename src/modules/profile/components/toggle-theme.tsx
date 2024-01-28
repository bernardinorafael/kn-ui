'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { useTheme } from 'next-themes'

import { ProfileBox } from './profile-box'

export function ToggleTheme() {
  const { setTheme, theme } = useTheme()

  return (
    <ProfileBox title="tema da interface">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-500">tema</span>

          <div className="w-full max-w-[520px] 992px:max-w-[380px]">
            <Select
              onValueChange={(value) => setTheme(value)}
              defaultValue={theme || 'system'}
            >
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
  )
}
