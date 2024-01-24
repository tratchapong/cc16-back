const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const db = require("../models/db");

const tryCatch = func => {
  return (req, res, next) => func(req, res, next).catch(next)
}

// exports.register = async (req, res, next) => {
//   const { firstname, s_code, password, confirmPassword } = req.body;
//   try {
//     if (!(firstname && s_code && password && confirmPassword)) {
//       return next(new Error("fulfill the blank input"));
//     }

//     if (password != confirmPassword) {
//       return next(new Error("check confirm password"));
//     }
//     const { confirmPassword: cfpw, ...data } = req.body;
//     data.password = await bcrypt.hash(data.password, 10);

//     const newStudent = await db.student.create({ data });

//     res.status(200).json(newStudent);
//   } catch (error) {
//     next(error);
//   }
// };

exports.register = tryCatch( async (req, res, next) => {
  const { firstname, s_code, password, confirmPassword } = req.body;
    if (!(firstname && s_code && password && confirmPassword)) {
      throw new Error("fulfill the blank input");
    }

    if (password != confirmPassword) {
     throw new Error("check confirm password");
    }
    const { confirmPassword: cfpw, ...data } = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    const newStudent = await db.student.create({ data });

    res.status(200).json(newStudent);
})

exports.login = tryCatch(async (req, res, next) => {
  const {t_code, s_code, password} = req.body;
  console.log(req.body)
  if(t_code && s_code ) {
    throw new Error('use teacher or student code')
  }
  const result = t_code 
    ? await db.teacher.findFirstOrThrow( { where: { t_code }})
    : await db.student.findFirstOrThrow( { where: { s_code }})

  let pwOk = await bcrypt.compare(password, result.password)
  if(!pwOk) {
    throw new Error('Password Incorrect')
  }
  const payload = { id: result.id, s_code: result.s_code }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'})
  
  res.json(token)
});

exports.me = tryCatch(async (req, res, next) => {
  res.send("get my info");
});
