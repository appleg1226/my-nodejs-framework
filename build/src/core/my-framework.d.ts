import * as express from 'express';
export declare class MyFramework {
    private app;
    constructor();
    getExpress(): express.Express;
    register(controllers: any[], services: any[]): void;
    registerTest(controllers: any[], services: any[]): void;
    private injectDependencies;
    private registerController;
    private registerRouter;
    private resolveParamsArr;
    private getFinalPath;
    private reArrangeParams;
    start(port: number): void;
}
