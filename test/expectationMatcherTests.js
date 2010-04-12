TestCase("ExpectationMatcherTests", {
    testReturnsDiscrepancyIfAnUnexpectedCallMadeOnAStrictMock : function() {
        var mock = {};

        var expectationMatcher = new ExpectationMatcher(true);
        expectationMatcher.addActualMethodCall(new InvocationBehaviour('Person', 'getName', []));

        var discrepancy = expectationMatcher.verify();

        assertNotNull(discrepancy);
        assertEquals("Unexpected call 'Person.getName()' found", discrepancy.getMessage());
    }
});