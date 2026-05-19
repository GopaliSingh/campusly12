



const getaddhome=(req,res,next)=>{
//res.sendFile(path.join(__dirname,'../','views','additem.html'));
res.render('additem',{pageTitle:'Add item'});
};



module.exports=getaddhome;


