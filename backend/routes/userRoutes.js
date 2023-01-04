const express=require('express')
const router = express.Router()

const User = require('../model/usermodel')
router.get('/', async(req,res)=>{
    const user = await User.find()
    console.log("usman")
    res.json(user);

    // user.find().then((result)=>{
    //     res.json(result);
    // }); 
    // res.json({message: 'get info'})
})

router.post('/add', async(req,res)=>{
    if(!req.body.name){
        res.status(400)
    }

    if(!req.body.age){
        res.status(400)
    }

    const user = await User.create({
        name: req.body.name,
        age : req.body.age
    })
   
    res.json(user)
   // res.json( { message: "set info"})
    
})

router.put('/update/:id', async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    })


    res.json(updatedUser)


})

router.delete('/delete/:id', async(req,res)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
    }

    await user.remove()
    res.json({id: req.params.id})
})


module.exports= router