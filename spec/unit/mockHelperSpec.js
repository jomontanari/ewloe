describe 'MockHelper'
    it 'should return all values matched by the predicate'
        var matchedValues = MockHelper.findAll([1,2,3,4], function(value) {
            return value % 2 === 0;
        });

        
        matchedValues.length.should.eql 2
        matchedValues[0].should.eql 2
        matchedValues[1].should.eql 4
    end
end