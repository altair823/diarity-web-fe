export function redirectTo(url: string) {
  window.location.href = `${window.location.origin}${url}`
}

export function redirectToAbsolute(url: string) {
  window.location.href = url
}
