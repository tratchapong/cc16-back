module.exports = (err,req,res,next) => {
    console.log('-------')
    console.log(JSON.stringify(err))
    // console.log(Object.getOwnPropertyNames(err))
    // console.log(err.message)
    console.log('-------')
    if(err.message.includes('Student_s_code_key')) {
       return res.status(400).json({error : 'Already have this Student Code'})
    }
    
    res.status(500).json({error: err.message})
}