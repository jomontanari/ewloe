function MockControl(frameworkIntegration) {
    var framework = frameworkIntegration || new FrameworkIntegration();

    var mocks = [];

    this.createMock = function(classToMock) {
        var mock = new Mock(classToMock, new ExpectationMatcher());
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

    this.verifyStrict = function() {
        for(var i = 0; i < mocks.length; i++) {
            var mock = mocks[i];
            var discrepancy = mock.verifyStrict();

            if (discrepancy != null) {
                framework.fail(discrepancy);
            }
        }
    };
}