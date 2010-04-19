function Mock(expectationMatcher) {
    var recording = false;
    var lastExpectedFunctionName = null;
    var mockedClass = null;

    var calls = [];

    this.expects = function() {
        recording = true;
        return this;
    };

    this.toReturn = function(valueToReturn) {
        return this.toExecute(function() { return valueToReturn; });
    };

    this.toThrow = function(error) {
        return this.toExecute(function() { throw error; });
    };

    this.toExecute = function(closure) {
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

    this.init = function(classToMock) {
        mockedClass = classToMock;

        initMock(this);
    };

    
    function initMock(mock) {
        if (typeof(mockedClass) == 'function') {
            createMethods(mockedClass, mock);
            createMethods(new mockedClass(), mock);
        }else if (typeof(mockedClass) == 'object') {
            createMethods(mockedClass, mock);
        }else {
            throw new Error("Cannot mock out a " + typeof(mockedClass));
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