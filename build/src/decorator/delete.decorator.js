"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
require("reflect-metadata");
function Delete(path) {
    return (target, name, descriptor) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor);
        routes.push({
            requestMethod: 'delete',
            path: path,
            methodName: name,
            params: []
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
exports.Delete = Delete;
//# sourceMappingURL=delete.decorator.js.map