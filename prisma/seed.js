// seed.js

const bcrypt = require('bcryptjs')
const {PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const hashPassword = bcrypt.hashSync('123456', 10)

const teacherData = [
    { firstname: 'Andy',t_code:'t001',  password: hashPassword, email: 'andy@ggg.mail'},
    { firstname: 'Bobby',t_code:'t002', password: hashPassword, email: 'bobby@ggg.mail'},
    { firstname: 'Candy',t_code:'t003', password: hashPassword, email: 'candy@ggg.mail'},
    { firstname: 'Danny',t_code:'t004', password: hashPassword, email: 'danny@ggg.mail'}
]

console.log('Seed...')

prisma.teacher.createMany({data : teacherData})
.then(console.log)

