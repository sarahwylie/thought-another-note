const router = require('express').Router();
const notes = require('../../db/notes');

router.get('/notes', (req, res) => {
    notes.getNote()
    .then((notes) => {
        return res.json(notes)
    })
    .catch(err => {
        return res.status(500).json(err);
    })
  });

router.post('/notes', (req, res) => {
    notes.createNewNote(req.body)
    .then((notes) => {
        return res.json(notes)
    })
    .catch(err => {
        return res.status(500).json(err);
    })
});

router.delete('/notes/:id', (req, res) => {
    notes.removeNote(req.params.id)
    .then(() => res.json({ ok:true }))
    .catch(err => {
        return res.status(500).json(err);
    })
});

module.exports = router;