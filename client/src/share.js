const domain = 'https://www.domain'
function shareToWeibo (title, route, picurl) {
  var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+domain+route+'&content=utf-8&sourceUrl='+domain+route+'&pic='+picurl
  window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100')
}

function shareToQQZone (title, route, picurl) {
  var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+title+'&url='+domain+route+'&pics='+picurl+'&summary='+title
  window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100')
}

function shareToDouban(content, route, picurl) {
  var sharedoubantring='http://shuo.douban.com/!service/share?name='+content+'&href='+domain+route+'&image='+picurl 
  window.open(sharedoubantring,'newwindow','height=100,width=100,top=100,left=100')
}

export default { shareToWeibo, shareToQQZone, shareToDouban }