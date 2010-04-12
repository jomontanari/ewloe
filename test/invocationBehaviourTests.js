TestCase("InvocationBehaviourTests", {
    testReturnsTrueIfEqual : function() {
        var mock = { toString : function() { return "Person" }};

        var invocationBehaviour1 = new InvocationBehaviour(mock, 'getName', [1, "test"]);
        var invocationBehaviour2 = new InvocationBehaviour(mock, 'getName', [1, "test"]);


        assertTrue(invocationBehaviour1.equals(invocationBehaviour2));
    },

    testReturnsFalseIfNotEqual : function() {
        var mock = { toString : function() { return "Person" }};

        var invocationBehaviour1 = new InvocationBehaviour(mock, 'getName', [1, "test"]);
        var invocationBehaviour2 = new InvocationBehaviour(mock, 'getAge', [1, "test"]);

        assertFalse(invocationBehaviour1.equals(invocationBehaviour2));
    }
});