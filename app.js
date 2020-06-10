const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");

});

app.listen(process.env.PORT || 3000,function(){
  console.log("server started");
});
app.post("/",function(req,res){
  const eMail=req.body.eMail;
  const fName=req.body.fName;
  const lName=req.body.lName;
const url=  "https://us10.api.mailchimp.com/3.0/lists/164f3aa203";
const data={
  members:[{
    email_address:eMail,
    status:"subscribed",
    merge_fields:{
      FNAME:fName,
      LNAME:lName
    }
  }]
}
const jsonData=JSON.stringify(data);
const options={
  method:"POST",
  auth:"vardaan:b391e4e9fd196cfc8de44fbc11ae5fe0-us10"
}
const request=https.request(url,options,function(response){
  if(response.statusCode==200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.send("unsuccesful try again ");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});
request.write(jsonData);
request.end();
});
