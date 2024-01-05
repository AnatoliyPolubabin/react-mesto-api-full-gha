const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./card');
const logout = require('./logout');
const NotFoundDocumentError = require('../errs/NotFoundDocumentError');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/logout', logout);

router.use('*', NotFoundDocumentError);

module.exports = router;
