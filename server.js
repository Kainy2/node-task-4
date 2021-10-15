const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    res.setHeader('Content-Type', 'text/html');

    let path = './Routes/'


    switch (req.url) {
        case '/':
            res.statusCode = 200
            path += 'index.html'
            break;
        case '/form':
            res.statusCode = 200
            path += 'Form1.html'
            break;

        default:
            res.statusCode = 404

            break;
    }


    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end();
        } else {
            res.end(data);
        }
    })
    // case '/form': fs.readFile('./Routes/Form1.html', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         res.end();
    //     } else {
    //         res.statusCode = 200
    //         res.write(data)
    //         res.end();
    //     }
    // })
    //     break;
})

server.listen(3000, () => { console.log('The server is Runninng on port 3000') })