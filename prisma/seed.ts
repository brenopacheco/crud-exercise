// prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const accountA = await prisma.accountData.upsert({
    where: { id: 'accountA' },
    update: {},
    create: {
      id: 'accountA',
      name: 'The first account',
    },
  })

  const accountB = await prisma.accountData.upsert({
    where: { id: 'accountB' },
    update: {},
    create: {
      id: 'accountB',
      name: 'The second account',
    },
  })

  const movie1 = await prisma.movieData.upsert({
    where: { id: 1 },
    update: {},
    create: {
      account_id: 'accountA',
      original_title: 'Batman v Superman: Dawn of Justice',
      published: true,
      production_year: '2016',
      video_id: 'https://www.youtube.com/watch?v=0WWzgGyAH6Y',
      poster:
        'https://cdn.europosters.eu/image/750/posters/batman-v-superman-dawn-of-justice-one-sheet-i29162.jpg',
      production_country: ['USA'],
      actors: ['Ben Aflek', 'Henry Cavill'],
      directors: ['Zack Snyder'],
    },
  })

  const movie2 = await prisma.movieData.upsert({
    where: { id: 2 },
    update: {},
    create: {
      account_id: 'accountA',
      original_title: 'The Lord of the Rings: The Two Towers',
      published: true,
      production_year: '2002',
      video_id: 'https://www.youtube.com/watch?v=LbfMDwc4azU',
      poster:
        'https://cdn.europosters.eu/image/750/posters/lord-of-the-rings-two-towers-one-sheet-i11970.jpg',
      production_country: ['USA'],
      actors: ['Elijah Wood', 'Vigo Mortensen'],
      directors: ['Peter Jackson'],
    },
  })

  const movie3 = await prisma.movieData.upsert({
    where: { id: 3 },
    update: {},
    create: {
      account_id: 'accountA',
      original_title: "Harry Potter and the Philosopher's Stone",
      published: true,
      production_year: '2001',
      video_id: 'https://www.youtube.com/watch?v=mNgwNXKBEW0',
      poster:
        'https://cdn.europosters.eu/image/1300/posters/harry-potter-philosopher-s-stone-20th-anniversary-i124048.jpg',
      production_country: ['USA'],
      actors: ['Daniel Radcliffe', 'Emma Watson'],
      directors: ['Chris Columbus'],
    },
  })

  const movie4 = await prisma.movieData.upsert({
    where: { id: 4 },
    update: {},
    create: {
      account_id: 'accountB',
      original_title: 'Die Hard',
      published: true,
      production_year: '1988',
      video_id: 'https://www.youtube.com/watch?v=jaJuwKCmJbY',
      poster: 'https://image.posterlounge.com/images/big/1875924.jpg',
      production_country: ['USA'],
      actors: ['Bruce Willis'],
      directors: ['John McTiernan'],
    },
  })

  console.log({ accountA, accountB, movie1, movie2, movie3, movie4 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
