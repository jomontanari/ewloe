describe 'MockControl'
    describe 'mock creation'
        before_each
            mockControl = new MockControl();
            mock = mockControl.createMock(Person);
        end

        it 'should create a mock'
            mock.should.not.be_null;
        end
    end

    describe 'successful lenient verification'
        before_each
            mockControl = new MockControl();
            mock = mockControl.createMock(Person);
        end

        it 'should not fail if an unexpected call is made on the mock'
            mock.getName();

            mockControl.verify();

            pass();
        end

        it 'should not fail if an expected call is executed'
            mock.expects().getName(2, 3);
            mock.getName(2, 3);

            pass();
        end
    end

    describe 'unsuccessful lenient verification'
        before_each
            mockControl = new MockControl({ fail : function(discrepancy) {
                var error = new Error();
                error.message = discrepancy.getMessage();
                throw error;
            }});

            mock = mockControl.createMock(Person);
        end

        it 'should fail if an expected call is not executed'
            mock.expects().getName();

            try {
                mockControl.verify();
            }catch(e) {
                e.message.should.eql "Expected call 'Person.getName()' not executed"
            }
        end

        it 'should fail if an expected call is executed with the wrong arguments'
            mock.expects().getName(2, 3);
            mock.getName(1, 2);

            try {
                mockControl.verify();
            }catch(e) {
                e.message.should.eql "Expected call 'Person.getName(2,3)' not executed"
            }
        end
    end

    describe 'successful strict verification'
        before_each
            mockControl = new MockControl();
            mock = mockControl.createMock(Person);
        end

        it 'should not fail if an expected call is executed'
            mock.expects().getName(2, 3);
            mock.getName(2, 3);

            mockControl.verify();

            pass();
        end
    end

    describe 'unsuccessful strict verification'
        before_each
            mockControl = new MockControl({ fail : function(discrepancy) {
                var error = new Error();
                error.message = discrepancy.getMessage();
                throw error;
            }});

            mock = mockControl.createMock(Person);
        end

        it 'should fail if an unexpected call is made'
            mock.getName();

            try {
                mockControl.verifyStrict();
                
                fail("An error should have been thrown");
            }catch(e) {
                e.message.should.eql "Unexpected call 'Person.getName()' found"
            }
        end

        it 'should fail if an expected call is not executed'
            mock.expects().getName();

            try {
                mockControl.verifyStrict();
            }catch(e) {
                e.message.should.eql "Expected call 'Person.getName()' not executed"
            }
        end

        it 'should fail if an expected call is executed with the wrong arguments'
            mock.expects().getName(2,3);
            mock.getName(1,2);

            try {
                mockControl.verifyStrict();
            }catch(e) {
                e.message.should.eql "Unexpected call 'Person.getName(1,2)' found"
            }
        end
    end
end