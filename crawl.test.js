import { test, expect } from "@jest/globals";
import { normalizeURL, URLObject, getURLsFromHTML } from "./crawl.js";

test('URL Object',() =>{
    let url = URLObject('https://www.deepl.com/fr/translator#en/fr/Stub%20out%20the%20function')
    expect(url).toBeInstanceOf(URL);
})

test('Not URL Object', () => {
    // The expect block should directly wrap the function that may throw the error.
    expect(() => {
        URLObject('mailto:bvandepeutte@emasphere.com');
    }).toThrow('Invalid URL');
});

test('Normalize URL', () =>{
    const url = normalizeURL(URLObject('https://www.deepl.com/fr/translator#en/fr/Stub%20out%20the%20function'))
    expect(url).toBe('www.deepl.com/fr/translator')
})

test('Normalize URL 2', () =>{
    const url = normalizeURL(URLObject('https://www.deepl.com/fr/translator/'))
    expect(url).toBe('www.deepl.com/fr/translator')
})

test('Get all url anchor', () =>{

    const exampleHtmlBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample Page with Links</title>
    </head>
    <body>
    
        <h1>Welcome to the Sample Page</h1>
        <p>This is a sample webpage with multiple links to different websites.</p>
    
        <ul>
            <li><a href="https://www.fakesite1.com">Fake Site 1</a></li>
            <li><a href="https://www.fake-news-today.com">Fake News Today</a></li>
            <li><a href="https://www.example-fakestore.com">Example Fake Store</a></li>
            <li><a href="https://www.fakebloggershub.net">Fake Blogger's Hub</a></li>
            <li><a href="https://www.madeupmoviesreviews.org">Made Up Movie Reviews</a></li>
            <li><a href="https://www.invented-tech-news.com">Invented Tech News</a></li>
            <li><a href="https://www.fictitiousrecipes.com">Fictitious Recipes</a></li>
            <li><a href="https://www.fakeeducationportal.edu">Fake Education Portal</a></li>
            <li><a href="https://www.notreal-socialmedia.com">Not Real Social Media</a></li>
            <li><a href="https://www.fakevideostreaming.tv">Fake Video Streaming</a></li>
        </ul>
    
    </body>
    </html>`
    const tovalidateArray = getURLsFromHTML(exampleHtmlBody, 'https://www.bootdev.com')
    const validationArray = [
        "https://www.fakesite1.com/",
        "https://www.fake-news-today.com/",
        "https://www.example-fakestore.com/",
        "https://www.fakebloggershub.net/",
        "https://www.madeupmoviesreviews.org/",
        "https://www.invented-tech-news.com/",
        "https://www.fictitiousrecipes.com/",
        "https://www.fakeeducationportal.edu/",
        "https://www.notreal-socialmedia.com/",
        "https://www.fakevideostreaming.tv/"]
    expect(tovalidateArray).toStrictEqual(validationArray)
})

test('Get all relative url anchor', () =>{

    const exampleHtmlBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample Page with Links</title>
    </head>
    <body>
    
        <h1>Welcome to the Sample Page</h1>
        <p>This is a sample webpage with multiple links to different websites.</p>
    
        <ul>
            <li><a href="https://www.fakesite1.com">Fake Site 1</a></li>
            <li><a href="https://www.fake-news-today.com">Fake News Today</a></li>
            <li><a href="/xyz.html">Example Fake Store</a></li>
            <li><a href="../images/logo.png">Fake Blogger's Hub</a></li>
        </ul>
    
    </body>
    </html>`
    const tovalidateArray = getURLsFromHTML(exampleHtmlBody, 'https://www.fakesite1.com')
    const validationArray = [
        "https://www.fakesite1.com/",
        "https://www.fake-news-today.com/",
        "https://www.fakesite1.com/xyz.html",
        "https://www.fakesite1.com/images/logo.png"
    ]
    expect(tovalidateArray).toStrictEqual(validationArray)
})
