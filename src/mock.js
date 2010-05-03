function Mock(classToMock, expectationMatcher) {
    var recording = false;
    var beingTold = false;
    var lastCalledMethodName = null;
    var lastExpectedBehaviour = null;

    var calls = [];

    initMock(this);

    this.expects = function() {
        recording = true;
        return this;
    };

    this.tells = function() {
        beingTold = true;

        return this;
    };
    
    this.toReturn = function(valueToReturn) {
        this.toExecute(function() { return findValueToReturn(valueToReturn); });
    };

    this.toThrow = function(error) {
        this.toExecute(function() { throw error; });
    };

    this.toExecute = function(closure) {
        if (typeof closure !== 'function') {
            throw Error("Value passed to stub call needs to be a function");
        }

        initialiseCallArray();

        calls[lastCalledMethodName].push(function() { return closure.apply(this, arguments); });
    };

    this.verify = function(){
        return expectationMatcher.verify();
    };

    this.once = function() {
        lastExpectedBehaviour.setRepeats(1);

        return this;
    },

    this.twice = function() {
        lastExpectedBehaviour.setRepeats(2);

        return this;
    },

    this.threeTimes = function() {
        lastExpectedBehaviour.setRepeats(3);

        return this;
    },

    this.toString = function() {
        return classToMock.name;
    };

    function initMock(mock) {
        if (typeof(classToMock) == 'function') {
            createMethods(classToMock, mock);
            createMethods(new classToMock(), mock);
        }else if (typeof(classToMock) == 'object') {
            createMethods(classToMock, mock);
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
                lastCalledMethodName = method;
                lastExpectedBehaviour = new InvocationBehaviour(mock, method, arguments);

                expectationMatcher.addExpectedMethodCall(lastExpectedBehaviour);

                return this;
            } else if (beingTold) {
                beingTold = false;
                lastCalledMethodName = method;

                return this;
            } else {
                expectationMatcher.addActualMethodCall(new InvocationBehaviour(mock, method, arguments));

                if (calls[method] !== undefined) {
                    var returnFunction = MockHelper.nextOrLast(calls[method]);

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
        if (lastCalledMethodName == undefined) {
            throw new Error("Expect not called on mock. Usage is mock.expects().expectedFunctionName()");
        }

        if (calls[lastCalledMethodName] === undefined) {
            calls[lastCalledMethodName] = [];
        }        
    }

    function findValueToReturn(valuesToReturn) {
        if (valuesToReturn instanceof Array) {
            return valuesToReturn.shift();
        }

        return valuesToReturn;
    }
}