const request = require('request');
const cheerio = require('cheerio');


request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var html_arr = body.split('</tr>')
    // var cheerio = require('cheerio'),
    //     $ = cheerio.load(body);
    // console.log($('code').html());
    // console.log(html_arr[1]);
    var $;
    var match;
    var ext
    var patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    for (var i = 0; i < html_arr.length; i++){
      $ = cheerio.load(html_arr[i]);
      match = ($('a').html()).match(patt1);
      if (match){
        ext = match[0]
      }
      console.log($('code').html() + '\t' + 'substack.net/images/' + $('a').html() + '\t' + ext);
    }
  }
  else{
    console.log(error.message);
  }
})
