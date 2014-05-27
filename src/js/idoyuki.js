var addSushiButton = function(){
  setTimeout(function(){
    if ($('#sushiyuki').length == 0){
      $('.btn.attach-file-text').after('<button id="sushiyuki" class="btn">寿司</button>')
      var contents = '<div id="sushi_contents" class="modal fade" aria-hidden="true"><div class="modal-header"><button class="close" data-dismiss="modal" type="button">×</button><h3>pick sushi</h3></div><div class="modal-body">'
      _.each(_.range(1, 41), function(num){
        contents += '<img class="sushi" src="https://d1zd1v0cxnbx2w.cloudfront.net/images/sets/sushiyuki/' +("0"+num).slice(-2)+ '.png">'
      });
      contents += '</div></div>'
      $('body').append(contents)
    }
  }, 500)
}

$(function(){
  addSushiButton();
});

$(document).on('click', '.ember-view.room', function(ev){
  addSushiButton();
});

$(document).on('click', '#sushiyuki', function(ev){
  $('#sushi_contents').modal();
});

$(document).on('click', 'img.sushi', function(ev){
  $('#sushi_contents').modal('hide');
  var imageUrl = $(ev.target).attr('src');
  var matches = $('.room.active a').attr('href').match(/organization\/([^\/]+)\/room\/([^\/]+)/)
  var params = {
    organization_slug: matches[1],
    room_name:         matches[2]
  }
  $.get("https://idobata.io/api/rooms", params, function(data) {
    var roomId = data.rooms[0].id
    params = {
      'message[room_id]': roomId,
      'message[source]':  imageUrl
    }
    $.ajax({
      type: "POST",
      url:  "https://idobata.io/api/messages",
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function(msg) {
        console.log(msg);
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  });
});


// $(document).on('click', 'a[href^="#bot_"]', function(){
//   var botIdStr = $(this).attr('href');
//   if ($(botIdStr).find('.ibn-message').length == 0) {
//     $(botIdStr + ' dl').prepend('<dt>Test Message</dt><dd><input class="ibn-message" type="text" style="width: 75%;"><a class="btn pull-right ibn-message-send">Send</dd>')
//   }
// });

// $(document).on('click', 'a.ibn-message-send', function(){
//   var wrapper = $('a.ibn-message-send').parents('[id^="bot_"]')[0];
//   var apiToken = $(wrapper).find('input[readonly]').val();
//   var message  = $(wrapper).find('input.ibn-message').val();
//   if (message.length == 0) {
//     return;
//   }

//   var matches = $('.room.active a').attr('href').match(/organization\/([^\/]+)\/room\/([^\/]+)/)
//   var params = {
//     organization_slug: matches[1],
//     room_name:         matches[2]
//   }
//   $.get("https://idobata.io/api/rooms", params, function(data) {
//     var roomId = data.rooms[0].id
//     var request = {
//       params: {
//         'message[room_id]': roomId,
//         'message[source]':  message
//       },
//       apiToken: apiToken
//     }
//     $(wrapper).find('input.ibn-message').val("");
//     chrome.runtime.sendMessage(request, function(response) {
//     });
//   });
// });