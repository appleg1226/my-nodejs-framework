"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autowired = void 0;
require("reflect-metadata");
function Autowired() {
    return (target, methodName, index) => {
        const paramClass = Reflect.getMetadata("design:paramtypes", target)[index].name;
        if (!Reflect.hasMetadata('autowired', target)) {
            Reflect.defineMetadata("autowired", [], target);
        }
        const autowireds = Reflect.getMetadata('autowired', target);
        autowireds.push(paramClass);
        Reflect.defineMetadata('autowired', autowireds, target);
    };
}
exports.Autowired = Autowired;
//# sourceMappingURL=autowired.decorator.js.map