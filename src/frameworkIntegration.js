function FrameworkIntegration() {
    this.fail = function(discrepancy) {
        if (JSpec != undefined) {
            JSpec.fail(discrepancy.getMessage());
        }
    }
}