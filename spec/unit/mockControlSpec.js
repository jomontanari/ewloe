describe 'MockControl'
    before_each
        mockControl = new MockControl();
    end

    it 'should create a mock'
        var mock = mockControl.createMock(Person);

        mock.should.not.be_null;
    end
end