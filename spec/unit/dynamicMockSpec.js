describe 'Dynamic Mocks'
    it 'should return the value set on the stubbed call'
        var mockControl = new MockControl();

        var mock = mockControl.createDynamicMock(Person);
        mock.tells().getName().toReturn("I am a stubbed result");

        var result = mock.getName();

        result.should.eql "I am a stubbed result" 
    end
end