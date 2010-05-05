function Arg(){}

function TypeArg(type) {
    this.expectedType = type;
}

function FunctionArg(predicate) {
    this.predicate = predicate;
}

Arg.isA = function(type) {
    return new TypeArg(type);
};

Arg.satisfies = function(predicate) {
    return new FunctionArg(predicate);
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
}