describe 'InvocationBehaviour'
    describe 'equality'
        it 'should return true if all parameters are equal'
            var caller = {};


            var invocationBehaviour1 = new InvocationBehaviour(caller, "setAge", [1]);
            var invocationBehaviour2 = new InvocationBehaviour(caller, "setAge", [1]);

            invocationBehaviour1.equals(invocationBehaviour2).should.be_true;
        end

        it 'should return false if the callers are different'
            var invocationBehaviour1 = new InvocationBehaviour({}, "setName", ["bob"]);
            var invocationBehaviour2 = new InvocationBehaviour({}, "setName", ["bob"]);

            invocationBehaviour1.equals(invocationBehaviour2).should.be_false;
        end

        it 'should return false if the methods are different'
            var caller = {};

            var invocationBehaviour1 = new InvocationBehaviour(caller, "setName", ["bob"]);
            var invocationBehaviour2 = new InvocationBehaviour(caller, "getName", ["bob"]);

            invocationBehaviour1.equals(invocationBehaviour2).should.be_false;
        end

        it 'should return false if the arguments are different'
            var caller = {};

            var invocationBehaviour1 = new InvocationBehaviour(caller, "getName", ["bob"]);
            var invocationBehaviour2 = new InvocationBehaviour(caller, "getName", ["doe"]);

            invocationBehaviour1.equals(invocationBehaviour2).should.be_false;
        end
    end

    describe 'description'
        it 'should return a correctly formatted description when argument list is empty'
            var caller = { toString : function() { return "Person" }};

            var invocationBehaviour = new InvocationBehaviour(caller, 'getAge', []);
            var description = invocationBehaviour.toString();

            description.should.eql "Person.getAge()"
        end

        it 'should return a correctly formatted description when argument list is not empy'
            var caller = { toString : function() { return "Person" }};

            var invocationBehaviour = new InvocationBehaviour(caller, 'getAge', [1, 'test']);
            var description = invocationBehaviour.toString();

            description.should.eql "Person.getAge(1, 'test')"
        end
    end
end