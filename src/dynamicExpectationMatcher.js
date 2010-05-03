function DynamicExpectationMatcher() {
    var expectedCalls = [];
    var actualCalls = [];

    this.addExpectedMethodCall = function(invocationBehaviour) {
        expectedCalls.push(invocationBehaviour);
    };

    this.addActualMethodCall = function(invocationBehaviour) {
        actualCalls.push(invocationBehaviour);
    };

    this.verify = function() {
        return checkExpectations();
    };

    function checkExpectations() {
        var discrepancy = null;

        for (var i = 0; i < expectedCalls.length; i++) {
            var expectedCall = expectedCalls[i];

            var matchingCalls = MockHelper.findAll(actualCalls, function(invocationBehaviour) {
                return expectedCall.equals(invocationBehaviour);
            });

            if (matchingCalls.length === 0) {
                discrepancy = new Discrepancy("Expected call '" + expectedCall.toString() + "' not executed");
                break;
            }
        }

        return discrepancy;
    }
}