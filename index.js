 const express= require("express");
 const app = express();
 const port = 8080;
 const path=require("path");
 app.listen(port,()=>{
    console.log(`app is listening to ${port}`);
 });
 app.set("view engine","ejs");
 app.set("views",path.join(__dirname,"/views"));

 app.use(express.static(path.join(__dirname,"public")));
 app.use(express.urlencoded({extended:true}));

 const { v4: uuidv4 } = require("uuid");
 const methodOverride=require("method-override");
 app.use(methodOverride("_method"));

// ⇨ 'b18794e8-5d0d-417c-b361-ba38e78411b4'
 let posts=[
    {
        id:uuidv4(),
        username:"alok pandey",
        content:"hi world, today is a nice day , beacuse today you know me..."
    },
    {
          id:uuidv4(),
        username:"prince pandey",
        content:"fact:humans are also an animal "
    },   
     {
          id:uuidv4(),
        username:"aditya gupta ",
        content:"doing b.tech from tier 3 college is a curse for me  "
    },

 ];
 app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
 }); 
  app.get("/posts/new",(req,res)=>{
    // create a form and after submiting that form you have a post request 
    res.render("new.ejs");
 }); 
  app.post("/posts",(req,res)=>{
    // create a post // create route
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
 });  
  app.get("/posts/:id",(req,res)=>{
    // existing post ko find karke dikhana 
   let {id}= req.params;
   let post = posts.find((p)=>p.id===id);
    res.render("show.ejs",{post});
 }); 
  
app.patch("/posts/:id", (req,res)=>{
    //update route 
    let{id}= req.params;
    let post=posts.find((p)=>p.id===id);
    let newcontent=req.body.content;
    post.content=newcontent; // content update 
    res.redirect("/posts"); // redirect to the all posts page 

});
app.get("/posts/:id/edit",(req,res)=>{
    //get request fro serving a form which sends patch request by the help of 
    // method-overriding
    let {id} = req.params;
   let post=posts.find((p)=>p.id===id);
    res.render("edit.ejs",{post});
}); 

app.delete("/posts/:id",(req,res)=>{
     let {id} = req.params;
     posts=posts.filter((p)=>p.id!==id);
     res.redirect("/posts");
});
