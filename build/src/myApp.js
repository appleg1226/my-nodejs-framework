"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFramework = void 0;
const express = require("express");
class MyFramework {
    constructor() {
        this.app = express();
    }
    registerControllers(controllers) {
        console.log(controllers);
        // this.app.get('/', (req: express.Request, res: express.Response) => {
        //     res.send('Hello World!')
        // });
    }
    start(port) {
        this.app.listen(port, () => {
            console.log('Example app listening on port ' + port);
        });
    }
}
exports.MyFramework = MyFramework;
//# sourceMappingURL=myApp.js.map