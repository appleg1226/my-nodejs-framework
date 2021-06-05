import 'reflect-metadata';

export function Controller(route?: string): Function {
    return (target: Function) => {
        Reflect.defineMetadata('prefix', route, target);
        if (! Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
        if (!Reflect.hasMetadata('bodies', target)) {
            Reflect.defineMetadata('bodies', [], target)
        }
        if (!Reflect.hasMetadata('params', target)) {
            Reflect.defineMetadata('params', [], target)
        }
    };
  }