export const required = (value) => {
  return(!value)
    ? `Заголовок не может быть пустым`
    : undefined
}