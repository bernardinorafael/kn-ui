import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/util'

export function FormActionButton() {
  return (
    <footer
      className={cn(
        'flex items-start justify-end gap-2 border-t border-zinc-200',
        'p-4 dark:border-zinc-800',
      )}
    >
      <Button size="sm" variant="outline">
        cancelar
      </Button>
      <Button size="sm" type="submit" form="update-password">
        cadastrar
      </Button>
    </footer>
  )
}
