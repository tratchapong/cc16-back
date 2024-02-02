const jwt = require('jsonwebtoken')
const db = require('../models/db')
const tryCatch = require('../utils/tryCatch')

module.exports = tryCatch(async (req, res, next) => {
  // console.log(req.headers)
  const authorization = req.headers.authorization
  if(!authorization || !(/^Bearer/i.test(authorization)) ) {
    return res.status(401).json({msg: 'Unauthorized'})
  }
  const token = authorization.split(' ')[1]
  if(!token) {
    return res.status(401).json({msg: 'Unauthorized'})
  }
  const {id, s_code, t_code} = jwt.verify(token, process.env.JWT_SECRET)
  const result = t_code 
    ? await db.teacher.findFirstOrThrow( { where: { t_code }})
    : await db.student.findFirstOrThrow( { where: { s_code }})
  req.user = {...result, role : t_code? 'teacher' : 'student'}
  next()
})