function ArgumentMatcher() {
    var typeMatchers = {};

    initMatchers();

    this.areEqual = function(args1, args2) {
        return checkArguments(args1, args2);
    };

    function initMatchers() {
        typeMatchers[Array] = matchArrays;
        typeMatchers[String] = matchObjects;
        typeMatchers[Boolean] = matchObjects;
        typeMatchers[Number] = matchObjects;
    }

    function checkArguments(args1, args2) {
        var typeMatcher = typeMatchers[args1.constructor];

        return typeMatcher(args1, args2);
    }

    function matchArrays(object1, object2) {
        if ((object1 && !object2) || (!object1 && object2)) {
            return false;
        }

        if (object1.length != object2.length) {
            return false;
        }

        for (var i = 0; i < object1.length; i++) {
            if (!checkArguments(object1[i], object2[i])) {
                return false;
            }
        }

        return true;
    }

    function matchObjects(object1, object2) {
        return object1 == object2;
    }
}


