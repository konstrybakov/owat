import { type TransportTargetOptions, pino } from 'pino'

const targets: TransportTargetOptions[] = []

const isEdge = typeof EdgeRuntime === 'string'

if (process.env.NODE_ENV !== 'production') {
  targets.push({
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  })
}

const transport = pino.transport({
  targets,
})

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    ...(isEdge && { browser: { asObject: true } }),
  },
  transport,
)
