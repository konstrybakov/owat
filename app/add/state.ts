import type { HiringPlatformName } from '@/lib/db/schema'
import { atom } from 'jotai'
import type { Variant } from './components/variant/types'

export const variantAtom = atom<Variant>('url')
export const platformAtom = atom<HiringPlatformName | null>(null)
export const trackerURLAtom = atom<string | null>(null)
