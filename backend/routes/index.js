const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./card');
const NotFoundDocumentError = require('../errs/NotFoundDocumentError');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', NotFoundDocumentError);

module.exports = router;
