'use strict';

const { server } = require('../api-server/src/app');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('category API', () => {
  it('can post() a new category', () => {
    let obj = {
      name: 'Chance',
      description: 'test',
      price: 100,
      category: 'test',
    };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        let record = data.body;
        //expect(data.status).toEqual(200);
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  it('can get() a new category', () => {
    let obj = {
      name: 'Chance',
      description: 'test',
      price: 100,
      category: 'test',
    };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/categories/${data.body._id}`)
          .then(record => {
            Object.keys(obj).forEach(key => {
              expect(record.body[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a new category', () => {
    let obj = {
      name: 'Chance',
      description: 'test',
      price: 100,
      category: 'test',
    };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.delete(`/api/v1/categories/${data.body._id}`)
          .then(record => {
            Object.keys(obj).forEach(key => {
              expect(record.body[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a new category', () => {
    let obj = {
      name: 'Chance',
      description: 'test',
      price: 100,
      category: 'test',
    };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .send({ name: 'foods' })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toContain('foods');
      });
  });
});
describe('Products API', () => {
  test('Creating a new product. Should return 201 and the created object',
    () => {
      let testProduct = {
        name: 'Chance',
        description: 'Cool Dude',
        price: 100,
        category: 'Dudes',
      };

      return mockRequest.post('/api/v1/products').
        send(testProduct).
        then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Chance');
        });
    });
  test('Getting a new product. Should return 200 and the gotten object', () => {
    let testProduct = {
      name: 'Chance',
      description: 'Cool Dude',
      price: 100,
      category: 'Dudes',
    };
    return mockRequest.get('/api/v1/products').
      send(testProduct).
      then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Chance');
      });
  });
  test('Updating an old product. Should return a 200 and the updated object',
    () => {
      let testProduct = {
        name: 'Chance',
        description: 'Cool Dude',
        price: 100,
        category: 'Dudes',
      };
      return mockRequest.post('/api/v1/products').
        send(testProduct).
        send({ name: 'Harmon' }).
        then(response => {
          expect(response.status).toEqual(200);
          expect(response.text).toContain('Harmon');
        });
    });
  test('Deletes an old product. Should return a 200 and remove the object',
    () => {
      let testProduct = {
        name: 'Chance',
        description: 'Cool Dude',
        price: 100,
        category: 'Dudes',
      };
      return mockRequest.post('/api/v1/products').
        send(testProduct).
        then(data => {
          console.log(data.body);
          return mockRequest.delete(`/api/v1/products/${data.body._id}`)
            .then(response => {
              expect(response.status).toEqual(200);
            });
        });
    });
});