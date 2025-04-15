const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req,res) =>{
    const filePath = path.join(__dirname, req.url === "/"? "index.html":req.url)

    const extName = path.extname(filePath).toLowerCase();

    let mimeTypes = {
        ".html" : "text/html",
        ".css":"text/css",
        ".js":"text/js",
        ".png":"image/png",
    }

    const contentType = mimeTypes[extName]||"application/octet-stream"

    fs.readFile(filePath , (error , content) =>{
        if (error){
            if (error.code === "ENOENT"){
                res.writeHead(400, {"content-type": "text/html"})
                res.end("404 : file not found behen ke lode ")
            } else {
                res.writeHead(500)
                res.end(`server error ${error.code}`)
            }
        } else {
            res.writeHead(200,{"content-type": contentType} )
            res.end(content,"utf8")
        }
    })
});


server.listen(port , ()=>{
    console.log(`server is listening on ${port}`);
})