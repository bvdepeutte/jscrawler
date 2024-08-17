function reportPages(pages){
    console.log('Report is starting')
    const sortedPages = pageSort(pages)
    let count
    let url
    for(const page in sortedPages){
        url = page
        count = sortedPages[page]
        console.log(`Found ${count} internal links to ${url}`)
    }
}

function pageSort(pages){
    const sortedPages = {}
    let max = -Infinity
    let maxKey
    while (Object.keys(pages).length > 0){
        for (const page in pages){
            if (pages[page] > max){
                max = pages[page]
                maxKey = page
            }
        }
        sortedPages[maxKey] = pages[maxKey]
        // console.log(`sortedPages value added is ${sortedPages[maxKey]} on key ${maxKey}`)
        delete pages[maxKey]
        max = -Infinity
    }
    return sortedPages
    
}

export {pageSort, reportPages}