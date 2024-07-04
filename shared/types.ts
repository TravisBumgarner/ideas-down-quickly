export type PartialWithRequiredKeys<T, K extends keyof T> = Partial<T> &
  Pick<T, K>

export type URLParams = {
  'edit-idea': { ideaId: string }
  'edit-label': { labelId: string }
}
