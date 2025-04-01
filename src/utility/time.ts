export const timeDiff = (currentTime: Date, commentTime: Date) => {
  const diff = currentTime.getTime() - commentTime.getTime()
  if (diff < 60000) {
    return '방금 전'
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}분 전`
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}시간 전`
  } else {
    return `${Math.floor(diff / 86400000)}일 전`
  }
}
