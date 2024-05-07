const express = require('express');
const app = express();
const fs = require('fs');
const data = require('./data/data.json');
const generateCSV = require('./generate-csv');

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next();
})

const PORT = 3000;

app.get("/", (req, res, next) => {
    res.send("Hello from Express!");
    next();
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});

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

//contacts
app.use(express.json());
app.post('/contact', (req, res) => {

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
})


app.get('/contact/all', (req, res) => {
    res.json(data)
})

// handler for the /contact/name/:name path, which get the data based on the name parameter
app.get('/contact/name/:name', (req, res) => {
    const { name } = req.params;
    res.json(findContactByName(name));
});

// handler for the /contact/phone_number/:phone_number path, which get the data based on the phone_number parameter
app.get('/contact/phone/:phone_number', (req, res) => {
    const { phone_number } = req.params;
    res.json(findContactByPhone(phone_number));
});


app.put('/contact/phone/:phone_number', (req, res) => {
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
});



// handler for the /contact/email/:email path, which get the data based on the email parameter
app.get('/contact/email/:email', (req, res) => {
    const { email } = req.params;
    res.json(findContactByEmail(email));
});

app.put('/contact/email/:email', (req, res) => {
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
        }
    } else {
        return res.status(400).json({
            message: 'Record is not found with this email'
        });
    }

    return res.json({
        contact: data[contactIndex]
    });
});


app.get('/contact/csv', (req, res) => {

    //check contacts data 
    if(!data){
        return res.status(400).json({
            message: 'Unable to generate Excel file because there is no data.'
        });
    }
    generateCSV(data);
    return res.status(200).json({
        message: `Successfuly generated file.`
    });

});

