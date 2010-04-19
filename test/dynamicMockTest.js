var mock = null;

TestCase("DynamicMockTests", {
    setUp : function() {
        mock = new DynamicMock(Person);
    },

    test_no_discrepancy_is_returned_if_an_unexpected_call_is_executed : function() {
        mock.getName();

        var discrepancy = mock.verify();

        assertNull(discrepancy);
    },

    test_a_discrepancy_is_returned_if_an_expected_call_not_executed : function() {
        mock.expects().getName();

        var discrepancy = mock.verify();

        assertNotNull(discrepancy);
        assertEquals("Expected call 'Person.getName()' not executed", discrepancy.getMessage());
    },

    test_a_discrepancy_is_returned_if_an_expected_call_executed_with_the_wrong_arguments : function() {
        mock.expects().getName(2, 3);
        mock.getName(1, 2);

        var discrepancy = mock.verify();

        assertNotNull(discrepancy);
        assertEquals("Expected call 'Person.getName(2,3)' not executed", discrepancy.getMessage());
    },

    test_a_discrepancy_is_not_returned_if_an_expected_call_is_executed : function() {
        mock.expects().getName(2, 3);
        mock.getName(2, 3);

        var discrepancy = mock.verify();

        assertNull(discrepancy);
    }
});