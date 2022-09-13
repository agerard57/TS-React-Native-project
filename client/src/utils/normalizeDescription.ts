export const normalizeDescription = (description?: string, crop?: boolean) =>
  description && description.length > 0
    ? crop
      ? description.length > 100
        ? description.slice(0, 100) + "..."
        : description
      : description
    : "No description provided";
