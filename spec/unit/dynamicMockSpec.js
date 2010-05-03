describe 'Dynamic Mocks'
    it 'should return the value set on the stubbed call'
        var mockControl = new MockControl();

        var personMock = mockControl.createDynamicMock(Person);
        personMock.tells().getName().toReturn("I am a stubbed result");

        var result = personMock.getName();

        result.should.eql "I am a stubbed result" 
    end
end