//create mini exp app
const exp=require('express');
const productApp=exp.Router();

//product routes
productApp.get('/products',(req,res)=>{
    res.send({message:'All products'})
})



//export
module.exports=productApp;