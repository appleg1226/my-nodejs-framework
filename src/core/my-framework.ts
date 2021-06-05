import * as express from 'express'
import { RouteDetail } from './route-detail'
import { getContainer, registerContainer } from "./container"

    
export class MyFramework {
    private app: express.Express
    
    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({
            extended: true
        }))
    }

    getExpress(): express.Express{
        return this.app
    }

    register(controllers: any[], services: any[]){
        // 1. 등록된 서비스 클래스들을 인스턴스화하여 저장
        services.forEach( service => {
            registerContainer(service.name, new service())
        })

        controllers.forEach( ctr => {
            // 2. 각 컨트롤러별로 의존성 주입
            let newInstance = this.injectDependencies(ctr)
            // 3. router 등록
            this.registerController(ctr, newInstance)
        })
    }
    
    private injectDependencies(ctr: any) {
        const autowiredList = Reflect.getMetadata('autowired', ctr)
        let newInstance
        if (autowiredList != undefined) {
            const toBeAutowired: Function[] = Reflect.getMetadata("design:paramtypes", ctr)
            let containers = toBeAutowired.map(instance => {
                return getContainer(instance.name)
            })
            newInstance = new ctr(...containers)
        } else {
            newInstance = new ctr()
        }
        return newInstance
    }

    private registerController(ctr: any, instance: any){
        const prefix = Reflect.getMetadata('prefix', ctr)
        const routes: Array<RouteDetail> = Reflect.getMetadata('routes', ctr)
        const params: ParamInfo[] = Reflect.getMetadata('params', ctr)
        const bodies: BodyInfo[] = Reflect.getMetadata('bodies', ctr)

        // 1. 각 route method들과 param이 있는 것들 연결
        if(params.length != 0){
            params.forEach((param: ParamInfo) => {
                for(const route of routes){
                    if(param.methodName == route.methodName){
                        route.params.push(param)
                        break
                    }
                }
            });
        }
        
        // 2. 각 route method들과 body가 있는 것들 연결
        if(bodies.length != 0){
            bodies.forEach((body: BodyInfo) => {
                for(const route of routes){
                    if(body.methodName == route.methodName){
                        route.params.push(body)
                        break
                    }
                }
            });
        }
        
        // 3. 각 Router 등록
        routes.forEach((route: RouteDetail) =>{
            const paramArr = this.reArrangeParams(route)
            let finalPath: string = this.getFinalPath(route, prefix)
            this.registerRouter(route, finalPath, paramArr, instance)
        })
    }

    private registerRouter(route: RouteDetail, finalPath: string, paramArr: any[], instance: any) {
        if (route.requestMethod == 'get') {
            this.app.get(finalPath, async (req: express.Request, res: express.Response) => {
                const paramArrResolved = this.resolveParamsArr(paramArr, req)
                let result
                try {
                    result = await instance[route.methodName](...paramArrResolved)
                } catch (error) {
                    res.status(400).json({error: error.toString()})    
                }
                res.send(result)
            })
            console.log(`\x1b[32m`, "[GET] " + finalPath + " is registered", `\x1b[0m`)
        } else if (route.requestMethod == 'post') {
            this.app.post(finalPath, async (req: express.Request, res: express.Response) => {
                const paramArrResolved = this.resolveParamsArr(paramArr, req)
                let result
                try {
                    result = await instance[route.methodName](...paramArrResolved)
                } catch (error) {
                    res.status(400).json({error: error.toString()})    
                }
                res.send(result)
            })
            console.log("\x1b[32m", "[POST] " + finalPath + " is registered", "\x1b[0m")
        } else if (route.requestMethod == 'put') {
            this.app.put(finalPath, async (req: express.Request, res: express.Response) => {
                const paramArrResolved = this.resolveParamsArr(paramArr, req)
                let result
                try {
                    result = await instance[route.methodName](...paramArrResolved)
                } catch (error) {
                    res.status(400).json({error: error.toString()})    
                }
                res.send(result)
            })   
            console.log("\x1b[32m", "[PUT] " + finalPath + " is registered", "\x1b[0m")
        } else {
            this.app.delete(finalPath, async (req: express.Request, res: express.Response) => {
                const paramArrResolved = this.resolveParamsArr(paramArr, req)
                let result
                try {
                    result = await instance[route.methodName](...paramArrResolved)
                } catch (error) {
                    res.status(400).json({error: error.toString()})    
                }
                res.send(result)
            })
            console.log("\x1b[32m", "[DELETE] " + finalPath + " is registered", "\x1b[0m")
        }
    }

    private resolveParamsArr(paramArr: any[], req: express.Request) {
        const paramArrResolved = []
        for (const param of paramArr) {
            if (param == "body") {
                paramArrResolved.push(req.body)
            } else {
                paramArrResolved.push(req.params[param])
            }
        }
        return paramArrResolved
    }

    private getFinalPath(route: RouteDetail, prefix: any) {
        let finalPath: string
        if (route.path == '') {
            finalPath = "/" + prefix
        } else {
            finalPath = "/" + prefix + "/" + route.path
        }
        return finalPath
    }

    private reArrangeParams(route: RouteDetail) {
        const paramArr = new Array(route.params.length)
        if (route.params.length != 0) {
            for (const param of route.params) {
                if ('arg' in param) { // param
                    paramArr[param.index] = param.arg
                } else { // body
                    paramArr[param.index] = "body"
                }
            }
        }
        return paramArr
    }

    start(port: number) {
        this.app.listen(port, () => {
            console.log('Example app listening on port ' + port)
        })
    }

}
