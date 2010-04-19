function StrictMock(classToMock) {
    this.init(classToMock);

    this.toString = function() {
        return typeof(classToMock);
    };
}

StrictMock.prototype = new Mock(new StrictExpectationMatcher());