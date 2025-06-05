
/**
 * Converts a function that returns a value or a promise into a function that returns a promise.
 *
 * @param {function} fn - The function to be promisified.
 * @returns {function} A function that returns a promise.
 * @example
 * const readdir = promisify(fs.readdir);
 * readdir('.').then(files => {
 *     console.log(files);
 * });
 */
export function promisify<T, R>(fn: (...args: T[]) => R | Promise<R>) {

    return (...args: T[]) => {
        return new Promise<R>((resolve, reject) => {
            const res = fn(...args);
            if (res instanceof Promise) {
                res.then(resolve).catch(reject);
            } else {
                resolve(res);
            }

        })
    }

}

