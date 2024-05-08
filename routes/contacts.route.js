const express = require('express');
const router = express.Router();
const { postContact, getAllContacts, getContactByName, getContactByPhone, getContactByEmail, updateContactByPhone, updateContactByEmail, getContactCSV } = require('../controllers/contacts.controller.js');


router.post('/', postContact);

router.get('/all',getAllContacts);

router.get('/name/:name',getContactByName);

router.get('/email/:email',getContactByEmail);

router.get('/phone/:phone_number',getContactByPhone);

router.put('/email/:email',updateContactByEmail);

router.put('/phone/:phone_number',updateContactByPhone);

router.get('/csv',getContactCSV)


module.exports = router;