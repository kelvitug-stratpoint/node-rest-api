const fs = require('fs');
const directoryPath = './public/reports';
module.exports = generateCSV = (contacts) => {
    // Extracting headers from JSON keys
    const headers = Object.keys(contacts[0]);

    // Writing headers to CSV
    const csvRows = [headers.join(",")];

    // Writing contacts to CSV
    contacts.forEach(entry => {
        const row = headers.map(header => entry[header]);
        csvRows.push(row.join(","));
    });

    // Joining rows with newline characters
    const cvsContacts = csvRows.join("\n");
    
    // Writing CSV data to file
    const csvFilePath = `${directoryPath}/contact-${Date.now()}.csv`;

    fs.writeFileSync(csvFilePath, cvsContacts, 'utf8');
}