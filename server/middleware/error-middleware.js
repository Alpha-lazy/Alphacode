
const errorMiddleware = (err,req,res,next) =>{
    const status = err.status || 400;
    const message = err.message || 'Somthing error occured';
    const Extradetails = err.Extradetails || 'backed error';

    return res.status(status).json({message,Extradetails})


    
}

module.exports = errorMiddleware;