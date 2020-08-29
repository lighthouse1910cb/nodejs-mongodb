const express = require('express');
const devController = require('../controllers/devController');

const router = express.Router();

router.get('/', devController.dev_index);
router.post('/', devController.dev_create);
router.get('/:id', devController.dev_details);
router.delete('/:id', devController.dev_delete);
router.put('/:id', devController.dev_update);

module.exports = router;