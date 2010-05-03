describe 'Argument Matcher'
    before_each
        argumentMatcher = new ArgumentMatcher();
    end

    it 'should return false if the two arrays have different lengths'
        var result = argumentMatcher.areEqual(["test", 1], ["test"]);

        result.should.be_false;
    end

    it 'should return true if two arrays are equal'
        var result = argumentMatcher.areEqual(["test", 1, true, [1,2]], ["test", 1, true, [1,2]]);

        result.should.be_true;
    end

    it 'should return true if a function is expected as an argument and a function is passed as an argument'
        var result = argumentMatcher.areEqual([Arg.isA(Function)], [function(){}]);

        result.should.be_true;
    end

    it 'should return true if a string is expected as an argument and a string is passed as an argument'
        var result = argumentMatcher.areEqual([Arg.isA(String)], ["string"]);

        result.should.be_true;
    end

    it 'should return true if a number is expected as an argument and a number is passed as an argument'
        var result = argumentMatcher.areEqual([Arg.isA(Number)], [1]);

        result.should.be_true;
    end

    it 'should return true if a boolean is expected as an argument and a boolean is passed as an argument'
        var result = argumentMatcher.areEqual([Arg.isA(Boolean)], [true]);

        result.should.be_true;
    end

    it 'should return true if a Person object is expected as an argument and a Person is passed as an argument'
        var result = argumentMatcher.areEqual([Arg.isA(Person)], [new Person()]);

        result.should.be_true;
    end
end