const data = require('../data/data.json');
const generateCSV = require('../generate-csv');

const findContactByName = (name) => {
    const response = data.find(contact => contact.name === name);
    return response;
}

const findContactByEmail = (email) => {
    const response = data.find(contact => contact.email === email);
    return response;
}

const findContactByPhone = (phone_number) => {
    const response = data.find(contact => contact.phone_number === phone_number);
    return response;
}

const postContact = (req, res) => {
    try {
        const { name, phone_number, email } = req.body;
        const duplicateContact = data.find(contact => (contact.phone_number === phone_number || contact.email === email));
        if (duplicateContact) {
            return res.status(400).json({
                message: 'Duplicate Contact'
            });
        } else {
            data.push({
                name,
                phone_number,
                email
            });
            res.json(data);
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


const getAllContacts = (req, res) => {
    res.json(data);
}


const getContactByName = (req, res) => {
    const { name } = req.params;
    res.json(findContactByName(name));
}

const getContactByPhone = (req, res) => {
    const { phone_number } = req.params;
    res.json(findContactByPhone(phone_number));
}

const getContactByEmail = (req, res) => {
    const { email } = req.params;
    res.json(findContactByEmail(email));
}

const updateContactByPhone = (req, res) => {
    try {
        const phoneParam = req.params.phone_number;
        const { name, email, phone_number } = req.body;
        const contactIndex = data.findIndex(contact => contact.phone_number === phoneParam);
        if (contactIndex !== -1) {
            if (phoneParam !== phone_number) {
                return res.status(400).json({
                    message: 'Unable to modify this phone_number'
                });
            } else {
                data[contactIndex].name = name;
                data[contactIndex].email = email;
                data[contactIndex].phone_number = phone_number;
            }
        } else {
            return res.status(400).json({
                message: 'Record is not found with this phone_number'
            });
        }

        return res.json({
            contact: data[contactIndex]
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const updateContactByEmail = (req, res) => {
    try {
        const emailParam = req.params.email;
        const { name, email, phone_number } = req.body;
        const contactIndex = data.findIndex(contact => contact.email === emailParam);
        if (contactIndex !== -1) {
            if (emailParam !== email) {
                return res.status(400).json({
                    message: 'Unable to modify this email address'
                });
            } else {
                data[contactIndex].name = name;
                data[contactIndex].email = email;
                data[contactIndex].phone_number = phone_number;
                return res.json({
                    contact: data[contactIndex]
                });
            }
        } else {
            return res.status(400).json({
                message: 'Record is not found with this email'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

const getContactCSV = (req, res) => {
    try {
        if (!data) {
            return res.status(400).json({
                message: 'Unable to generate Excel file because there is no data.'
            });
        }
        generateCSV(data);
        return res.status(200).json({
            message: `Successfuly generated file.`
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
module.exports = {
    postContact,
    getAllContacts,
    getContactByName,
    getContactByPhone,
    getContactByEmail,
    updateContactByPhone,
    updateContactByEmail,
    getContactCSV
}