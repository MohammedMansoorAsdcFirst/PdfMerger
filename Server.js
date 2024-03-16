import express from 'express';
import mergePdfs from './merge.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3000;

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/templates/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
    console.log(req.files);

    const filePath1 = path.join(__dirname, req.files[0].path);
    const filePath2 = path.join(__dirname, req.files[1].path);

    let date = await mergePdfs(filePath1, filePath2);
    // res.send({ data: req.files });
    res.redirect(`http://localhost:3000/static/${date}.pdf`);
});

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
