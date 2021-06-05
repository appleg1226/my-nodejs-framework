"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
require("reflect-metadata");
function Post(path) {
    return (target, name, descriptor) => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor);
        routes.push({
            requestMethod: 'post',
            path: path,
            methodName: name,
            params: []
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
exports.Post = Post;
//# sourceMappingURL=post.decorator.js.map