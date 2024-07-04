export type PartialWithRequiredKeys<T, K extends keyof T> = Partial<T> &
  Pick<T, K>

export type URLParams = {
  'add-idea': { labelId: string }
  'edit-idea': { ideaId: string }
  'edit-label': { labelId: string }
}

export type IdeasByLabel = {
  color: string
  icon: string
  labelText: string
  ideas: { id: string; text: string; createdAt: string }[]
  labelId: string
}

export type IdeasByDateAndLabel = {
  [date: string]: { [labelId: string]: IdeasByLabel }
}
