import type { HiringPlatformName } from '../db/schema'
import { Ashby } from './ashby'
import type { HiringPlatform } from './base'
import { Greenhouse } from './greenhouse'
import { Lever } from './lever'

type HiringPlatformConstructor = new (url: URL) => HiringPlatform

export const platformRegistry = new Map<
  HiringPlatformName,
  HiringPlatformConstructor
>()

const registerPlatform = (
  name: HiringPlatformName,
  platform: HiringPlatformConstructor,
) => platformRegistry.set(name, platform)

registerPlatform('greenhouse', Greenhouse)
registerPlatform('ashby', Ashby)
registerPlatform('lever', Lever)

export const createPlatform = (
  name: HiringPlatformName,
  url: URL,
): HiringPlatform => {
  const Platform = platformRegistry.get(name)

  if (!Platform) {
    throw new Error(`Unknown platform name: ${name}`)
  }

  return new Platform(url)
}
