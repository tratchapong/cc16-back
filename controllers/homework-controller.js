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

exports.getByTeacher = tryCatch( async (req, res, next) => {
  const homework = await db.homework.findMany( {
    where : { teacher_id : req.user.id},
    include : { subject : { select : { title: true } } }
  })
  res.json({homework})
} )

exports.update = tryCatch( async (req, res,next) =>{
  const {id} = req.params
  const {subject_id, question, startdate, duedate, published} = req.body
  console.log('in Update...')
  console.log(id)
  console.log(req.body)
  const rs = await db.homework.update( {
    where: { id : +id },
    data : {
      subject_id : +subject_id,
      question,
      startdate,
      duedate,
      published,
      teacher_id : req.user.id
    }
  })

  res.json({result: rs})


} )