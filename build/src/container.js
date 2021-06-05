"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainer = exports.registerContainer = void 0;
const classContainer = new Map();
function registerContainer(key, instance) {
    classContainer.set(key, instance);
    console.log(`Added ${key} to the container`);
}
exports.registerContainer = registerContainer;
function getContainer(key) {
    return classContainer.get(key);
}
exports.getContainer = getContainer;
//# sourceMappingURL=container.js.map