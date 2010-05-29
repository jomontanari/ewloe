function Arg(){}

function TypeArg(type) {
    this.expectedType = type;

    this.toString = function() {
        return type.name;
    }
}

function FunctionArg(predicate) {
    this.predicate = predicate;
}

function PropertiesMatch(expected) {
    this.expectedValues = expected;
}

Arg.isA = function(type) {
    return new TypeArg(type);
};

Arg.satisfies = function(predicate) {
    return new FunctionArg(predicate);
};

Arg.sameAs = function(expected) {
    return new PropertiesMatch(expected);    
};

function ArgumentMatcher() {
    var typeMatchers = {};

    initMatchers();

    this.areEqual = function(expected, actual) {
        if (expected.length != actual.length) {
            return false;
            
        }
        return checkArguments(expected, actual);
    };

    function initMatchers() {
        typeMatchers[Array] = matchArrays;
        typeMatchers[TypeArg] = matchType;
        typeMatchers[FunctionArg] = matchPredicate;
        typeMatchers[PropertiesMatch] = matchProperties;
    }

    function checkArguments(expected, actual) {
        if (expected == null) {
            return actual == null;    
        }

        var typeMatcher = typeMatchers[expected.constructor] || matchObjects;

        return typeMatcher(expected, actual);
    }

    function matchArrays(expected, actual) {
        if ((expected && !actual) || (!expected && actual)) {
            return false;
        }

        if (expected.length != actual.length) {
            return false;
        }

        for (var i = 0; i < expected.length; i++) {
            if (!checkArguments(expected[i], actual[i])) {
                return false;
            }
        }

        return true;
    }

    function matchObjects(expected, actual) {
        return expected == actual;
    }

    function matchType(expected, actual) {
        return expected.expectedType === actual.constructor;
    }

    function matchPredicate(expected, actual) {
        return expected.predicate(actual);
    }

    function matchProperties(expected, actual) {
        for (var propertyName in expected) {
            if (expected["propertyName"] != actual["propertyName"]) {
                return false;
            }
        }

        return true;
    }
}