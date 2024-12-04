require('dotenv').config();
const express = require('express');
const router = require('./router/auth-route');
const connect = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');
const contactrouter = require('./router/contact-route');
const adminRouter = require('./router/admin-route')
const cors = require("cors");
const serviceRouter = require('./router/service-route');
const app = express();
const PORT = 5000;
const path = require('path')

app.use(express.json());

// cors access

const corsOption = {
    origin:"http://localhost:5173",
    method:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credential:true
}

const _dirname = path.resolve();
app.use(cors(corsOption));
app.use('/api',contactrouter);
app.use('/api/auth', router);
app.use('/admin', adminRouter);
app.use('/api/data', serviceRouter)

app.use(errorMiddleware)

app.use(express.static(path.join(_dirname, "/Mern-adminPanel/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname, "Mern-adminPanel" , "dist" , "index.html"))
})
connect().then(
app.listen(PORT, () => {
    console.log(`Server is listen at port ${PORT}`);
})

)