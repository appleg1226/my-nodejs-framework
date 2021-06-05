"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
require("reflect-metadata");
function Param(arg) {
    return (target, methodName, index) => {
        if (!Reflect.hasMetadata('params', target.constructor)) {
            Reflect.defineMetadata('params', [], target.constructor);
        }
        const params = Reflect.getMetadata('params', target.constructor);
        params.push({
            methodName,
            index,
            arg
        });
        Reflect.defineMetadata('params', params, target.constructor);
    };
}
exports.Param = Param;
//# sourceMappingURL=param.decorator.js.map