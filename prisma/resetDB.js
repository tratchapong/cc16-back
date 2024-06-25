require('dotenv').config()
const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database superhomework')
  await prisma.$executeRawUnsafe('CREATE Database superhomework')
}
console.log('Reset DB..')
run()