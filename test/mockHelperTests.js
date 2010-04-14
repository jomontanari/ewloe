TestCase("MockHelperTests", {
    test_find_all_returns_correct_values_for_predicate : function() {
        var returnedValues = MockHelper.findAll([1, 2, 3, 4], function(value) {
            return value % 2 === 0;            
        });

        assertEquals(2, returnedValues.length);
        assertEquals(2, returnedValues[0]);
        assertEquals(4, returnedValues[1]);
    }
});