"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
require("reflect-metadata");
function Controller(route) {
    return (target) => {
        Reflect.defineMetadata('prefix', route, target);
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
        if (!Reflect.hasMetadata('bodies', target)) {
            Reflect.defineMetadata('bodies', [], target);
        }
        if (!Reflect.hasMetadata('params', target)) {
            Reflect.defineMetadata('params', [], target);
        }
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.decorator.js.map