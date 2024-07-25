import Jobs from '@/emails/jobs'
import { queryGetJobs } from '@/lib/db/queries'
import { logger, transport } from '@/lib/logger'
import { render } from '@react-email/render'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { headers } from 'next/headers'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const GET = async () => {
  try {
    logger.info('Starting `send-email` cron job')

    const headerList = headers()
    const auth = headerList.get('Authorization')

    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json(
        {
          message: ReasonPhrases.UNAUTHORIZED,
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        },
      )
    }

    const recipients = process.env.PERSONAL_EMAIL

    logger.info('Found recipients')

    if (!recipients) {
      throw new Error('No recipients found')
    }

    const { data: jobs } = await queryGetJobs(['new'])
    const { data: savedJobs } = await queryGetJobs(['topChoice'])

    logger.info(
      { newJobs: jobs.length, savedJobs: savedJobs.length },
      'Found jobs',
    )

    const { data, error } = await resend.emails.send({
      from: 'OWAT <robots@mail.owatnow.com>',
      to: [recipients],
      subject: "Today's Jobs",
      html: render(<Jobs newJobs={jobs} savedJobs={savedJobs} />),
    })

    if (error) {
      throw error
    }

    return Response.json({ data }, { status: StatusCodes.OK })
  } catch (error) {
    logger.error({ error }, 'Error sending email')

    return Response.json(
      { error },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    )
  } finally {
    logger.info('Finished `send-email` cron job')

    await transport.close()
  }
}
