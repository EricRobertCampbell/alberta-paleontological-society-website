function filterSpecimensByQuery(specimens, query) {
  if (!query) return specimens;
  const q = query.toLowerCase().trim();
  if (!q) return specimens;
  return specimens.filter((specimen) => {
    const haystacks = [
      specimen.id ?? "",
      specimen.description ?? "",
      specimen.finderCredit ?? "",
      ...Array.isArray(specimen.tags) ? specimen.tags : [],
      // Also search in image descriptions and credits
      ...specimen.images.map((img) => img.description ?? ""),
      ...specimen.images.map((img) => img.credit ?? "")
    ].map((s) => String(s).toLowerCase());
    return haystacks.some((h) => h.includes(q));
  });
}

export { filterSpecimensByQuery as f };
