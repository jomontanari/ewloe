TestCase("DynamicExpectationMatcherTests", {
    test_no_discrepancy_is_returned_if_an_unexpected_call_is_executed : function() {
        var expectationMatcher = new DynamicExpectationMatcher();
        expectationMatcher.addActualMethodCall(new InvocationBehaviour('Person', 'getName', []));

        var discrepancy = expectationMatcher.verify();

        assertNull(discrepancy);
    },

    test_a_discrepancy_is_returned_if_an_expected_call_not_executed : function() {
        var expectationMatcher = new DynamicExpectationMatcher();
        expectationMatcher.addExpectedMethodCall(new InvocationBehaviour('Person', 'getName', []));

        var discrepancy = expectationMatcher.verify();

        assertNotNull(discrepancy);
        assertEquals("Expected call 'Person.getName()' not executed", discrepancy.getMessage());
    },

    test_a_discrepancy_is_returned_if_an_expected_call_executed_with_the_wrong_arguments : function() {
        var expectationMatcher = new DynamicExpectationMatcher();
        expectationMatcher.addExpectedMethodCall(new InvocationBehaviour('Person', 'getName', [2,3]));
        expectationMatcher.addActualMethodCall(new InvocationBehaviour('Person', 'getName', [1,2]));

        var discrepancy = expectationMatcher.verify();

        assertNotNull(discrepancy);
        assertEquals("Expected call 'Person.getName(2,3)' not executed", discrepancy.getMessage());
    },

    test_a_discrepancy_is_not_returned_if_an_expected_call_is_executed : function() {
        var expectationMatcher = new DynamicExpectationMatcher();
        expectationMatcher.addExpectedMethodCall(new InvocationBehaviour('Person', 'getName', [2,3]));
        expectationMatcher.addActualMethodCall(new InvocationBehaviour('Person', 'getName', [2,3]));

        var discrepancy = expectationMatcher.verify();

        assertNull(discrepancy);
    }
});