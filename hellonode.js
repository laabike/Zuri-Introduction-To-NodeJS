//Load HTTP module
const path = require('path');
const fs = require("fs");
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  //Set the response HTTP header with HTTP status and Content type for demo
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "text/html");
  //the res.statusCode and res.setHeader can be rewritten as the res.writeHead below
  // res.writeHead("200", {"Content-Type": "text/html"});
  // res.end("<h2>Hello World<h2>");

  //Set the response HTTP header with HTTP status and Content type for actual work
  // if (req.url === '/'){
  //   let filePath = path.join(__dirname, 'public', 'home.html') 
  //   fs.readFile(filePath, 'utf8', (err, data) => {
  //     res.writeHead("200", {"Content-Type": "text.html"})
  //     res.end(data)
  //   })
  // }

  // if (req.url === '/about.html'){
  //   let filePath = path.join(__dirname, 'public', 'about.html') 
  //   fs.readFile(filePath, 'utf8', (err, data) => {
  //     res.writeHead("200", {"Content-Type": "text.html"})
  //     res.end(data)
  //   })
  // }

  // if (req.url === '/contact.html'){
  //   let filePath = path.join(__dirname, 'public', 'contact.html') 
  //   fs.readFile(filePath, 'utf8', (err, data) => {
  //     res.writeHead("200", {"Content-Type": "text.html"})
  //     res.end(data)
  //   })
  // }
  //to create a dynamic file path
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'home.html': req.url)
  //to get the content type dynamically
  let contentType = getContentType(filePath) || 'text.html'
  let emptyPagePath = path.join(__dirname, 'public', '404.html')
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err){
      if (err.code === 'ENOENT'){
        fs.readFile(emptyPagePath, 'utf8', (err, content) => {
          res.writeHead(200, {'Content-Type': contentType})
          res.end(content)
        })
      }
        else {
          res.writeHead(500)
          res.end("A server error as occured.")
        }
    }

    if (!err){
      res.writeHead(200, {'Content-Type': contentType})
      res.end(content)
    }
  })
});

const getContentType = (filePath) => {
  let extname = path.extname(filePath)
  if (extname === '.js'){
    return 'text/javascript'
  }
  if (extname === '.css'){
    return 'text/css'
  }
  if (extname === '.png'){
    return 'image/png'
  }
  if (extname === '.jpg'){
    return 'image/jpeg'
  }
}

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});