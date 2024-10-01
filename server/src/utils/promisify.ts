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

