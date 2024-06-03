export type ActionResponse<Data> =
  | {
      data: Data
      error: false
    }
  | {
      error: true
      errorMessage: string
    }
