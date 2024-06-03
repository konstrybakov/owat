import type { HiringPlatform } from '@/lib/db/schema'
import { atom } from 'jotai'
import type { Variant } from './variant/types'

export const variantAtom = atom<Variant>('url')
export const platformAtom = atom<HiringPlatform | null>(null)
export const trackerURLAtom = atom<string | null>(null)
