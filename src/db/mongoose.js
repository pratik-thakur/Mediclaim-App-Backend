const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/Mediclaim-App',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})
