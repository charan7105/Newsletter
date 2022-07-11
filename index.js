const express=require("express")
const bodyParser=require("body-parser")
const path = require('path');
const https = require("https");
const { request } = require("http");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
// Whatever the user enterd we need to get the output so for that we use body Parser

app.get("/",function(req,res)
{
      res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{     
      const firstName = req.body.firstname;
      const lastName = req.body.lastname;
      const email = req.body.email;

      const data = 
      {
            members: 
            [{
                  email_address: email,
                  status: "subscribed",
                  merge_fields: 
                  {
                        FNAME : firstName, 
                        LNAME : lastName,
                  }
            }]
      };
      const jsonData = JSON.stringify(data);

      const url = "https://us8.api.mailchimp.com/3.0/lists/b86246deb6";

      const options = 
      {
            method: "POST",
            auth : "charan:a4a93ce7de9d6d51df5dcc53a6d36226-us8",
      }

      const request = https.request(url, options, function(response)
      {
            if(response.statusCode === 200){
                  res.sendFile(__dirname+"/success.html");
            }
            else{
                  res.sendFile(__dirname+"/failure.html");
            }

            // response.on("data",function(data){
            //       console.log(JSON.parse(data));
            // })
      })
      request.write(jsonData);
      request.end();
});

app.listen(process.env.PORT || 3000,function()
{
      console.log("Server is running on port 3000");
});
// module.exports = app;


// a4a93ce7de9d6d51df5dcc53a6d36226-us8 KEY

// b86246deb6 Audience ID