"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = void 0;
require("reflect-metadata");
function Put(path) {
    return (target, name, descriptor) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor);
        routes.push({
            requestMethod: 'put',
            path: path,
            methodName: name,
            params: []
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
exports.Put = Put;
//# sourceMappingURL=put.decorator.js.map