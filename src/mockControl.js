function MockControl(frameworkIntegration) {
    var framework = frameworkIntegration || new FrameworkIntegration();

    var mocks = [];

    this.createDynamicMock = function(classToMock) {
        var mock = new Mock(classToMock, new DynamicExpectationMatcher());
        mocks.push(mock);

        return mock;
    };

    this.createStrictMock = function(classToMock) {
        var mock = new Mock(classToMock, new StrictExpectationMatcher());
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