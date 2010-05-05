function FrameworkIntegration() {
    this.fail = function(discrepancy) {
        fail(discrepancy.getMessage());
    };

    this.pass = function(discrepancy) {
        if (JSpec != undefined) {
            JSpec.pass();
        }
    }
}