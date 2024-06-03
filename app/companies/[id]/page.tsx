import { querySelectCompany } from '@/lib/db/queries'

export default async function Company({ params }: { params: { id: string } }) {
  const [company] = await querySelectCompany(Number(params.id))

  return (
    <div>
      <h1>{company.name}</h1>
      <pre>{JSON.stringify(company, null, 2)}</pre>
    </div>
  )
}
