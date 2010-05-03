describe 'Mock Control'
    it 'should create a dynamic mock from a type'
        var mockControl = new MockControl();
        var mock = mockControl.createDynamicMock(Person);

        mock.should.not.be_null
    end

    it 'should create a strict mock from a type'
        var mockControl = new MockControl();
        var mock = mockControl.createStrictMock(Person);

        mock.should.not.be_null
    end

    it 'should create a dynamic mock from an instance'
        var mockControl = new MockControl();
        var mock = mockControl.createDynamicMock(new Person());

        mock.should.not.be_null
        mock.constructor.should.eql Person
    end

    it 'should create a strict mock from an instance'
        var mockControl = new MockControl();
        var mock = mockControl.createStrictMock(new Person());

        mock.should.not.be_null
        mock.constructor.should.eql Person
    end
end