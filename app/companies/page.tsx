import { querySelectAllCompanies } from '@/lib/db/queries'
import Link from 'next/link'

export default async function Companies() {
  const companies = await querySelectAllCompanies()

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            <Link href={`/companies/${company.id}`}>{company.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
