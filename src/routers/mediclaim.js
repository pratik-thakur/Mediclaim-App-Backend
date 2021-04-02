const express = require('express')
const router = new express.Router()
const Mediclaim = require('../models/mediclaim')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

//insert a new mediclaim
router.post('/mediclaim',auth,async(req,res)=>{
   const mediclaim = new Mediclaim(req.body)
   try{
    await mediclaim.save()
    res.send(mediclaim)

   }catch(e){
       res.status(400).send(e)
   }
})

//update mediclaim
router.patch('/mediclaim/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['name','description','ImageUrl','amount']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation)
    return res.status(400).send({error:'Invalid Updates!'})
    try{
        const mediclaim = await Mediclaim.findOne({ _id:req.params.id })
        
        if(!mediclaim){
            return res.status(404).send()
        }
        updates.forEach(update=>mediclaim[update]=req.body[update])
        await mediclaim.save()
        res.send(mediclaim)
    }catch(e){
        res.status(400).send(e)

    }
   
})

//delete a mediclaim
router.delete('/mediclaim/:id',auth,async(req,res)=>{
    try{
        const mediclaim = await Mediclaim.findOneAndDelete({_id:req.params.id})
        if(!mediclaim)
        return res.status(404).send()
        res.send(mediclaim)
    }catch(e){
        res.status(500).send()
    }
})

//read all mediclaim
//GET /mediclaim?status=Approved
router.get('/mediclaim',auth,async(req,res)=>{
    const match ={ }
    
    if(req.query.status){
        match.status = req.query.status
    }

    try{
        const mediclaim = await Mediclaim.find(
            match
        )
        res.send(mediclaim)
    }catch(e){
        res.status(500).send()
    }
   
})

//approve a mediclaim
router.patch('/Approve/:id',adminAuth,async(req,res)=>{
    const updates = Object.keys(req.body)
    try{
        const mediclaim = await Mediclaim.findOne({ _id:req.params.id })
        
        if(!mediclaim){
            return res.status(404).send()
        }
        updates.forEach(update=>mediclaim[update]=req.body[update])
        await mediclaim.save()
        res.send(mediclaim)
    }catch(e){
        res.status(400).send(e)

    }
})

module.exports = router ;