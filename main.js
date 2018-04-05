require('es6-promise').polyfill();
require('isomorphic-fetch');

(async() => {

    const {getHtml} = require('./lib/request')
    const {getAllTitle, getDetail} = require('./lib/kmd')
    const cheerio = require('cheerio')
    const host = 'http://www.uwants.com'

/**
 * @return
 *   [{id, title, url}]
 */
    const getKmdTitleList = async () => {
        const homeUrl = host + '/forumdisplay.php?fid=169'
        const html = await getHtml(homeUrl)
        return getAllTitle(html)
    }

    const getMp3ByDetailPage = async (titleInfor) => {
        const {id, title, url} = titleInfor
        const detailUrl = host + url
        const html = await getHtml(detailUrl)

        return getDetail(html)
    }


    const kmdTitleList = await getKmdTitleList()

    for(let i =0 ; i< kmdTitleList.length; i++){
        const titleInfor = kmdTitleList[i]
        
        const detailUrl = await getMp3ByDetailPage(titleInfor)

        console.log('i: ', i)

        if (!detailUrl || !detailUrl.length) { continue }
        for(let j =0 ; j< detailUrl.length; j++){
            const url = detailUrl[j]
            console.log('   url: ', url)
        }
    }

})()