describe 'ArgumentMatcher'
    it 'Should return true if two arrays are equal'
        var argumentMatcher = new ArgumentMatcher();
        var result = argumentMatcher.areEqual(["test", 1, true], ["test", 1, true]);

        result.should.be_true;
    end
end