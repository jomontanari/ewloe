function MockControl() {
    var lastMock = null;
    var lastCallName = null;

    var mocks = [];

    this.createMock = function(objectToMock) {
        var mock = new Mock(objectToMock);
        mocks.push(mock);

        return mock;
    };

    this.verify = function() {
        for(var i = 0; i < mocks.length; i++) {
            var mock = mocks[i];

            var discrepancy = mock.verify();

            if (discrepancy != null) {
                fail(discrepency)
            }
        }
    }
}