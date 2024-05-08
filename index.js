const express = require('express');
const app = express();
const contactRoute = require('./routes/contacts.route')

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

//contacts
app.use(express.json());
app.use('/contact', contactRoute)




