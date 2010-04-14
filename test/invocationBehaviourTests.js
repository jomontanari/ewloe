TestCase("InvocationBehaviourTests", {
    test_returns_true_if_all_parameters_are_equal : function() {
        var caller = {};

        var invocationBehaviour1 = new InvocationBehaviour(caller, 'getName', [1, "test"]);
        var invocationBehaviour2 = new InvocationBehaviour(caller, 'getName', [1, "test"]);


        assertTrue(invocationBehaviour1.equals(invocationBehaviour2));
    },

    test_returns_false_if_callers_not_equal : function() {
        var caller1 = {};
        var caller2 = {};

        var invocationBehaviour1 = new InvocationBehaviour(caller1, 'getAge', [1, "test"]);
        var invocationBehaviour2 = new InvocationBehaviour(caller2, 'getAge', [1, "test"]);

        assertFalse(invocationBehaviour1.equals(invocationBehaviour2));
    },

    test_returns_false_if_methods_not_equal : function() {
        var caller = {};

        var invocationBehaviour1 = new InvocationBehaviour(caller, 'getAge', [1, "test"]);
        var invocationBehaviour2 = new InvocationBehaviour(caller, 'getName', [1, "test"]);

        assertFalse(invocationBehaviour1.equals(invocationBehaviour2));
    },

    test_returns_false_if_args_not_equal : function() {
        var caller = {};

        var invocationBehaviour1 = new InvocationBehaviour(caller, 'getAge', [1, "test"]);
        var invocationBehaviour2 = new InvocationBehaviour(caller, 'getAge', [2, "test"]);

        assertFalse(invocationBehaviour1.equals(invocationBehaviour2));
    },

    test_returns_correctly_formatted_description_for_empty_args : function() {
        var caller = { toString : function() { return "Person" }};

        var invocationBehaviour = new InvocationBehaviour(caller, 'getAge', []);
        var description = invocationBehaviour.toString();

        assertEquals("Person.getAge()", description);
    },

    test_returns_correctly_formatted_description_for_non_empty_args : function() {
        var caller = { toString : function() { return "Person" }};

        var invocationBehaviour = new InvocationBehaviour(caller, 'getAge', [1, 'test']);
        var description = invocationBehaviour.toString();

        assertEquals("Person.getAge(1,test)", description);
    }
});