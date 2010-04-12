TestCase("MockControlTests", {
    testMockControlReturnsCreatedMock : function() {
        var mockControl = new MockControl();
        var personMock = mockControl.createMock(Person);

        assertNotNull(personMock);
        assertTrue(personMock instanceof Mock);
    }
});