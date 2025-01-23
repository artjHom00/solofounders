export const timePassed = (val: string | Date) => {
  return Date.now() - new Date(val).getTime()
}
