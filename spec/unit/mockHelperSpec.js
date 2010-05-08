describe 'MockHelper'
    it 'should return the first value matched by the predicate'
        var matchedValue = MockHelper.find([1,2,3,4], function(value) {
            return value % 2 === 0;
        });


        matchedValue.should.eql 2
    end

    it 'should return all values matched by the predicate'
        var matchedValues = MockHelper.findAll([1,2,3,4], function(value) {
            return value % 2 === 0;
        });

        
        matchedValues.length.should.eql 2
        matchedValues[0].should.eql 2
        matchedValues[1].should.eql 4
    end

    it 'should return the next value in the array'
        var values = [1,2,3];

        MockHelper.nextOrLast(values).should.eql 1
        MockHelper.nextOrLast(values).should.eql 2
        MockHelper.nextOrLast(values).should.eql 3
    end

    it 'should return the last value in the array'
        var values = [3];

        MockHelper.nextOrLast(values).should.eql 3
        MockHelper.nextOrLast(values).should.eql 3
        MockHelper.nextOrLast(values).should.eql 3
    end
end