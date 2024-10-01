/**
 * Extracts a parameter from a URL.
 *
 * @param {string} url - The URL from which to extract the parameter.
 * @param {RegExp} [regExp] - Optional regular expression to match the parameter.
 * @return {string} The extracted parameter.
 */
export function getUriParameter(url: string, regExp?: RegExp){
    if(regExp){
        return url.split('/').at(-1).match(regExp)?.[1];

    }



    return url.split('/').at(-1)
  
}