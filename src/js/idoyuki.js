var addSushiButton = function(){
  setTimeout(function(){
    if (!$('.message-form textarea').length) { return; }
    if ($('#sushiyuki').length == 0){
      if ($('#app')[0]) {
        $('.message-form textarea').parent().append('<label id="sushiyuki" class="ember-view file-select-button btn tooltipstered"><img src="'+chrome.extension.getURL('images/btn-sushiyuki-black.png')+'"></label>')
      } else {
        $('.message-form textarea').before('<button id="sushiyuki" class="btn attach-file-text"><img src="'+chrome.extension.getURL('images/btn-sushiyuki.png')+'"></button>')
      }
      var contents = '<div id="sushi_contents" class="modal fade" aria-hidden="true" style="display: none;"><div class="modal-header"><button class="close" data-dismiss="modal" type="button">×</button><h3>pick sushi</h3></div><div class="modal-body">'
      _.each(_.range(1, 81), function(num){
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

$(document).on('click', '.ember-view.room, .ember-view.indented, .message-form textarea', function(ev){
  addSushiButton();
});

$(document).on('click', '#sushiyuki', function(ev){
  ev.preventDefault();
  $('#sushi_contents').modal();
});

$(document).on('click', 'img.sushi', function(ev){
  $('#sushi_contents').modal('hide');
  var imageUrl = $(ev.target).attr('src');
  var matches = $(
    $('.primary-sidebar a.active')[0] ||
    $('aside.sidebar.vertical-container.left .indented.active')[0]
  ).attr('href').match(/organization\/([^\/]+)\/room\/([^\/]+)/)
  var params = {
    organization_slug: matches[1],
    room_name:         matches[2]
  }
  $.get(location.protocol + '//' + location.host + '/api/rooms', params, function(data) {
    var roomId = data.rooms[0].id
    params = {
      'message[room_id]': roomId,
      'message[source]':  imageUrl
    }
    $.ajax({
      type: "POST",
      url:  location.protocol + '//' + location.host + '/api/messages',
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
