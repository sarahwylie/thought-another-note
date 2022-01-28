const router = require('express').Router();
const noteRoutes = require('./notesRoutes');

router.use(noteRoutes);

module.exports = router;