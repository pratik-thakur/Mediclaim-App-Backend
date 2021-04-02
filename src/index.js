const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const mediclaimRouter = require('./routers/mediclaim')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(mediclaimRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})