export declare class MyFramework {
    private app;
    constructor();
    register(controllers: any[], services: any[]): void;
    private injectDependencies;
    private registerController;
    private registerRouter;
    private resolveParamsArr;
    private getFinalPath;
    private reArrangeParams;
    start(port: number): void;
}
