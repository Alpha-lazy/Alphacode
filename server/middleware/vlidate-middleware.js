
const validate = (schema) => async(req, res, next) =>{

    try {
        const parseSchema = await schema.parseAsync(req.body);
        req.body = parseSchema
        next();
    } catch (err) {
        const status = 400;
        const message = 'fill the input the properly';
    
       
        const Extradetails = err.errors[0].message;
     
        
        const error  = {
            status,
            message,
            Extradetails
        }
        next(error)
         
    }
      
}

module.exports = validate;