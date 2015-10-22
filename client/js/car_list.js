'use strict';

$(function() {

  $('.del').click(function(event) {
    console.log(event);
    var target = $(event.target);
    var id = target.data('id');
    var tr = $('.item-id-' + id);
    console.log(id);



  })


})
