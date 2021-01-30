const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');

const app = require('../app');

describe('Rule validation API', () => {
  test('Should respond with appropriate error message if "rule" field is ommited', (done) => {
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send({
        data: null,
      })
      .end((_, res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: 'rule is required.',
          status: 'error',
          data: null,
        });
        done();
      });
  });

  test('Should respond with appropriate error message if "data" field is ommited', (done) => {
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send({
        rule: {
          field: '12',
          condition: 'gt',
          condition_value: 11,
        },
      })
      .end((_, res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: 'data is required.',
          status: 'error',
          data: null,
        });
        done();
      });
  });

  test('Should respond with appropriate error message for invalid type for "rule.field"', (done) => {
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send({
        rule: {
          field: 12,
          condition: 'gt',
          condition_value: 11,
        },
        data: null,
      })
      .end((_, res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: 'rule.field must be a string.',
          status: 'error',
          data: null,
        });
        done();
      });
  });

  test('Should respond with appropriate error message for invalid type for "rule.condition"', (done) => {
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send({
        rule: {
          field: 'name.straw',
          condition: 12,
          condition_value: 11,
        },
        data: null,
      })
      .end((_, res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message:
            'rule.condition must be one of [eq, neq, gt, gte, contains].',
          status: 'error',
          data: null,
        });
        done();
      });
  });

  test('Should return a successful validation response if data validation is successful', (done) => {
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send({
        rule: {
          field: 'missions.count',
          condition: 'gte',
          condition_value: 30
        },
        data: {
          missions: { count: 45 }
        }
      })
      .end((_, res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          message: 'Field missions.count successfully validated.',
          status: 'success',
          data: {
            validation: {
              error: false,
              field: 'missions.count',
              field_value: 45,
              condition: 'gte',
              condition_value: 30,
            },
          },
        });
        done();
      });
  });

  test('Should return a failure response if data validation fails', (done) => {
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send({
        rule: {
          field: '2',
          condition: 'contains',
          condition_value: 'field'
        },
        data: ['field', 'condiiton', 'condition_value'],
      })
      .end((_, res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: 'Field 2 failed validation.',
          status: 'error',
          data: {
            validation: {
              error: true,
              field: '2',
              field_value: 'condition_value',
              condition: 'contains',
              condition_value: 'field',
            },
          },
        });
        done();
      });
  });

  test('Should return a failure response if field is missing from data', (done) => {
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send({
        rule: {
          field: '7',
          condition: 'contains',
          condition_value: 'field'
        },
        data: ['field', 'condiiton', 'condition_value'],
      })
      .end((_, res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: 'Field 7 is missing from data.',
          status: 'error',
          data: null
        });
        done();
      });
  });

  test('Should return a failure response if data is invalid type', (done) => {
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send({
        rule: {
          field: '7',
          condition: 'contains',
          condition_value: 'field'
        },
        data: 200,
      })
      .end((_, res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
          message: 'data should be an object, array or string.',
          status: 'error',
          data: null
        });
        done();
      });
  });
});
