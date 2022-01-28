const router = require('express').Router();
const { createNewNote } = require('../../lib/notes');
const { notes } = require('../../data/notes');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    if (!validateNote(req.body)) {
        res.status(400).send('The note has exceeded the allowable characters.')
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.put('/notes', (req, res) => {
    req.body.id = notes.length.toString();

})

router.delete('/api/notes/:id', (req, res) => {
    const params = [req.params.note];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else {
        res.json({
          message: 'deleted',
          changes: result.note,
          id: req.params.note
        });
      }
    });
})

module.exports = router;