var mock = null;

TestCase("MockTests", {
    setUp : function() {
        mock = new Mock(new DynamicExpectationMatcher());
        mock.init(Person);
    },

    test_mock_replaces_all_public_methods_on_class : function() {
        assertTrue(mock.hasOwnProperty('getName'));
        assertTrue(mock.hasOwnProperty('getAge'));
    },

    test_mock_throws_error_if_expect_not_called_before_return_functions: function() {
        try {
            mock.getName().andReturn('bob');

            fail('An error should have been thrown');
        }catch(e) {
            assertTrue(true);    
        }
    },

    test_mock_returns_value_set_by_expectation : function() {
        mock.expects().getName().toReturn("bob");

        assertEquals('bob', mock.getName());
    },

    test_mock_executes_function_set_by_expectation : function() {
        mock.expects().getAge().toExecute(function() {
            return 73;
        });

        assertEquals(73, mock.getAge());
    },

    test_mock_throws_exception_set_by_expectation : function() {
        try {
            mock.expects().getName().toThrow(new Error("Expected error"));
            mock.getName();

            fail('An error should have been thrown');
        }catch(e) {
            assertEquals("Expected error", e.message)
        }
    },

    test_mock_returns_values_in_the_order_they_were_set : function() {
        mock.expects().getAge().toReturn(11).toReturn(12);

        assertEquals(11, mock.getAge());
        assertEquals(12, mock.getAge());
    },

    test_verify_asks_the_expectation_matcher_to_check_the_calls : function() {
        var verifyCalled = false;

        var expectationMatcherStub = {
            verify : function() {
                verifyCalled = true;
            }
        };

        var mock = new Mock(expectationMatcherStub);
        mock.init(Person);
        
        mock.verify();

        assertTrue(verifyCalled);
    }
});