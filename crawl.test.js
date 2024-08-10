import { test, expect } from "@jest/globals";
import { normalizeURL, URLObject } from "./crawl.js";

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