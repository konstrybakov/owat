import type { QueryGetJobsResult } from '@/lib/db/queries'
import { Font, Head, Tailwind } from '@react-email/components'
import { tailwindConfig } from './config/tailwind'
import { mockJobsList } from './mock/jobs-list'

const CompanyJobs = ({
  company,
  jobs,
}: { company: string; jobs: Awaited<QueryGetJobsResult>['data'] }) => (
  <section className="bg-blue-50 pt-2 p-4 rounded-md">
    <h3 className="mt-2 font-semibold mb-4">{company}</h3>
    {jobs.map(job => (
      <article key={job.id} className="py-2 px-4 bg-white rounded-md">
        <h4 className="my-2 font-semibold">{job.title}</h4>

        <p className="text-sm text-slate-500">{job.departments.join(', ')}</p>
        <p className="mb-4 text-sm">{job.location}</p>

        <a
          className="block mb-2 text-brand underline"
          href={job.url}
          target="_blank"
          rel="noreferrer"
        >
          More info ...
        </a>
      </article>
    ))}
  </section>
)

const groupJobsByCompany = (jobs: Awaited<QueryGetJobsResult>['data']) =>
  jobs.reduce(
    (acc, job) => {
      if (!acc[job.company.name]) {
        acc[job.company.name] = []
      }

      acc[job.company.name].push(job)

      return acc
    },
    {} as Record<string, Awaited<QueryGetJobsResult>['data']>,
  )

const Jobs = ({
  newJobs,
  savedJobs,
}: {
  newJobs: Awaited<QueryGetJobsResult>['data']
  savedJobs: Awaited<QueryGetJobsResult>['data']
}) => {
  const newJobsGrouped = groupJobsByCompany(newJobs || mockJobsList)
  const savedJobsGrouped = groupJobsByCompany(savedJobs || mockJobsList)

  return (
    <Tailwind config={tailwindConfig}>
      <Head>
        <Font
          fontFamily="Work Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600&display=swap',
            format: 'opentype',
          }}
        />
      </Head>
      <main className="md:container mx-auto">
        <h2>✨ New Jobs</h2>

        {newJobs.length ? (
          Object.entries(newJobsGrouped).map(([company, jobs]) => (
            <CompanyJobs key={company} company={company} jobs={jobs} />
          ))
        ) : (
          <p>💦 No new jobs found</p>
        )}

        <h2>♥️ Saved Jobs</h2>

        {savedJobs.length ? (
          Object.entries(savedJobsGrouped).map(([company, jobs]) => (
            <CompanyJobs key={company} company={company} jobs={jobs} />
          ))
        ) : (
          <p>😭 No saved jobs found</p>
        )}
      </main>
    </Tailwind>
  )
}

export default Jobs
