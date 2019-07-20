const imap_simple = require('imap-simple');
const ankiConnect = require('./ankiConnect');

const imapConfig = {
    imap: {
        user: process.env.EMAIL_ACCOUNT_NAME,
        password: process.env.EMAIL_ACCOUNT_PASS,
        host: process.env.EMAIL_ACCOUNT_HOST,
        port: parseInt(process.env.EMAIL_ACCOUNT_PORT),
        tls: true,
        authTimeout: 3000,
    }
};

const cardData = imap_simple.connect(imapConfig).then( (connection) => {
    return connection.openBox('INBOX').then( () => {

        const searchCriteria = [
            'UNSEEN'
        ];

        const fetchOpts = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: true,
        }

        return connection.search(searchCriteria, fetchOpts).then( (results) => {
            const emails = [];
            results.forEach( (email) => {
                emails.push([email.parts[1].body.subject[0], email.parts[0].body]);
            });
            return emails;
        });
    });
})

cardData.then((result) => {
        ankiConnect.addNotes(result);
});