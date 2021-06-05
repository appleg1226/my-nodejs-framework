"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFramework = void 0;
const express = require("express");
const container_1 = require("./container");
class MyFramework {
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
    }
    getExpress() {
        return this.app;
    }
    register(controllers, services) {
        // 1. 등록된 서비스 클래스들을 인스턴스화하여 저장
        services.forEach(service => {
            container_1.registerContainer(service.name, new service());
        });
        controllers.forEach(ctr => {
            // 2. 각 컨트롤러별로 의존성 주입
            let newInstance = this.injectDependencies(ctr);
            // 3. router 등록
            this.registerController(ctr, newInstance);
        });
    }
    registerTest(controllers, services) {
        services.forEach(service => {
            container_1.registerContainer(service.name, new service());
        });
        controllers.forEach(ctr => {
            let newInstance = this.injectDependencies(ctr);
            this.registerController(ctr, newInstance);
        });
    }
    injectDependencies(ctr) {
        const autowiredList = Reflect.getMetadata('autowired', ctr);
        let newInstance;
        if (autowiredList != undefined) {
            const toBeAutowired = Reflect.getMetadata("design:paramtypes", ctr);
            let containers = toBeAutowired.map(instance => {
                return container_1.getContainer(instance.name);
            });
            newInstance = new ctr(...containers);
        }
        else {
            newInstance = new ctr();
        }
        return newInstance;
    }
    registerController(ctr, instance) {
        const prefix = Reflect.getMetadata('prefix', ctr);
        const routes = Reflect.getMetadata('routes', ctr);
        const params = Reflect.getMetadata('params', ctr);
        const bodies = Reflect.getMetadata('bodies', ctr);
        // 1. 각 route method들과 param이 있는 것들 연결
        if (params.length != 0) {
            params.forEach((param) => {
                for (const route of routes) {
                    if (param.methodName == route.methodName) {
                        route.params.push(param);
                        break;
                    }
                }
            });
        }
        // 2. 각 route method들과 body가 있는 것들 연결
        if (bodies.length != 0) {
            bodies.forEach((body) => {
                for (const route of routes) {
                    if (body.methodName == route.methodName) {
                        route.params.push(body);
                        break;
                    }
                }
            });
        }
        // 3. 각 Router 등록
        routes.forEach((route) => {
            const paramArr = this.reArrangeParams(route);
            let finalPath = this.getFinalPath(route, prefix);
            this.registerRouter(route, finalPath, paramArr, instance);
        });
    }
    registerRouter(route, finalPath, paramArr, instance) {
        if (route.requestMethod == 'get') {
            this.app.get(finalPath, async (req, res) => {
                const paramArrResolved = this.resolveParamsArr(paramArr, req);
                let result;
                try {
                    result = await instance[route.methodName](...paramArrResolved);
                }
                catch (error) {
                    res.status(400).json({ error: error.toString() });
                }
                res.send(result);
            });
            console.log(`\x1b[32m`, "[GET] " + finalPath + " is registered", `\x1b[0m`);
        }
        else if (route.requestMethod == 'post') {
            this.app.post(finalPath, async (req, res) => {
                const paramArrResolved = this.resolveParamsArr(paramArr, req);
                let result;
                try {
                    result = await instance[route.methodName](...paramArrResolved);
                }
                catch (error) {
                    res.status(400).json({ error: error.toString() });
                }
                res.send(result);
            });
            console.log("\x1b[32m", "[POST] " + finalPath + " is registered", "\x1b[0m");
        }
        else if (route.requestMethod == 'put') {
            this.app.put(finalPath, async (req, res) => {
                const paramArrResolved = this.resolveParamsArr(paramArr, req);
                let result;
                try {
                    result = await instance[route.methodName](...paramArrResolved);
                }
                catch (error) {
                    res.status(400).json({ error: error.toString() });
                }
                res.send(result);
            });
            console.log("\x1b[32m", "[PUT] " + finalPath + " is registered", "\x1b[0m");
        }
        else {
            this.app.delete(finalPath, async (req, res) => {
                const paramArrResolved = this.resolveParamsArr(paramArr, req);
                let result;
                try {
                    result = await instance[route.methodName](...paramArrResolved);
                }
                catch (error) {
                    res.status(400).json({ error: error.toString() });
                }
                res.send(result);
            });
            console.log("\x1b[32m", "[DELETE] " + finalPath + " is registered", "\x1b[0m");
        }
    }
    resolveParamsArr(paramArr, req) {
        const paramArrResolved = [];
        for (const param of paramArr) {
            if (param == "body") {
                paramArrResolved.push(req.body);
            }
            else {
                paramArrResolved.push(req.params[param]);
            }
        }
        return paramArrResolved;
    }
    getFinalPath(route, prefix) {
        let finalPath;
        if (route.path == '') {
            finalPath = "/" + prefix;
        }
        else {
            finalPath = "/" + prefix + "/" + route.path;
        }
        return finalPath;
    }
    reArrangeParams(route) {
        const paramArr = new Array(route.params.length);
        if (route.params.length != 0) {
            for (const param of route.params) {
                if ('arg' in param) { // param
                    paramArr[param.index] = param.arg;
                }
                else { // body
                    paramArr[param.index] = "body";
                }
            }
        }
        return paramArr;
    }
    start(port) {
        this.app.listen(port, () => {
            console.log('Example app listening on port ' + port);
        });
    }
}
exports.MyFramework = MyFramework;
//# sourceMappingURL=my-framework.js.map