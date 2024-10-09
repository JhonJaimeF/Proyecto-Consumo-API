import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/characters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static('public'));

app.use('/api', router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});