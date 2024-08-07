export type GreenhouseJob = {
  absolute_url: string
  location: {
    name: string
  }
  updated_at: string
  title: string
  content: string
  departments: Array<{
    name: string
  }>
}
