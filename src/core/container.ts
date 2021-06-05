const classContainer : Map<string, any> = new Map()

export function registerContainer(key: string, instance: any){
    classContainer.set(key, instance)
    console.info(`Added ${key} to the container`)
}

export function getContainer(key: string): any{
    return classContainer.get(key)
}

