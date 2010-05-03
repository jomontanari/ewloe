function StrictExpectationMatcher() {
    var expectedCalls = [];
    var actualCalls = [];
    var dynamicExpectationMatcher = new DynamicExpectationMatcher();

    this.addExpectedMethodCall = function(invocationBehaviour) {
        expectedCalls.push(invocationBehaviour);

        dynamicExpectationMatcher.addExpectedMethodCall(invocationBehaviour);
    };

    this.addActualMethodCall = function(invocationBehaviour) {
        actualCalls.push(invocationBehaviour);

        dynamicExpectationMatcher.addActualMethodCall(invocationBehaviour);
    };


    this.verify = function() {
        var discrepancy = checkForUnexpectedCalls();

        if (!discrepancy) {
            discrepancy = dynamicExpectationMatcher.verify();
        }

        return discrepancy;
    };

    function checkForUnexpectedCalls() {
        var discrepancy = null;

        for (var i = 0; i < actualCalls.length; i++) {
            var actualCall = actualCalls[i];

            var matchingCalls = MockHelper.findAll(expectedCalls, function(expectedCall) {
                return expectedCall.equals(actualCall);
            });

            if (matchingCalls.length === 0) {
                discrepancy = new Discrepancy("Unexpected call '" + actualCall.toString() + "' found");
                break;
            }
        }

        return discrepancy;
    } 
}