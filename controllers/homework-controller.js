const tryCatch = require('../utils/tryCatch')
const db = require('../models/db')

exports.addNew = tryCatch( async (req,res,next) => {
  const {subject_id, question, startdate, duedate, published} = req.body
  const rs = await db.homework.create( {
    data : {
      subject_id : +subject_id,
      question,
      startdate,
      duedate,
      published,
      teacher_id : req.user.id
    }
  })

  res.json({result : rs})
})