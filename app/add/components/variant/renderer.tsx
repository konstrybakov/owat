'use client'

import { useAtomValue } from 'jotai'
import { variantAtom } from '../../state'
import { VariantURL } from './variants/url'

// TODO: Rethink the renderer
export const VariantRenderer = () => {
  const variant = useAtomValue(variantAtom)

  return variant === 'url' ? <VariantURL /> : <></>
}
