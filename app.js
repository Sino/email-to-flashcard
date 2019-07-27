const imap_simple = require('imap-simple');
const readFiles = require('./readFiles');
const FILETYPE = RegExp('.txt$');

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
 
imap_simple.connect(imapConfig).then(function (connection) {
 
    connection.openBox('INBOX').then(function () {
 
        const searchCriteria = ['UNSEEN'];
        const fetchOpts = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false,
            struct: true
        }
        
        // retrieve only the headers of the messages
        return connection.search(searchCriteria, fetchOpts);
    }).then(function (messages) {
 
        var attachments = [];
 
        messages.forEach(function (message) {
            var parts = imap_simple.getParts(message.attributes.struct);
            attachments = attachments.concat(parts.filter(function (part) {
                return part.disposition && part.disposition.type.toUpperCase() === 'ATTACHMENT';
            }).map(function (part) {
                // retrieve the attachments only of the messages with attachments
                return connection.getPartData(message, part)
                    .then(function (partData) {
                        return {
                            filename: part.disposition.params.filename,
                            data: partData,
                        };
                    });
            }));
        });

        return Promise.all(attachments);
    }).then(function (attachments) {
        attachments.forEach( (attachment) => {
            if (FILETYPE.test(attachment.filename)) {
                readFiles.stringToCards(attachment.data.toString());
            }
        });
    });
});