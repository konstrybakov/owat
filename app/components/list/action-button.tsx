import { Button } from '@radix-ui/themes'
import type { BaseButtonProps } from '@radix-ui/themes/dist/esm/components/base-button.js'
import type { ReactNode } from 'react'

type ActionButtonProps = {
  loading: boolean
  clickHandler: () => void
  isActive: boolean
  colorActive: BaseButtonProps['color']
  icon: ReactNode
  label: string
}

export const ActionButton = ({
  loading,
  clickHandler,
  isActive,
  colorActive,
  icon,
  label,
}: ActionButtonProps) => (
  <Button
    loading={loading}
    onClick={clickHandler}
    size="1"
    color={isActive ? colorActive : 'gray'}
    variant="soft"
  >
    {icon}
    {label}
  </Button>
)
