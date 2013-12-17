$('#append').click(function() {
  appendOption();
});

$('#back').click(function() {
  if (confirm('Are you sure to initialize?')) {
    $('#option_0').val('PR:');
    $('#option_1').val('AD:');
    $('#option_2').val('[PR]');
    $('.option').each(function() {
      if ($(this).parent().index() >= 3) {
        $(this).parent().remove();
      }
    });
  }
  save();
});

$('#save').click(function() {
  save();
});

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
  var $li = $('<li></li>');
  var num = $('.option').length;
  var $input = $('<input type="text">').attr('id', 'option_'+num).addClass('option');
  $li.append($input).appendTo('#options');
}

function init() {
  chrome.storage.local.get('options', function(items) {
    if (typeof items.options !== 'undefined') {
      items.options.forEach(function(e, i) {
        if ($('#option_'+i).length === 0) {
          appendOption();
        }
        $('#option_'+i).val(e);
      });
    }
  });
}

init();
