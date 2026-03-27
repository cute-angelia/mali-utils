export function removeEmoji(str) {
  return str.replace(/\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu, '')
}