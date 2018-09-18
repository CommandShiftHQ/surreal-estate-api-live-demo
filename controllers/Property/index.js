// POST /PropertyListing
// Request BODY: {name:, price, ...}
// mongodb "Proeprty" collection
const Property = require('../../models/Property/index.js');

const postProperty = (request, response) => {
    const newProperty = new Property({
        ...request.body
    });

    newProperty.save((error, savedProperty) => {
        if (error) {
            console.log('something went wrong');
            response.send('Sorry. try again.')
        }
        response.json(savedProperty);
    }); // save method ASYNC
}

module.exports = postProperty;