function transfer(type = {}) {
  return {
    Array: [],
    Object: {},
    Boolean: null,
    String: '',
    Number: 0,
  }[type.name];
}

function body(command) {
  // Set Result
  const json = {};

  // Match Command as Hack
  command.replace(/(^\w+)|(\[[\w\,]+?\])|(\{[\w\,]+?\})/g, (word, property, index, condition) => {
    if (property) {
      json.property = property;
    }
    if (index) {
      json.index = index.replace(/\[|\]/g, '');
    }
    if (condition) {
      json.condition = condition.replace(/\{|\}/g, '');
    }
  });

  // Export
  return json;
}

function make(source, def, { property, index, condition }, callback) {
  // Set Clone
  const clone = source[property] || transfer(def);

  // Clone is Null
  if ([null, undefined].includes(clone)) {
    return clone;
  }

  // Set Result
  let result;

  // Array
  if (clone.constructor === Array) {
    // Set Result as Array
    result = [];

    // Mapping
    clone.forEach((item, key) => {
      // No Index
      if ([undefined, ''].includes(index)) {
        return result.push(callback(clone[key]));
      }

      // With Index
      if (index.split(',').includes(key + '')) {
        return result.push(callback(clone[key]));
      }
    });
  }
  // Object
  else {
    // Set Result
    result = callback(condition ? clone[condition] : clone);
  }

  // Export
  return result;
}

function find(source, command = '', def) {
  // No Source
  if (!source) {
    return transfer(def);
  }

  // Command Serialize
  command = command.split('.');

  // Making End
  return make(
    // Source
    source,
    // Default
    def,
    // Get Body of Command
    body(command.shift()),
    // Callback
    (end) => (command.length ? find(end, command.join('.'), def) : end),
  );
}

export default find;
