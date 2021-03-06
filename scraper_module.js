const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const wstream = fs.createWriteStream('myOutput.txt');
const async = require('async');

var url = 'http://substack.net/images/';
var extension_pattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;

async.each(dive_in(url, extension_pattern), function(callback){
  wstream.close();
});


function dive_in(url, regex){
  request(url, function(error,response,body){
    if (!error && response.statusCode == 200){
      var html_arr = body.split('</tr>');
      iterate_through(html_arr, regex, url)
    } else{
      console.log(error);
    };
  });
};

function iterate_through(html_arr, regex, url){
  for (var i = 0; i < html_arr.length; i++){
    $ = cheerio.load(html_arr[i]);
    path = $('a').html();
    if (path){
      match = ($('a').html()).match(regex);
    }
    if (match){
      ext = match[0];
      wstream.write($('code').html() + '\t' + url + $('a').html() + '\t' + ext + '\n');
    }
    else if (path != '../'){
      dive_in(url + path, regex);
    }
  }
}
