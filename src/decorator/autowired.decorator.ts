import 'reflect-metadata';

export function Autowired(): Function {
    return (target: Object, methodName: string, index: number) =>{
        const paramClass = Reflect.getMetadata("design:paramtypes", target)[index].name
        
        if(!Reflect.hasMetadata('autowired', target)){
            Reflect.defineMetadata("autowired", [], target)
        }

        const autowireds = Reflect.getMetadata('autowired', target)
        autowireds.push(paramClass)
        Reflect.defineMetadata('autowired', autowireds, target)
    }
}