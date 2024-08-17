import { crawlPage } from "./crawl.js";
import { reportPages } from "./report.js";

async function main() {
    const args = process.argv
    let pages
    if (args.length < 3){
        console.log("Error: Not enough arguments")
        return
    }
    else if (args.length > 3){
        console.log("Error: too many arguments")
        return
    }
    else{
        console.log(`Crawler has start based on the following URL: ${args[2]}`)
    pages = await crawlPage(args[2])
    console.log(pages)
    }

    reportPages(pages)


}

main()