var addSushiButton = function(){
  setTimeout(function(){
    if (!$('.message-form textarea').length) { return; }
    if ($('#sushiyuki').length == 0){
      $('.message-form textarea').parent().append('<label id="sushiyuki" class="ember-view file-select-button btn tooltipstered"><img src="'+chrome.extension.getURL('images/btn-sushiyuki.png')+'"></label>')
      var contents = '<div id="sushi_contents" class="modal fade" tabindex="-1" role="dialog"aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Pick sushi</h4></div><div class="modal-body">'
      _.each(_.range(1, 81), function(num){
        contents += '<img class="sushi" src="https://d1zd1v0cxnbx2w.cloudfront.net/images/sets/sushiyuki/' +("0"+num).slice(-2)+ '.png">'
      });
      contents += '</div></div></div></div>'
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
  var matches = $('aside.sidebar.vertical-container.left .indented.active')[0].attr('href').match(/organization\/([^\/]+)\/room\/([^\/]+)/)
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
