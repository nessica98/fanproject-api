const check_url = (url) => {
    if(typeof url !== "string"){
        return
    }
    var reg = new RegExp('local://profile/*');
    if(url.match(reg)){
        console.log('local pic')
        var new_url = url.replace(reg,'http://localhost:5000/profile/')
        console.log(new_url)
        return new_url
    }else{
        console.log('outside url')
        return url
    }
}
module.exports = check_url
