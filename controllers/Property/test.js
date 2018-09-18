const httpMocks = require('node-mocks-http');
const path = require('path');
const events = require('events');
const mongoose = require('mongoose');
const propertyModel = require('../../models/Property/index.js');
const postProperty = require('./index.js');
const dotenv = require('dotenv')

dotenv.config({
    path: path.join(__dirname, '../../settings.env')
});

describe('POST PropertyListing', () => {
    beforeAll((done) => {
        mongoose.connect(process.env.DATABASE_CONN,  { useNewUrlParser: true }, done);
    });

    it('saves a new property to the database when POST endpoint is called', (done) => {
        expect.assertions(1);

        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/PropertyListing',
            body: {
                "title": "flat in manchester",
                "type": "apartment",
                "bedrooms": 2,
                "bathrooms": 2,
                "price": 160000,
                "city": "Manchester",
                "email": "contactmenot@grr.la"
            }
        });

        const response = httpMocks.createResponse({
            eventEmitter: events.EventEmitter
        });

        response.on('end', () => {
            response._getData() ;
            let propertyCreated = JSON.parse(response._getData()); //eslint-disable-line
            expect(propertyCreated.title).toBe('flat in manchester');
            done();
        })

        postProperty(request, response)
    });

    afterEach((done) => {
        propertyModel.collection.drop((e) => {
            if (e) {
              console.log(e);
            }
            done();
          });
    });

    afterAll((done) => {
        mongoose.disconnect().then(() => {
            setTimeout(done, 500)
        });
      });
})