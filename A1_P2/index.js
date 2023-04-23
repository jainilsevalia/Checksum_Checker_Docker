const express = require('express');
const app = express();
const fs = require('fs')
const crypto = require('crypto');

const PORT = 5001;

app.use(express.json());

app.post('/checksum-cal',(req,res)=>{

    const file = req.body.file

    function checkChecksum(str, algorithm, encoding) {
        return crypto
            .createHash(algorithm || 'md5')
            .update(str, 'utf8')
            .digest(encoding || 'hex');
    }

    fs.readFile(`/app/${file}`, 'utf-8', (err, data) => {
        if(err)
            {
                console.log('Error: ' + err);
            }
        else
            {
                var checksum = checkChecksum(data);
                res.json({
                    file,
                    checksum  
                });
            }
        });
})

app.listen(PORT, () => {console.log("Server is running on " + PORT)});