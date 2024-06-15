import 'pino-axiom'
import { type TransportTargetOptions, pino } from 'pino'

const targets: TransportTargetOptions[] = []

console.log('logger env', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
  targets.push({
    target: 'pino-axiom',
    options: {
      orgId: process.env.AXIOM_ORG,
      dataset: process.env.AXIOM_DATASET,
      token: process.env.AXIOM_API_TOKEN,
    },
  })
} else {
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
  },
  transport,
)
