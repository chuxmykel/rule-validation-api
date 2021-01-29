const { test, expect, describe } = require('@jest/globals');

const validate = require('../utils/rule-validator');

describe('Rule Validator', () => {
  test('Should validate rule for nested JSON objects successfully', () => {
    const payload = {
      rule: {
        field: 'missions.count',
        condition: 'gte',
        condition_value: 30
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: {
          count: 45,
          successful: 44,
          failed: 1
        }
      }
    };

    expect(validate(payload)).toEqual({
      validation: {
        error: false,
        field: 'missions.count',
        field_value: 45,
        condition: 'gte',
        condition_value: 30,
      },
    });
  });

  test('Should validate rule for nested JSON objects successfully', () => {
    const payload = {
      rule: {
        field: 'missions.failed',
        condition: 'neq',
        condition_value: 'a'
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: {
          count: 45,
          successful: 44,
          failed: 1
        }
      }
    };

    expect(validate(payload)).toEqual({
      validation: {
        error: false,
        field: 'missions.failed',
        field_value: 1,
        condition: 'neq',
        condition_value: 'a',
      },
    });
  });

  test('Should validate rule for JSON objects successfully', () => {
    const payload = {
      rule: {
        field: 'age',
        condition: 'eq',
        condition_value: 34
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: {
          count: 45,
          successful: 44,
          failed: 1
        }
      }
    };

    expect(validate(payload)).toEqual({
      validation: {
        error: false,
        field: 'age',
        field_value: 34,
        condition: 'eq',
        condition_value: 34,
      },
    });
  });

  test('Should validate rule for arrays successfully', () => {
    const payload = {
      rule: {
        field: '1',
        condition: 'contains',
        condition_value: 'rocinante'
      },
      data: ['The Nauvoo', 'The rocinante', 'The Roci', 'Tycho']
    };

    expect(validate(payload)).toEqual({
      validation: {
        error: false,
        field: '1',
        field_value: 'The rocinante',
        condition: 'contains',
        condition_value: 'rocinante',
      },
    });
  });

  test('Should validate rule for arrays successfully', () => {
    const payload = {
      rule: {
        field: '4',
        condition: 'eq',
        condition_value: 'Flutterwave'
      },
      data: ['NIBSS', 'PayStack', 'Interswitch', 'ETransact', 'Flutterwave']
    };

    expect(validate(payload)).toEqual({
      validation: {
        error: false,
        field: '4',
        field_value: 'Flutterwave',
        condition: 'eq',
        condition_value: 'Flutterwave',
      },
    });
  });


  test('Should validate rule for strings successfully', () => {
    const payload = {
      rule: {
        field: '1',
        condition: 'neq',
        condition_value: 'x'
      },
      data:  'Flutterwave',
    };

    expect(validate(payload)).toEqual({
      validation: {
        error: false,
        field: '1',
        field_value: 'l',
        condition: 'neq',
        condition_value: 'x',
      },
    });
  });

  test('Should throw error if rule field is not found in the data array', () => {
    const payload = {
      rule: {
        field: '5',
        condition: 'contains',
        condition_value: 'rocinante'
      },
      data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho']
    };

    expect(validate.bind(null, payload)).toThrow(
      'Field 5 is missing from data.'
    );
  });

  test('Should throw error if rule field is not found in the data string', () => {
    const payload = {
      rule: {
        field: '7',
        condition: 'eq',
        condition_value: 'c'
      },
      data: 'Theo',
    };

    expect(validate.bind(null, payload)).toThrow(
      'Field 7 is missing from data.'
    );
  });

  test('Should throw error if rule field is not found in the data object', () => {
    const payload = {
      rule: {
        field: 'name',
        condition: 'contains',
        condition_value: 'James'
      },
      data: {
        title: 'Random stuff',
      }
    };

    expect(validate.bind(null, payload)).toThrow(
      'Field name is missing from data.'
    );
  });

  test.todo('Should respond with appropriate message if the field specified in the rule is missing from the data passed');
});
