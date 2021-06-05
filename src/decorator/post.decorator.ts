import 'reflect-metadata';
import { RouteDetail } from "../core/route-detail";

export function Post(path: string): Function {
    return (target: any, name: any, descriptor: any) => {
        
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDetail>
        routes.push({
            requestMethod: 'post',
            path: path,
            methodName: name,
            params: []
        })
        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}