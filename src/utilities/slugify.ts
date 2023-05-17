export const slugify = (base: string) => {
  return base.replace(/[^a-zA-Z]+/g, "_").toLowerCase()
}
