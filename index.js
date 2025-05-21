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

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === '/notes' && req.method === 'GET') {
                getNotesHandler(req, res);
            }
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})