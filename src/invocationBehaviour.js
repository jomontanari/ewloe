function InvocationBehaviour(caller, method, args) {
    this.getCaller = function() { return caller };
    this.getMethod = function() { return method };
    this.getArgs = function() { return args };
    
    this.equals = function(other) {
        var argumentMatcher = new ArgumentMatcher();

        return caller == other.getCaller() && method === other.getMethod() && argumentMatcher.areEqual(args, other.getArgs());
    };

    this.toString = function calculateToString() {
        var toStr = caller.toString() + "." + method;

        if (args.length !== 0) {
            toStr = toStr + '(' + args.toString() + ')';
        }else {
            toStr = toStr + "()";
        }

        return toStr;
    }
}