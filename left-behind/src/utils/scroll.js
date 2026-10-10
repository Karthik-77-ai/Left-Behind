export const goTo = (i) =>
  document.querySelector(`section[data-i="${i}"]`)?.scrollIntoView({ behavior: 'smooth' })
