const cheerio = require('cheerio')

const isMediaFire = (url) => url.includes('www.mediafire.com')

const scrapingDetail = (html) => {
    const $ = cheerio.load(html);
    return $('.defaultpost').find('a').map(function(i, element){
        return $(this).attr('href');
    }) 
}

const scrapingTitle = (html) => {
    const $ = cheerio.load(html);
    return $('tbody').map(function(i, element){
        const id = $(this).find('span').attr('id');
        const url = '/' + $(this).find('span a').attr('href');
        const title = $(this).find('span a').text();

        return url ? {id, url, title} : null
    }) 
}

const isKmdTitle = (i, {title}) => {
    return title.includes('光明頂')
}

const _getAllTitle = (html) => {
    // console.log('getAllTitle(html)[0]: ', getAllTitle(html)[0])
    // console.log('getAllTitle(html)[1]: ', getAllTitle(html)[1])
    return scrapingTitle(html).filter(isKmdTitle)
}

const getDetail = (html) => {
    const urlList = scrapingDetail(html)
    let isIncludedMediaFire = false
    let returnData = []

    if(!urlList || !urlList.length) return

    for(let i =0; i< urlList.length; i++){
        const url = urlList[i]
        if(isMediaFire(url)){
            isIncludedMediaFire = true
            returnData.push(url)
        }
    }

    if(isIncludedMediaFire) return returnData
    return null
}

module.exports = {getAllTitle : _getAllTitle, getDetail}