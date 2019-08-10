var url_params = window.location.search;
var params = url_params.replace('?', '')
var params = params.split('&')
var ary = []
for(i in params){
    var split = params[i].split('=')
    ary[split[0]] = decodeURIComponent(split[1])
}