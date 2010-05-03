describe 'Mock Control'
    it 'should create a dynamic mock from a type'
        var mockControl = new MockControl();
        var mock = mockControl.createDynamicMock(Person);

        mock.should.not.be_null
        mock.constructor.should.eql Mock
    end

    it 'should create a strict mock from a type'
        var mockControl = new MockControl();
        var mock = mockControl.createStrictMock(Person);

        mock.should.not.be_null
        mock.constructor.should.eql Mock
    end
end