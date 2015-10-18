(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './metadata'], function (require, exports) {
    var metadata_1 = require('./metadata');
    var JointPoint = (function () {
        function JointPoint(precondition) {
            this.precondition = precondition;
        }
        JointPoint.prototype.wove = function (_a, advice) {
            var _this = this;
            var fn = _a.fn, matches = _a.matches;
            var target = this.getTarget(fn);
            matches.forEach(function (match) {
                _this.woveTarget(target, match, advice);
            });
        };
        JointPoint.prototype.getMetadata = function (className, key, args, context) {
            var invocation = {
                name: key,
                proceed: true,
                context: context,
                result: undefined,
                exception: undefined,
                args: undefined
            };
            var metadata = new metadata_1.Metadata();
            metadata.method = invocation;
            metadata.className = className;
            if (args[0] && args[0].__advice_metadata__) {
                var previousMetadata = args[0];
                metadata.method.result = previousMetadata.method.result;
                metadata.method.proceed = previousMetadata.method.proceed;
                metadata.method.args = previousMetadata.method.args;
                metadata.method.context = previousMetadata.method.context;
            }
            else {
                metadata.method.args = Array.prototype.slice.call(args);
            }
            return metadata;
        };
        return JointPoint;
    })();
    exports.JointPoint = JointPoint;
});
