import { type TransportTargetOptions, pino } from 'pino'

const targets: TransportTargetOptions[] = [
  {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
]

if (process.env.NODE_ENV === 'production') {
  targets.push({
    target: '@axiomhq/pino',
    options: {
      dataset: process.env.AXIOM_DATASET,
      token: process.env.AXIOM_API_TOKEN,
    },
  })
}

const transport = pino.transport({
  targets,
})

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
  },
  transport,
)
