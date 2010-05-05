describe 'MockInitialiser'
    describe 'Mocking Types'
        before_each
            mock = {};

            var mockInitializer = new MockInitialiser();
            mockInitializer.initStrictMock(mock, Person);
        end

        it 'should replace all public methods on class'
            mock.hasOwnProperty('getName').should.be_true
            mock.hasOwnProperty('getAge').should.be_true
        end

        it 'should throw an error if expect is not called before the function is invoked'
            try {
                mock.getName().toReturn('bob');

                fail('An error should be thrown')
            }catch(e) {
                true.should.eql true
            }
        end

        it 'should execute the stubbed function set by the expecation'
            mock.expects().getAge().toExecute(function() {
                return 73;
            });

            mock.getAge().should.eql 73
        end

        it 'should throw the exception set by the expecation'
            try {
                mock.expects().getName().toThrow(new Error("Expected error"));
                mock.getName();

                fail('An error should have been thrown')
            } catch(e) {
                true.should.eql true
            }
        end

        it 'should return the same value each time the function is called if the return value is not an array'
            mock.expects().getAge().toReturn(11);

            mock.getAge().should.eql 11
            mock.getAge().should.eql 11
        end

        it 'should return the next value each time the function is called if the return value is an array'
            mock.expects().getAge().toReturnNext([11,12,13]);

            mock.getAge().should.eql 11
            mock.getAge().should.eql 12
            mock.getAge().should.eql 13
            mock.getAge().should.eql 13
        end
    end

    describe "Mocking Instances"
        before_each
            mock = new Person();

            var mockInitializer = new MockInitialiser();
            mockInitializer.initDynamicMock(mock, mock);
        end

        it 'should retain all public methods on class'
            mock.hasOwnProperty('getName').should.be_true
            mock.hasOwnProperty('getAge').should.be_true
        end

        it 'should throw an error if expect is not called before the function is invoked'
            try {
                mock.getName().toReturn('bob');

                fail('An error should be thrown')
            }catch(e) {
                true.should.eql true
            }
        end

        it 'should execute the stubbed function set by the expecation'
            mock.expects().getAge().toExecute(function() {
                return 73;
            });

            mock.getAge().should.eql 73
        end

        it 'should throw the exception set by the expecation'
            try {
                mock.expects().getName().toThrow(new Error("Expected error"));
                mock.getName();

                fail('An error should have been thrown')
            } catch(e) {
                true.should.eql true
            }
        end

        it 'should return the same value each time the function is called'
            mock.expects().getAge().toReturn(11);

            mock.getAge().should.eql 11
            mock.getAge().should.eql 11
        end

        it 'should return the next value each time the function is called'
            mock.expects().getAge().toReturnNext([11,12,13]);

            mock.getAge().should.eql 11
            mock.getAge().should.eql 12
            mock.getAge().should.eql 13
            mock.getAge().should.eql 13
        end

        it 'should reset all the mocked functions back to the original on verify'
            mock.tells().getName().toReturn("Bob");

            mock.getName().should.eql "Bob"
            mock.verify();

            mock.getName().should.eql "Persons Name"
        end
    end
end