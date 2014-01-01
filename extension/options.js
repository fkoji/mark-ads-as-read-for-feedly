function save() {
  var options = []
  $('.option').each(function() {
    options.push($(this).val());
  });

  chrome.storage.local.set({options: options}, function() {
    $('#success_to_save').fadeIn(100, function() {
      setTimeout(function() {
        $('#success_to_save').fadeOut(500);
      }, 2000);
    });
  });
}

function appendOption() {
  var num = $('.option').length;
  var $input = $('<input type="text">').attr('id', 'option_'+num).addClass('option');
  $('<li></li>').append($input).appendTo('#options');
}

$('#append').click(function() {
  appendOption();
});

$('#back').click(function() {
  if (confirm('Are you sure to initialize?')) {
    initOptions();
    chrome.storage.local.clear();
  }
});

$('#save').click(function() {
  save();
});

function initOptions() {
  $('#options').empty();
  ['PR:', 'AD:', '[PR]'].forEach(function(e, i) {
    appendOption();
    $('#option_'+i).val(e);
  });
}

!function() {
  chrome.storage.local.get('options', function(items) {
    if (typeof items.options !== 'undefined') {
      items.options.forEach(function(e, i) {
        if (e == '') {
            return;
        }
        appendOption();
        $('#option_'+i).val(e);
      });
    } else {
      initOptions();
    }
  });
}();
