const PrismaClient = require("@prisma/client")

const prisma = new PrismaClient.PrismaClient()

async function main() {
  const user = await prisma.array.create({
    data: {
      name: 'Alice',
      email: 'alicia@prisma.com',
    },
  })
  console.log(user)
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })