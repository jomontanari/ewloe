function DynamicMock(classToMock) {
    this.init(classToMock);
}

DynamicMock.prototype = new Mock(new DynamicExpectationMatcher());