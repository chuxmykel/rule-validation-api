module.exports = function validate(payload) {
  const {
    rule: { field, condition, condition_value },
    data
  } = payload;
  const fields = field.split('.');

  if (fields.length > 2) {
    throw new Error('Nesting cannot be more than 2 levels deep.');
  }

  let field_value;

  try {
    field_value = fields
      .length === 2 ? data[fields[0]][fields[1]] : data[fields[0]];

    if (field_value === undefined) {
      throw new Error(`field ${field} is missing from data.`);
    }
  } catch (error) {
    throw new Error(`field ${field} is missing from data.`);
  }
  

  return {
    validation: {
      error: !isValid(payload.rule.condition, field_value, payload.rule.condition_value),
      field: payload.rule.field,
      field_value,
      condition,
      condition_value,
    },
  };
}

function isValid(condition, data, conditionValue) {
  switch (condition) {
    case 'eq': {
      return data === conditionValue;
    }

    case 'neq': {
      return data !== conditionValue;
    }

    case 'gt': {
      return data > conditionValue;
    }

    case 'gte': {
      return data >= conditionValue;
    }

    case 'contains': {
      return data.includes(conditionValue);
    }

    default:
      return false;
  }
}
