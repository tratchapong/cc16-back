const tryCatch = require('../utils/tryCatch')
const db = require('../models/db')

exports.getAll= tryCatch(async (req,res,next) => {
   const all = await db.subject.findMany({
    select: { id:true, title: true}
   })
   console.log(all)
   res.json({subject: all})

})