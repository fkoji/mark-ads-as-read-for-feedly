chrome.storage.local.get('options', function(items) {
    var options;

    if (typeof items.options !== 'undefined') {
        options = items.options;
    } else {
        options = ['PR:', 'AD:', '[PR]'];
    }

    document.body.addEventListener("DOMNodeInserted", function(e) {
        var el = e.target;

        if (el.nodeType !== 1) return;
        if (!el.id.match(/_main$/)) return;
        if (typeof el.dataset.title === 'undefined') return;

        options.forEach(function(e) {
            if (e === '') {
                return;
            }

            if (el.dataset.title.toLowerCase().indexOf(e.toLowerCase()) === 0) {
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
