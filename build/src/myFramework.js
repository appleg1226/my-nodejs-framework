"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addControllerPath = exports.MyFramework = void 0;
const express = require("express");
const controllers = [];
class MyFramework {
    constructor() {
        this.app = express();
    }
    registerControllers(controllers) {
    }
    start(port) {
        this.app.listen(port, () => {
            console.log('Example app listening on port ' + port);
        });
    }
}
exports.MyFramework = MyFramework;
function addControllerPath(className, path) {
    controllers.push({ className, path });
    console.log(controllers);
}
exports.addControllerPath = addControllerPath;
//# sourceMappingURL=myFramework.js.map