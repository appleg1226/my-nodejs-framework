import 'reflect-metadata';

export function Param(arg: string): Function {
    return (target: Object, methodName: string, index: number) =>{
        if (!Reflect.hasMetadata('params', target.constructor)) {
            Reflect.defineMetadata('params', [], target.constructor)
        }
        const params = Reflect.getMetadata('params', target.constructor)
        params.push({
            methodName,
            index, 
            arg
        })
        Reflect.defineMetadata('params', params, target.constructor)
    }
}