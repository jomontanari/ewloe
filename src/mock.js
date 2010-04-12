function Mock(classToMock) {
    var recording = false;
    var lastExpectedFunctionName = null;

    var calls = [];
    var callsToIgnore = [];

    var expectationMatcher = new ExpectationMatcher();

    initMock(this);

    this.expects = function() {
        recording = true;
        return this;
    };

    this.ignores = function(ignoredCalls) {
        callsToIgnore = ignoredCalls;
        return this;
    };

    this.toReturn = function(valueToReturn) {
        return this.stub(function() { return valueToReturn; });
    };

    this.toThrow = function(error) {
        return this.stub(function() { throw error; });
    };

    this.stub = function(closure) {
        if (typeof closure !== 'function') {
            throw Error("Value passed to stub call needs to be a function");
        }

        initialiseCallArray();
        
        calls[lastExpectedFunctionName].push(function() { return closure.apply(this, arguments); });

        return this;
    };


    this.verify = function(){
        return expectationMatcher.verify();    
    };

    function initMock(mock) {
        if (typeof(classToMock) == 'function') {
            createMethods(classToMock, mock);
            createMethods(new classToMock(), mock);
        }else if (typeof(classToMock) == 'object') {
            createMethods(classToMock, mock);
        }else {
            throw new Error("Cannot mock out a " + typeof(classToMock));
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
            if (recording) {
                recording = false;
                lastExpectedFunctionName = method;

                expectationMatcher.addExpectedMethodCall(new InvocationBehaviour(mock, method, arguments));

                return this;
            } else {
                expectationMatcher.addActualMethodCall(new InvocationBehaviour(mock, method, arguments));

                if (calls[method] != null) {
                    var returnValue = calls[method].shift();

                    if (typeof(returnValue) == 'function') {
                        return returnValue.apply(this, arguments);
                    }
                }
            }
        };

        mockedFunction.name = method;
        mock[method] = mockedFunction;
    }

    function initialiseCallArray() {
        if (lastExpectedFunctionName == undefined) {
            throw new Error("Expect not called on mock. Usage is mock.expects().expectedFunctionName()");
        }

        if (calls[lastExpectedFunctionName] === undefined) {
            calls[lastExpectedFunctionName] = [];
        }        
    }
}