// Save the scroll position before reloading
export const saveScrollPosition = () => {
  localStorage.setItem('scrollPosition', window.scrollY.toString())
}

// Restore the scroll position after the page loads
export const restoreScrollPosition = () => {
  const scrollPosition = localStorage.getItem('scrollPosition')
  if (scrollPosition) {
    // window.scrollTo(0, parseInt(scrollPosition, 10))
    window.scrollTo({
      top: parseInt(scrollPosition, 10),
      behavior: 'smooth',
    })
    localStorage.removeItem('scrollPosition')
  }
}

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}
