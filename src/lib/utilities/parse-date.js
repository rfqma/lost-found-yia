export const parseDate = (_seconds, _nanoseconds) => {
  const milliseconds = _seconds * 1000 + Math.round(_nanoseconds / 1e6)
  const parsedDate = new Date(milliseconds)

  const year = parsedDate.getFullYear()
  const month = parsedDate.getMonth() + 1
  const day = parsedDate.getDate()
  const hours = parsedDate.getHours()
  const minutes = parsedDate.getMinutes()
  const seconds = parsedDate.getSeconds()

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
}