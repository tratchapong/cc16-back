module.exports = (err,req,res,next) => {
    JSON.status(500).json({error: err.message})
}