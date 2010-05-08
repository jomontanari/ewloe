describe 'Mocking End To End'
    describe "Dynamic Mock Verification"
        describe 'successful verification'
            before_each
                mockControl = new MockControl();
                mock = mockControl.createDynamicMock(Person);
            end

            it 'should pass if an unexpected call is made on the mock'
                mock.getName();

                mockControl.verify();

                pass();
            end

            it 'should pass if an expected call is executed with correct arguments'
                mock.expects().getName(2, 3);
                mock.getName(2, 3);

                mockControl.verify();

                pass();
            end

            it 'should pass allow multiple expects on the same method with different arguments'
                mock.expects().getName(1, 2);
                mock.expects().getName(2, 3);
                mock.getName(1, 2);
                mock.getName(2, 3);

                mockControl.verify();

                pass();
            end

            it 'should pass if call is expected twice and is executed twice'
                mock.expects().getName(2, 3).twice();
                mock.getName(2, 3);
                mock.getName(2, 3);

                mockControl.verify();

                pass();
            end

            it 'should pass if call is expected three times and is executed three times'
                mock.expects().getName(2, 3).threeTimes();
                mock.getName(2, 3);
                mock.getName(2, 3);
                mock.getName(2, 3);

                mockControl.verify();

                pass();
            end

            it 'should pass if an expected call is executed with the correct type of arguments'
                mock.expects().getName(Arg.isA(Function), Arg.isA(String));
                mock.getName(function(){}, "Hello");

                mockControl.verify();

                pass();
            end

            it 'should return the value set on the stubbed call'
                mock.tells().getName().toReturn("I am a stubbed result");

                var result = mock.getName();

                result.should.eql "I am a stubbed result"
            end
        end

        describe 'unsuccessful verification'
            before_each
                mockControl = new MockControl({ fail : function(discrepancy) {
                    var error = new Error();
                    error.message = discrepancy.getMessage();
                    throw error;
                }});

                mock = mockControl.createDynamicMock(Person);
            end

            it 'should fail if an expected call is not executed'
                mock.expects().getName();

                try {
                    mockControl.verify();

                    fail("An error should have been thrown");
                }catch(e) {
                    e.message.should.eql "Expected call 'Person.getName()' not executed"
                }
            end

            it 'should fail if an expected call is executed with the wrong arguments'
                mock.expects().getName(2, 3);
                mock.getName(1, 2);

                try {
                    mockControl.verify();

                    fail("An error should have been thrown");
                }catch(e) {
                    e.message.should.eql "Expected call 'Person.getName(2,3)' not executed"
                }
            end

            it 'should fail if an expected call is note executed the required amount of times'
                mock.expects().getName(2, 3).twice();
                mock.getName(2, 3);

                try {
                    mockControl.verify();

                    fail("An error should have been thrown");
                }catch(e) {
                    e.message.should.eql "Expected 2 call(s) to 'Person.getName(2,3)', found 1"
                }
            end
        end
    end

    describe "Strict Mocking"
        describe 'successful verification'
            before_each
                mockControl = new MockControl();
                mock = mockControl.createStrictMock(Person);
            end

            it 'should pass if an expected call is executed with correct arguments'
                mock.expects().getName(2, 3);
                mock.getName(2, 3);

                mockControl.verify();

                pass();
            end

            it 'should pass allow multiple expects on the same method with different arguments'
                mock.expects().getName(1, 2);
                mock.expects().getName(2, 3);
                mock.getName(1, 2);
                mock.getName(2, 3);

                mockControl.verify();

                pass();
            end

            it 'should pass if call is expected twice and is executed twice'
                mock.expects().getName(2, 3).twice();
                mock.getName(2, 3);
                mock.getName(2, 3);

                mockControl.verify();

                pass();
            end

            it 'should pass if call is expected three times and is executed three times'
                mock.expects().getName(2, 3).threeTimes();
                mock.getName(2, 3);
                mock.getName(2, 3);
                mock.getName(2, 3);

                mockControl.verify();

                pass();
            end

            it 'should pass if an expected call is executed with the correct type of arguments'
                mock.expects().getName(Arg.isA(Person), Arg.isA(String));
                mock.getName(new Person(), "Hello");

                mockControl.verify();

                pass();
            end
        end

        describe 'unsuccessful verification'
            before_each
                mockControl = new MockControl({ fail : function(discrepancy) {
                    var error = new Error();
                    error.message = discrepancy.getMessage();
                    throw error;
                }});

                mock = mockControl.createStrictMock(Person);
            end

            it 'should fail if an unexpected call is made'
                mock.getName();

                try {
                    mockControl.verify();

                    fail("An error should have been thrown");
                }catch(e) {
                    e.message.should.eql "Unexpected call 'Person.getName()' found"
                }
            end

            it 'should fail if an expected call is not executed'
                mock.expects().getName();

                try {
                    mockControl.verify();

                    fail("An error should have been thrown");
                }catch(e) {
                    e.message.should.eql "Expected call 'Person.getName()' not executed"
                }
            end

            it 'should fail if an expected call is executed with the wrong arguments'
                mock.expects().getName(2,3);
                mock.getName(1,2);

                try {
                    mockControl.verify();

                    fail("An error should have been thrown");
                }catch(e) {
                    e.message.should.eql "Unexpected call 'Person.getName(1,2)' found"
                }
            end

            it 'should fail if an expected call is executed more than the number of expected times'
                mock.expects().getName(2,3);
                mock.getName(2,3);
                mock.getName(2,3);

                try {
                    mockControl.verify();

                    fail("An error should have been thrown");
                }catch(e) {
                    e.message.should.eql "Expected 1 call(s) to 'Person.getName(2,3)', found 2"
                }
            end
        end
    end
end