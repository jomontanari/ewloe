function FrameworkIntegration() {
    this.fail = function(discrepancy) {
        fail(discrepancy.getMessage());
    };
}