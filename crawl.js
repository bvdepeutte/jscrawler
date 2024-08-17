import {JSDOM} from 'jsdom'
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


function getURLsFromHTML(html, baseURL) {
    const urls = []
    const dom = new JSDOM(html)
    const anchors = dom.window.document.querySelectorAll('a')
  
    for (const anchor of anchors) {
      if (anchor.hasAttribute('href')) {
        let href = anchor.getAttribute('href')
  
        try {
          // convert any relative URLs to absolute URLs
            if (!href.startsWith('mailto:') && !href.startsWith('javascript:') && !href.startsWith('tel:')) {
                href = new URL(href, baseURL).href
                urls.push(href)
            }
        }    
        catch(err) {
          console.log(`${err.message}: ${href}`)
        }
      }
    }
  
    return urls
  }

async function crawlPage(baseURL, currentURL = baseURL, pages = {}){

    const urlBaseObject = URLObject(baseURL)
    // console.log(currentURL)
    const urlCurrentObject = URLObject(currentURL)

    if (urlBaseObject.hostname !== urlCurrentObject.hostname){
        return pages
    }
    const normalizeCurrentURL = normalizeURL(urlCurrentObject)
    if (pages[normalizeCurrentURL]>0){
        pages[normalizeCurrentURL]++
        return pages
    }
    pages[normalizeCurrentURL] = 1
    console.log(`crawling ${currentURL}`)

    let body;
    try {
        body = await htmlParsing(currentURL);
    } catch (error) {
        console.log(`Error parsing ${currentURL}: ${error.message}`);
        return pages;
    }
    // console.log(body)
    const urlArray = getURLsFromHTML(body,currentURL)

    for (const url of urlArray){
        await crawlPage(baseURL,url, pages)
    }
    return pages
}

async function htmlParsing(baseURL){
    let url
    try {
        url = await fetch(baseURL)
    }
    catch (error){
         throw new Error(`Got network error on current URL:${error.message}`)
    }
    const urlHeaders = url.headers.get('content-type')
    const urlHeadersMap = urlHeaders.split(';').map(item => item.trim())
        // console.log(urlHeadersMap)
    if (url.status >= 400){
        console.log(`Error: code status is: ${url.status} - ${url.statusText}`)
        return
    }
    else if (!urlHeadersMap.includes('text/html')){
        throw new Error(`Got non-HTML response: ${contentType}`)
    }
    const body = await url.text()
    // console.log(body)
    return body

}

export { normalizeURL, URLObject, getURLsFromHTML, crawlPage };