export const getLocal = (name: string) => {
  const ls = localStorage.getItem(name)
  return ls ? JSON.parse(ls) : null
}
