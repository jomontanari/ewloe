TestCase("MockTests", {
    testMockReplacesAllPublicMethodsOnClass : function() {
        var mock = new Mock(Person);

        assertTrue(mock.hasOwnProperty('getName'))
        assertTrue(mock.hasOwnProperty('getAge'))
    },

    testMockThrowsErrorIfExpectNotCalledBeforeReturnFunctions: function() {
        try {
            var mock = new Mock(Person);
            mock.getName().andReturn('bob');

            fail('An error should have been thrown');
        }catch(e) {
            assertTrue(true);    
        }
    },

    testMockReturnsValueSetByExpectation : function() {
        var mock = new Mock(Person);

        mock.expects().getName().toReturn("bob");

        assertEquals('bob', mock.getName());
    },

    testMockExecutesFunctionSetByExpectation : function() {
        var mock = new Mock(Person);

        mock.expects().getAge().stub(function() {
            return 73;
        });

        assertEquals(73, mock.getAge());
    },

    testMockThrowsExceptionSetByExpectation : function() {
        var mock = new Mock(Person);

        try {
            mock.expects().getName().toThrow(new Error("Expected error"));
            mock.getName();

            fail('An error should have been thrown');
        }catch(e) {
            assertEquals("Expected error", e.message)
        }
    },

    testMockReturnsValuesInTheOrderTheyWereSet : function() {
        var mock = new Mock(Person);
        mock.expects().getAge().toReturn(11).toReturn(12);

        assertEquals(11, mock.getAge());
        assertEquals(12, mock.getAge());
    }
});