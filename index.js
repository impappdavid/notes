import { createServer } from 'http';
import fs from 'fs/promises'
const PORT = process.env.PORT;

const logger = (req, _, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const jsonMiddleware = (_, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next()
}

const getNotesHandler = async (_, res) => {
    try {
        const notes = await fs.readFile('./public/notes.json', 'utf-8')
        try {
            res.write(notes); // `notes` is already a string from readFile with 'utf-8'
            res.end();
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to read notes' }));
        }
    } catch (error) {
        console.log(error)
    }
};

const getNoteByIdHandler = async (req, res) => {
    const id = req.url.split('/')[2];
    try {
        const data = await fs.readFile('./public/notes.json', 'utf-8')
        const notes = JSON.parse(data)

        const note = notes.find(note => note.id === parseInt(id));

        if(note){
            res.statusCode= 200;
            res.write(JSON.stringify(note))
        }
    } catch (error) {
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'Not found'}))
    }
    res.end();
    
}

const createNewNoteHandler = async (req, res) => {
    let body = "";

    try {
        const data = await fs.readFile('./public/notes.json', 'utf-8')
        const notes = JSON.parse(data)


        req.on('data', (chunk) => {
            body += chunk.toString();
        });
    
        req.on('end', async () => {
            const note = JSON.parse(body);

            notes.push(note);

            console.log(notes)
            try {
                try {
                    await fs.writeFile('./public/notes.json', `${JSON.stringify(notes)}`)
                } catch (error) {
                    console.log(error)
                }
                res.statusCode = 201;
                res.write(JSON.stringify(note));
                res.end();
            } catch (error) {
                console.log(error)
            }
    
        })

    } catch (error) {
        console.log(error)
    }
    
}

const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Not Found' }));
    res.end();
}

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/notes' && req.method === 'GET') {
                getNotesHandler(req, res);
            } else if (req.url === '/notes' && req.method === 'POST') {
                createNewNoteHandler(req, res)
            } else if (req.url.match(/\/notes\/([0-9]+)/) && req.method === 'GET') {
                getNoteByIdHandler(req, res);
            } else{
                notFoundHandler(req, res);
            }
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})