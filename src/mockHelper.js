function MockHelper() {}

MockHelper.isPublicMethod = function(object, method) {
    return typeof object[method] === 'function' && object.hasOwnProperty(method);
};

MockHelper.findAll = function(array, predicate) {
    var returnValues = [];

    for (var i = 0; i < array.length; i++) {
        var currentItem = array[i];

        if (predicate(currentItem)) {
            returnValues.push(currentItem);
        }
    }

    return returnValues;
};

MockHelper.convertToArray = function(arguments) {
    var convertedArguments = [];

    for (var i = 0; i < arguments.length; i++) {
        convertedArguments[i] = arguments[i];
    }

    return convertedArguments;
};

MockHelper.nextOrLast = function(values) {
    if (values.length === 1) {
        return values[0];
    }

    return values.shift();
};