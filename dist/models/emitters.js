import EventEmitter from 'events';
export const emitters = () => {
    const emitter = new EventEmitter();
    emitter.addListener('message', (message) => {
        console.log('====================================');
        console.log(message);
        console.log('====================================');
    });
    emitter.emit('message', 'hello world!');
};
//# sourceMappingURL=emitters.js.map