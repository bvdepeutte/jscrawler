function URLObject(url){
    try{
        const urlObject = new URL(url);
        if (urlObject.protocol === 'http:' || urlObject.protocol === 'https:'){
            return urlObject;
        }
        else{
            throw new Error('Invalid URL')
        }
    } catch(error){
        throw new Error('Invalid URL');
    }
}

function normalizeURL(urlObject){
    try {
        let URLPath = urlObject.pathname
            if (URLPath.endsWith('/')){
                URLPath = URLPath.slice(0,-1)                
            }
            return urlObject.hostname + URLPath
        }
    catch (error){
        throw new Error('Invalid protocol or hostname')
    }
}




export { normalizeURL, URLObject };