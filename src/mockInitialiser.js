function MockInitialiser() {
    this.initStrictMock = function(mock, thingToMock) {
        return initMock(mock, thingToMock, new StrictExpectationMatcher());
    };

    this.initDynamicMock = function(mock, thingToMock) {
        return initMock(mock, thingToMock, new DynamicExpectationMatcher());
    };

    function initMock(mock, thingToMock, expectationMatcher) {
        addStateVariables(mock, expectationMatcher);
        backupOriginalFunctions(mock, thingToMock);
        replaceFunctions(mock, thingToMock);
        addApiFunctions(mock, thingToMock);

        return mock;
    }

    function addStateVariables(mock, expectationMatcher) {
        mock.recording = false;
        mock.beingTold = false;
        mock.lastCalledMethodName = null;
        mock.lastExpectedBehaviour = null;
        mock.calls = [];
        mock.originalFunctions = {};
        mock.expectationMatcher = expectationMatcher;
    }

    function backupOriginalFunctions(mock, thingToMock) {
        for (var method in thingToMock) {
            mock.originalFunctions[method] = thingToMock[method];
        }
    }

    function replaceFunctions(mock, thingToMock) {
        if (typeof(thingToMock) == 'function') {
            createMethods(thingToMock, mock);
            createMethods(new thingToMock(), mock);
        }else if (typeof(thingToMock) == 'object') {
            createMethods(thingToMock, mock);
        }else {
            throw new Error("Cannot mock out a " + typeof(thingToMock));
        }
    }
    
    function addApiFunctions(mock, thingToMock) {
        mock.expects = expects;
        mock.tells = tells;
        mock.toReturn = toReturn;
        mock.toReturnNext = toReturnNext;
        mock.toThrow = toThrow;
        mock.toExecute = toExecute;
        mock.verify = verify;
        mock.once = once;
        mock.twice = twice;
        mock.threeTimes = threeTimes;
        mock.verify = verify;
        mock.restoreOriginalFunctions = restoreOriginalFunctions;
        
        mock.toString = function toString() {
            return thingToMock.name;
        }
    }

    function createMethods(object, mock) {
        for (var property in object) {
            if (MockHelper.isPublicMethod(object, property, mock)) {
                createMethod(property, mock);
            }
        }
    }

    function createMethod(method, mock) {
        var mockedFunction = function() {
            if (mock.recording) {
                mock.recording = false;
                mock.lastCalledMethodName = method;
                mock.lastExpectedBehaviour = new InvocationBehaviour(mock, method, arguments);

                mock.expectationMatcher.addExpectedMethodCall(mock.lastExpectedBehaviour);

                return this;
            } else if (mock.beingTold) {
                mock.beingTold = false;
                mock.lastCalledMethodName = method;

                return this;
            } else {
                mock.expectationMatcher.addActualMethodCall(new InvocationBehaviour(mock, method, arguments));

                if (mock.calls[method] !== undefined) {
                    var returnFunction = MockHelper.nextOrLast(mock.calls[method]);

                    if (typeof(returnFunction) == 'function') {
                        return returnFunction.apply(this, arguments);
                    }
                }
            }
        };

        mockedFunction.name = method;
        mock[method] = mockedFunction;
    }

    function initialiseCallArray() {
        if (this.lastCalledMethodName == undefined) {
            throw new Error("Expect not called on mock. Usage is mock.expects().expectedFunctionName()");
        }

        if (this.calls[this.lastCalledMethodName] === undefined) {
            this.calls[this.lastCalledMethodName] = [];
        }
    }

    function expects() {
        this.recording = true;
        return this;
    }

    function tells() {
        this.beingTold = true;

        return this;
    }

    function toReturn(valueToReturn) {
        this.toExecute(function() { return valueToReturn; });
    }

    function toReturnNext(valuesToReturn) {
        this.toExecute(function() {
            if (valuesToReturn.length == 1) {
                return valuesToReturn[0];
            }
            return valuesToReturn.shift();
        });
    }

    function toThrow(error) {
        this.toExecute(function() { throw error; });
    }

    function toExecute(closure) {
        if (typeof closure !== 'function') {
            throw Error("Value passed to stub call needs to be a function");
        }

        initialiseCallArray.apply(this, arguments);

        this.calls[this.lastCalledMethodName].push(function() { return closure.apply(this, arguments); });
    }

    function verify(){
        this.restoreOriginalFunctions();
        return this.expectationMatcher.verify();
    }

    function once() {
        this.lastExpectedBehaviour.setRepeats(1);

        return this;
    }

    function twice() {
        this.lastExpectedBehaviour.setRepeats(2);

        return this;
    }

    function threeTimes() {
        this.lastExpectedBehaviour.setRepeats(3);

        return this;
    }

    function restoreOriginalFunctions() {
        for (var method in this.originalFunctions) {
            this[method] = this.originalFunctions[method];
        }
    }
}