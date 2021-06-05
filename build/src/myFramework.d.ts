export declare class MyFramework {
    private app;
    constructor();
    registerControllers(controllers: Function[]): void;
    start(port: number): void;
}
export declare function addControllerPath(className: string, path: string): void;
