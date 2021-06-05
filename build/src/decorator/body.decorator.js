"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
require("reflect-metadata");
function Body() {
    return (target, methodName, index) => {
        if (!Reflect.hasMetadata('bodies', target.constructor)) {
            Reflect.defineMetadata('bodies', [], target.constructor);
        }
        const bodies = Reflect.getMetadata('bodies', target.constructor);
        bodies.push({
            methodName,
            index
        });
        Reflect.defineMetadata('bodies', bodies, target.constructor);
    };
}
exports.Body = Body;
//# sourceMappingURL=body.decorator.js.map