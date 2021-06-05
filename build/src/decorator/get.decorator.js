"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
require("reflect-metadata");
function Get(path) {
    return (target, name, descriptor) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor);
        routes.push({
            requestMethod: 'get',
            path: path,
            methodName: name,
            params: []
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
exports.Get = Get;
//# sourceMappingURL=get.decorator.js.map