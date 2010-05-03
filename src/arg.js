function Arg(type) {
    this.expectedType = type;
}

Arg.isA = function(type) {
    return new Arg(type)
};