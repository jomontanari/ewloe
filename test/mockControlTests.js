TestCase("MockControlTests", {
    test_create_strict_mock_returns_the_created_mock : function() {
        var mockControl = new MockControl();
        var personMock = mockControl.createStrictMock(Person);

        assertNotNull(personMock);
        assertTrue(personMock instanceof Mock);
    },

    test_create_dynamic_mock_returns_the_created_mock : function() {
        var mockControl = new MockControl();
        var personMock = mockControl.createStrictMock(Person);

        assertNotNull(personMock);
        assertTrue(personMock instanceof Mock);
    }
});