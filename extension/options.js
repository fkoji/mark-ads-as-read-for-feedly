/**
 * save settings to storage
 */
function save() {
    var options = [];
    $('.option').each(function() {
        options.push($(this).val());
    });

    var positions = [];
    $('.position').each(function() {
        // be number
        positions.push($(this).val() * 1);
    });

    chrome.storage.local.set({
        options: options,
        positions: positions
    }, function() {
        $('#success_to_save').fadeIn(100, function() {
            setTimeout(function() {
            $('#success_to_save').fadeOut(500);
        }, 2000);
        });
    });
}

/**
 * create select menu
 */
function createSelectMenu(num) {
    var $select = $('<select class="position"></select>').attr('id', 'position_'+num);

    var positions = [
        {text: 'start with', value: 0},
        {text: 'include', value: 1}
    ].forEach(function(el) {
        $('<option></option>').val(el.value).text(el.text).appendTo($select);
    });

    return $select;
}

/**
 * add option
 */
function addOptionToList() {
    var num = $('.option').length;
    var $input = $('<input type="text">').attr('id', 'option_'+num).addClass('option');
    $('<li></li>')
        .append($input)
        .append(createSelectMenu(num))
        .appendTo('#options');
}

$('#append').click(function() {
    addOptionToList();
});

$('#revert').click(function() {
    if (confirm('Are you sure to initialize?')) {
        initOptions();
        chrome.storage.local.clear();
    }
});

$('#save').click(function() {
    save();
});

/**
 * initialize
 */
function initOptions() {
    $('#options').empty();
    ['PR:', 'AD:', '[PR]'].forEach(function(e, i) {
        addOptionToList();
        $('#option_'+i).val(e);
    });
}

!function() {
    chrome.storage.local.get(function(items) {
        if (typeof items.options !== 'undefined') {
            items.options.forEach(function(e, i) {
                if (e == '') {
                    return;
                }
                addOptionToList();
                $('#option_'+i).val(e);
            });

            if (typeof items.positions !== 'undefined') {
                items.positions.forEach(function(e, i) {
                    $('#position_'+i).val(e);
                });
            }
        } else {
            initOptions();
        }
    });
}();
