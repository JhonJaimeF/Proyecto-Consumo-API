import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/characters', async (req, res) => {
    try {
        const response = await fetch('https://starwars-n5ec-developuptcs-projects.vercel.app/');
        const data = await response.json();
        res.json(data.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching characters' });
    }
});

router.get('/characters/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await fetch('https://starwars-n5ec-developuptcs-projects.vercel.app/');
        const data = await response.json();
        const character = data.data.find(c => c._id === id);
        if (character) {
            res.json(character);
        } else {
            res.status(404).json({ message: 'Character not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching character' });
    }
});

router.get('/characters/name/:name', async (req, res) => {
    const name = req.params.name.toLowerCase();
    try {
        const response = await fetch('https://starwars-n5ec-developuptcs-projects.vercel.app/name/' + name);
        const data = await response.json();
        if (data.result) {
            const characters = data.data.filter(c => c.name.toLowerCase().includes(name));
            if (characters.length > 0) {
                res.json(characters);
            } else {
                res.status(404).json({ message: 'Character not found' });
            }
        } else {
            res.status(404).json({ message: 'Character not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching characters' });
    }
});

export default router;