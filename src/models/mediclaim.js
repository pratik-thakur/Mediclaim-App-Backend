const mongoose=require('mongoose')

const mediclaimSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    ImageUrl:{
        type:String,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        validate(value){
            if(value<0){
                throw new Error('Amount must be a positive number')
            }
        }

    },
    status:{
        type:String,
        trim:true,
        default:'Not Approved'

    }
},{
    timestamps:true
})


const Mediclaim = mongoose.model('Mediclaim',mediclaimSchema)

module.exports = Mediclaim