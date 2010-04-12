function ArgumentMatcher() {
    var typeMatchers = {};

    initMatchers();

    this.areEqual = function(object1, object2) {
        var typeMatcher = typeMatchers[object1.constructor];

        return typeMatcher(object1, object2);
    };

    function initMatchers() {
        typeMatchers[Array] = matchArrays;
    }

    function matchArrays(object1, object2) {
        if ((object1 && !object2) || (!object1 && object2)) {
            return false;
        }

        if (object1.length != object2.length) {
            return false;
        }

        for (var i = 0; i < object1.length; i++) {
            if (object1[i] != object2[i]) {
                return false;
            }
        }

        return true;
    }
}


