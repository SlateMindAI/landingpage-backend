const express = require('express');
const { addToWaitingList } = require('../controllers/waitingListController');

const router = express.Router();

router.post('/join-waiting-list', addToWaitingList);

module.exports = router;
