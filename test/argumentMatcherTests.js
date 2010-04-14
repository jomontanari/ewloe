TestCase("ArgumentMatcherTests", {
    test_returns_true_if_two_arrays_match : function() {
        var argumentMatcher = new ArgumentMatcher();
        var argumentsMatch = argumentMatcher.areEqual(["test", 1, true], ["test", 1, true]);

        assertTrue(argumentsMatch);
    },

    test_returns_false_if_two_arrays_dont_match : function() {
        var argumentMatcher = new ArgumentMatcher();
        var argumentsMatch = argumentMatcher.areEqual(["test1", 1, true], ["test2", 2, true]);

        assertFalse(argumentsMatch);
    }
});