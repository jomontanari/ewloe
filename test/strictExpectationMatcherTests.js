TestCase("StrictExpectationMatcherTests", {
    test_returns_discrepancy_if_an_unexpected_call_made : function() {
        var mock = {};

        var expectationMatcher = new StrictExpectationMatcher();
        expectationMatcher.addActualMethodCall(new InvocationBehaviour('Person', 'getName', []));

        var discrepancy = expectationMatcher.verify();

        assertNotNull(discrepancy);
        assertEquals("Unexpected call 'Person.getName()' found", discrepancy.getMessage());
    }
});