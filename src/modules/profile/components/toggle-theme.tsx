'use client'

import { Box } from '@/src/components/box'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { useTheme } from 'next-themes'

export function ToggleTheme() {
  const { setTheme, theme } = useTheme()

  return (
    <Box title="tema da interface">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-500">tema</span>

          <div className="992px:max-w-[380px] w-full max-w-[520px]">
            <Select
              onValueChange={(value) => setTheme(value)}
              defaultValue={theme || 'system'}
            >
              <SelectTrigger className="w-[260px]">
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
    </Box>
  )
}