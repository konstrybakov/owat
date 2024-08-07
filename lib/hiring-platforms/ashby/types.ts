export type AshbyJob = {
  id: string
  title: string
  department: string
  location: string
  publishedAt: string
  isRemote: boolean
  jobUrl: string
  descriptionPlain: string
  compensation?: {
    compensationTierSummary: string
    scrapeableCompensationSalarySummary: string
    compensationTiers: Array<{
      tierSummary: string
      components: Array<
        | {
            summary: string
            compensationType: 'Salary'
            interval: string
            currencyCode: string
            minValue: number
            maxValue: number
          }
        | {
            summary: string
            compensationType: 'EquityPercentage'
            interval: string
            currencyCode: null
            minValue: number
            maxValue: number
          }
      >
    }>
    summaryComponents: Array<
      | {
          compensationType: 'Salary'
          currencyCode: string
          interval: string
          minValue: number
          maxValue: number
        }
      | {
          compensationType: 'EquityPercentage'
          currencyCode: null
          minValue: number
          maxValue: number
        }
    >
  }
}
