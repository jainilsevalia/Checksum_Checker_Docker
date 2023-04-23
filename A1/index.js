const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 5000;

app.use(express.json());

app.post('/checksum',function(request,response)
{
    const file = request.body.file;

    response.setHeader('Content-Type','application/json');

    fs.readFile(`/app/${file}`,"utf-8",(err,data) => {

        if(file == undefined || file == ""){
            response.json({
                file: null,
                error: "Invalid JSON input."
            })
        }
        else if(!fs.existsSync(`/app/${file}`)){
            response.json({
                    file: file,
                    error: "File not found."
                    }
            )
        }else{    
            const url = 'http://server:5001/checksum-cal'
            axios({
                method: "post",
                url: url,            
                data: {file : file},
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(function (res) {
                response.status(200).send(res.data)
            }).catch((error) => {
                if (error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                } else if (error.request){
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
           })
        }
    }); 
})

app.listen(PORT, () => {console.log("Client running on" + PORT)});