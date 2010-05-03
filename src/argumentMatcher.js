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
        typeMatchers[String] = matchObjects;
        typeMatchers[Boolean] = matchObjects;
        typeMatchers[Number] = matchObjects;
        typeMatchers[Arg] = matchType;
    }

    function checkArguments(expected, actual) {
        var typeMatcher = typeMatchers[expected.constructor];

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
}