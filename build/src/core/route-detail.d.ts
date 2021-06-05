export interface RouteDetail {
    path: string;
    requestMethod: 'get' | 'post' | 'delete' | 'put';
    methodName: string;
    params: any[];
}
