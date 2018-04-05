
const getHtml = url => fetch(url)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.text();
    })


module.exports = {getHtml}