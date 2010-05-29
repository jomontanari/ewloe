function MockControl(frameworkIntegration) {
    var framework = frameworkIntegration || new FrameworkIntegration();
    var mockInitialiser = new MockInitialiser();
    var mocks = [];

    this.createDynamicMock = function(thingToMock) {
        var mock = null;

        if (typeof(thingToMock) == 'object') {
            mock = mockInitialiser.initDynamicMock(thingToMock, thingToMock);
        } else {
            mock = mockInitialiser.initDynamicMock({}, thingToMock);
        }

        mocks.push(mock);

        return mock;
    };

    this.createStrictMock = function(thingToMock) {
        var mock = null;

        if (typeof(thingToMock) == 'object') {
            mock = mockInitialiser.initStrictMock(thingToMock, thingToMock);
        } else {
            mock = mockInitialiser.initStrictMock({}, thingToMock);
        }

        mocks.push(mock);

        return mock;
    };

    this.verify = function() {
        for (var i = 0; i < mocks.length; i++) {
            var mock = mocks[i];
            var discrepancy = mock.verify();

            if (discrepancy != null) {
                framework.fail(discrepancy);
            }
        }
    };
}