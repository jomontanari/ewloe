function InvocationBehaviour(caller, method, args) {
    var repeatCount = 1;

    this.getCaller = function() { return caller };
    this.getMethod = function() { return method };
    this.getArgs = function() { return args; };

    this.setRepeats = function(count) {
        repeatCount = count;
    };

    this.getRepeats = function() {
        return repeatCount;
    };

    this.equals = function(other) {
        var argumentMatcher = new ArgumentMatcher();

        return caller == other.getCaller() &&
               method === other.getMethod() &&
               argumentMatcher.areEqual(args, other.getArgs());
    };

    this.toString = function() {
        var toStr = caller + "." + method;

        if (args.length !== 0) {
            toStr = toStr + '(' + formatArgs() + ')';
        }else {
            toStr = toStr + "()";
        }

        return toStr;
    };

    function formatArgs() {
        var toStr = "";

        for (var i = 0; i < args.length; i++) {
            toStr += args[i] + ",";
        }

        return toStr.substring(0, toStr.lastIndexOf(","));
    }
}