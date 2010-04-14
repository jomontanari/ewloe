function StrictExpectationMatcher() {
    var expectedCalls = [];
    var actualCalls = [];

    this.addExpectedMethodCall = function(invocationBehaviour) {
        expectedCalls.push(invocationBehaviour);
    };

    this.addActualMethodCall = function(invocationBehaviour) {
        actualCalls.push(invocationBehaviour);
    };

    this.verify = function() {
        var discrepancy = checkForUnexpectedCalls();

        if (!discrepancy) {
            discrepancy = checkExpectations();
        }

        return discrepancy;
    };

    function checkForUnexpectedCalls() {
        var discrepancy = null;

        for (var i = 0; i < actualCalls.length; i++) {
            var actualCall = actualCalls[i];

            var matchingCalls = MockHelper.findAll(expectedCalls, function(invocationBehaviour) {
                return actualCall == invocationBehaviour;
            });

            if (matchingCalls.length === 0) {
                discrepancy = new Discrepancy("Unexpected call '" + actualCall.toString() + "' found");
                break;
            }
        }

        return discrepancy;
    } 

    function checkExpectations() {
        var discrepancy = null;

        for (var i = 0; i < expectedCalls.length; i++) {
            var expectedCall = expectedCalls[i];

            var matchingCalls = MockHelper.findAll(actualCalls, function(invocationBehaviour) {
                return expectedCall == invocationBehaviour;
            });

            if (matchingCalls.length === 0) {
                discrepancy = new Discrepancy("Expectated call '" + expectedCall.toString() + "' not executed");
                break;
            }
        }

        return discrepancy;
    }
}