export const wildGuideBears = {
  id: 1,
  title: 'Wild Guide: Bears',
  author: 'Charles Fergus',
  bookType: 'paperback',
  price: 10,
  description: 'This is a book about bears',
} as const

export const grizzlyHeart = {
  id: 2,
  title: 'Grizzly Heart',
  author: 'Charles Russell & Maureen Enns',
  bookType: 'digital',
  price: 5,
  description: 'This is another book about bears',
} as const

export const bearViewingInAlaska = {
  id: 3,
  title: 'Bear-viewing in Alaska',
  author: 'Stephen Stringham',
  bookType: 'audio',
  price: 15,
  description: 'This is an audio book about bears',
} as const

export const books = [wildGuideBears, grizzlyHeart, bearViewingInAlaska]

export function error(message: string) {
  return {
    message,
  }
}
