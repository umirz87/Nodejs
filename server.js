const express =require('express')
const app =express()

//Enable body fields 
app.use(express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());

//Setting routes
const userRouter=require('./routes/user')
const postRouter=require('./routes/post')

//Using Route
app.use('/user',userRouter);
app.use('/post',postRouter);

//Set View 
app.set('view engine','ejs')

//Set Port
app.listen(5000)
