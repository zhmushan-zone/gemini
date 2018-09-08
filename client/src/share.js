function shareToWeibo (title, url, picurl) {
  var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl
  window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100')
}

function shareToQQZone (title, url, picurl) {
  var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picurl
  window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100')
}

function shareToDouban(content, url, picurl) {
  var shareqqstring='http://shuo.douban.com/!service/share?name='+content+'&href='+url+'&image='+picurl 
  window.open(shareqqstring,'newwindow','height=100,width=100,top=100,left=100')
}

export default { shareToWeibo, shareToQQZone, shareToDouban }