const {z} = require('zod');

const loginShema = z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"invalid email"})
    .min(2,{message:"Email must be at least 2 character."})
    .max(240,{message:"Email must not be more than 240 characters."}),
    password:z
    .string({required_error:"password is required"})
    .min(3,{message:"Password must be at least 3 character."})
    .max(1000,{message:"Password must not be more than 1000 characters."}),

});

const validateSchema = loginShema.extend({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(2,{message:"Name must be at least 2 character."})
    .max(240,{message:"Name must not be more than 240 characters."}),


    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be at least 10 character."})
    .max(10,{message:"Phone must be at least 10 character."}),


   
})



module.exports = {validateSchema, loginShema};