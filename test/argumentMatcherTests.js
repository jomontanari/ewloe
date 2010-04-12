TestCase("ArgumentMatcherTests", {
    testReturnsTrueIfTwoArraysMatch : function() {
        var argumentMatcher = new ArgumentMatcher();
        var argumentsMatch = argumentMatcher.areEqual(["test", 1, true], ["test", 1, true]);

        assertTrue(argumentsMatch);
    },

    testReturnsFalseIfTwoArraysDontMatch : function() {
        var argumentMatcher = new ArgumentMatcher();
        var argumentsMatch = argumentMatcher.areEqual(["test1", 1, true], ["test2", 2, true]);

        assertFalse(argumentsMatch);
    }
});