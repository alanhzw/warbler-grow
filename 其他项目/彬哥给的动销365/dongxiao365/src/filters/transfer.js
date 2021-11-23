export const transfer = (val) => {
  let value = val
  if (value !== null && value !== undefined) {
    value = value.replace(/&amp;/gi, '&')
    value = value.replace(/&lt;/gi, '<')
    value = value.replace(/&gt;/gi, '>')
    value = value.replace(/&quot;/gi, '"')
    value = value.replace(/&nbsp;/gi, ' ')
  }
  return value
}
