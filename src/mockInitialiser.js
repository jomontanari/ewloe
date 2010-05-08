function MockInitialiser() {
    this.initStrictMock = function(mock, thingToMock) {
        return initMock(mock, thingToMock, true);
    };

    this.initDynamicMock = function(mock, thingToMock) {
        return initMock(mock, thingToMock, false);
    };

    function initMock(mock, thingToMock, strict) {
        backupOriginalFunctions(mock, thingToMock);
        addStateVariables(mock, strict);
        replaceFunctions(mock, thingToMock);
        addApiFunctions(mock, thingToMock, strict);

        return mock;
    }

    function addStateVariables(mock, strict) {
        mock.recording = false;
        mock.beingTold = false;
        mock.lastMockedBehaviour = null;
        mock.calls = [];
        mock.expectationMatcher = strict ? new StrictExpectationMatcher() : new DynamicExpectationMatcher();
    }

    function backupOriginalFunctions(mock, thingToMock) {
        mock.originalFunctions = {};

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
    
    function addApiFunctions(mock, thingToMock, strict) {
        mock.expects = expects;
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
        mock.removeAddedApi = removeAddedApi;

        if (!strict) {
            mock.tells = tells;
        }

        mock.toString = function toString() {
            return thingToMock.name || typeof(thingToMock);
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
                mock.lastMockedBehaviour = new InvocationBehaviour(mock, method, MockHelper.convertToArray(arguments));

                mock.expectationMatcher.addExpectedMethodCall(mock.lastMockedBehaviour);

                return this;
            } else if (mock.beingTold) {
                mock.beingTold = false;
                mock.lastMockedBehaviour = new InvocationBehaviour(mock, method, MockHelper.convertToArray(arguments));

                return this;
            } else {
                var actualMethodBehaviour = new InvocationBehaviour(mock, method, MockHelper.convertToArray(arguments));

                mock.expectationMatcher.addActualMethodCall(actualMethodBehaviour);

                var methodCalls = mock.calls[method];

                if (methodCalls !== undefined) {
                    var argumentMatcher = new ArgumentMatcher();

                    var result = MockHelper.find(methodCalls, function(result) {
                        return argumentMatcher.areEqual(result.args, actualMethodBehaviour.getArgs());
                    });

                    if (result != null) {
                        return result.action.apply(this, arguments);
                    }
                }
            }
        };

        mockedFunction.name = method;
        mock[method] = mockedFunction;
    }

    function initialiseCallArray() {
        if (this.lastMockedBehaviour == undefined) {
            throw new Error("Expect not called on mock. Usage is mock.expects().expectedFunctionName()");
        }

        var methodName = this.lastMockedBehaviour.getMethod();
        
        if (this.calls[methodName] === undefined) {
            this.calls[methodName] = [];
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

        this.calls[this.lastMockedBehaviour.getMethod()].push({
            args : this.lastMockedBehaviour.getArgs(),
            action : function() { return closure.apply(this, arguments); }
        });
    }

    function verify(){
        var verificationSuccessful = this.expectationMatcher.verify();

        this.removeAddedApi();
        this.restoreOriginalFunctions();

        return verificationSuccessful;
    }

    function once() {
        this.lastMockedBehaviour.setRepeats(1);

        return this;
    }

    function twice() {
        this.lastMockedBehaviour.setRepeats(2);

        return this;
    }

    function threeTimes() {
        this.lastMockedBehaviour.setRepeats(3);

        return this;
    }

    function restoreOriginalFunctions() {
        for (var method in this.originalFunctions) {
            this[method] = this.originalFunctions[method];
        }

        delete this.originalFunctions;
        delete this.restoreOriginalFunctions;
    }

    function removeAddedApi() {
        delete this.recording;
        delete this.beingTold;
        delete this.lastMockedBehaviour;
        delete this.calls;
        delete this.expectationMatcher;

        delete this.expects;
        delete this.toReturn;
        delete this.toReturnNext;
        delete this.toThrow;
        delete this.toExecute;
        delete this.verify;
        delete this.once;
        delete this.twice;
        delete this.threeTimes;
        delete this.verify;
        delete this.removeAddedApi;
        delete this.tells;
        delete this.toString;
    }
}