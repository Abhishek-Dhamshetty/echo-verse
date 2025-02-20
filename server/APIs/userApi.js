const exp=require('express')
const userApp=exp.Router();
const userAuthor=require('../models/userAuthorModel');
const expressAsyncHandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../models/articleModel')
userApp.use(exp.json())
//API


//create new user
userApp.post('/user',
    expressAsyncHandler(createUserOrAuthor)
)

//add comment
userApp.put('/comment/:articleId',
    expressAsyncHandler(async(req,res)=>{
        //get comment obj
        const commentObj=req.body;
        //add commentObj to comments array of article
        const articleWithComments=await Article.findOneAndUpdate(
            {articleId:req.params.articleId},
            { $push:{comments:commentObj} },
            {returnOriginal:false})

                console.log(articleWithComments)
            //send res

            res.status(200).send({message:"Comment added",payload:articleWithComments})
    })
)
//read articles
userApp.get('/articles', expressAsyncHandler(async(req,res)=>{
        //read all articles from DB
        const listOfArticles=await Article.find({isArticleActive:true});
        res.status(200).send({message:"articles",payload:listOfArticles})
    })
)

module.exports=userApp;