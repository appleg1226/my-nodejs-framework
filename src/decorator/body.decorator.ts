import 'reflect-metadata';

export function Body(): Function {
    return (target: Object, methodName: string, index: number) =>{
        if (!Reflect.hasMetadata('bodies', target.constructor)) {
            Reflect.defineMetadata('bodies', [], target.constructor)
        }

        const bodies = Reflect.getMetadata('bodies', target.constructor)
        bodies.push({
            methodName,
            index
        })
        Reflect.defineMetadata('bodies', bodies, target.constructor)
    }
}