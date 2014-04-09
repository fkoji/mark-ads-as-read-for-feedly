chrome.storage.local.get(['options', 'positions'], function(items) {
    var options
      , positions;

    if (typeof items.options !== 'undefined') {
        options = items.options;
    } else {
        options = ['PR:', 'AD:', '[PR]'];
    }

    if (typeof items.positions !== 'undefined') {
        positions = items.positions;
    } else {
        positions = [];
        if (typeof items.options !== 'undefined') {
            items.options.forEach(function() {
                positions.push(0);
            });
        } else {
            positions = [0, 0, 0];
        }
    }

    console.log(options);
    console.log(positions);

    document.body.addEventListener("DOMNodeInserted", function(e) {
        var el = e.target;

        if (el.nodeType !== 1) return;
        if (!el.id.match(/_main$/)) return;
        if (typeof el.dataset.title === 'undefined') return;

        options.forEach(function(e, i) {
            if (e === '') {
                return;
            }

            if ((positions[i] === 0 && el.dataset.title.toLowerCase().indexOf(e.toLowerCase()) === 0) ||
                (positions[i] === 1 && el.dataset.title.toLowerCase().indexOf(e.toLowerCase()) !== -1)) {
                var event = el.ownerDocument.createEvent("MouseEvents");
                event.initMouseEvent("click", true, true,
                                     el.ownerDocument.defaultView,
                                     1, 0, 0, 0, 0,
                                     false, false, false, false,
                                     0, null);
                el.dispatchEvent(event);
   
                var inlineFlameId = el.id.replace(/_main_abstract$/, '_inlineframe');
                document.getElementById(inlineFlameId).style.display = 'none';
            }

        });
    }, false);
});
