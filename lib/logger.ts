import '@logtail/pino'
import { type TransportTargetOptions, pino } from 'pino'

const targets: TransportTargetOptions[] = []

if (process.env.NODE_ENV === 'production') {
  targets.push({
    target: '@logtail/pino',
    options: { sourceToken: process.env.BETTERSTACK_SOURCE_TOKEN },
  })
} else {
  targets.push({
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  })
}

export const transport = pino.transport({
  targets,
})

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
  },
  transport,
)
