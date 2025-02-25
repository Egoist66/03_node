/**
 * Converts a callback-based function into a Promise-based one.
 * @param fn The function to be converted.
 * @returns A new function that returns a Promise.
 */
export function promisify(fn: (...args: any) => any){

    return (...args: any) => {
        return new Promise((resolve, reject) => {
            const res = fn(...args);
            if(res){
                resolve(res);
            }
        

           
        })
    }
    
}

