function InvocationBehaviour(caller, method, args) {
    this.caller = caller;
    this.method = method;
    this.args = args;
    
    this.equals = function(other) {
        var argumentMatcher = new ArgumentMatcher();

        return caller == other.caller && method === other.method && argumentMatcher.areEqual(args, other.args);
    };

    this.toString = function calculateToString() {
        var toStr = caller.toString() + "." + method;

        if (args.length !== 0) {
            toStr = toStr + "(";

            for (var i = 0; i < args.length; i++) {
                toStr = toStr + args[i].toString() + ',';
            }

            toStr = toStr.substring(0, toStr.length - 1);
            toStr = toStr + ")";
        }else {
            toStr = toStr + "()";
        }

        return toStr;
    }
}