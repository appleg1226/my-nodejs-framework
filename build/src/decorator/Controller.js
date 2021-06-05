"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const myFramework_1 = require("../myFramework");
function Controller(route) {
    return (target) => {
        console.log(typeof target);
        myFramework_1.addControllerPath(target, route);
    };
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map