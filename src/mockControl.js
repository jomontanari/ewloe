function MockControl(frameworkIntegration) {
    var framework = frameworkIntegration || new FrameworkIntegration();

    var mocks = [];

    this.createDynamicMock = function(thingToMock) {
        var mock = null;

        if (typeof(thingToMock) == 'object') {
            mock = new Mock(thingToMock, thingToMock, new DynamicExpectationMatcher());
        } else {
            mock = new Mock({}, thingToMock, new DynamicExpectationMatcher());
        }

        mocks.push(mock);

        return mock;
    };

    this.createStrictMock = function(thingToMock) {
        var mock = null;

        if (typeof(thingToMock) == 'object') {
            mock = new Mock(thingToMock, thingToMock, new StrictExpectationMatcher());
        } else {
            mock = new Mock({}, thingToMock, new StrictExpectationMatcher());
        }

        mocks.push(mock);

        return mock;
    };

    this.verify = function() {
        for(var i = 0; i < mocks.length; i++) {
            var mock = mocks[i];
            var discrepancy = mock.verify();

            if (discrepancy != null) {
                framework.fail(discrepancy);
            }
        }
    };
}