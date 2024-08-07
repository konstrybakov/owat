export enum LeverWorkplaceType {
  unspecified = 'unspecified',
  onSite = 'on-site',
  remote = 'remote',
  hybrid = 'hybrid',
}

export type LeverJob = {
  createdAt: number
  hostedUrl: string // url
  text: string // title
  workplaceType: LeverWorkplaceType // isRemote
  descriptionPlain: string // content
  salaryRange?: {
    max: number
    min: number
    currency: string
    interval: string
  }
  country: string
  categories: {
    team: string
    department: string
    location: string
  }
}
