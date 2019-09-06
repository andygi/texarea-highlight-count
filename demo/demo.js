function counterTextArea(component) {
    var maxLength = 0;
    var charsLeft = 0;

    var $textArea;

    $textArea = $(component);
    charsLeft = maxLength = Number($textArea.attr("maxlength"));
    $(document)
        .on("change keyup keydown paste", component, changeHandler)
        .trigger("change");

    function changeHandler(event) {
        var $target = $(event.currentTarget);
        charsLeft = maxLength - $target.val().length;
        var $counter = $target.parent().find(component + "__counter");
        $counter.text(charsLeft);
    }
}

function counterTextAreaHighlight(component) {
    var maxLength = 0;
    var charsLeft = 0;
    var dataAttr = "data-maxlength";
    var wrapDiv = "textarea-wrap";
    var $textArea = $(component);
    var editArea = "div" + component;
    var cssArea = $textArea[0].className;

    $textArea
        .wrap('<div class="' + wrapDiv + '"></div>')
        .after('<span class="' + wrapDiv + '__counter"></span>')
        .after('<div class="' + cssArea + '" contenteditable="true"></div>');

    charsLeft = maxLength = Number($textArea.attr(dataAttr));
    $(document)
        .on("change keyup keydown paste", editArea, changeHandler)
        .trigger("change");

    function changeHandler(event) {
        var textString = event.currentTarget.textContent;
        var $target = $(event.currentTarget);
        var textStringFirst = textStringSecond = '';
        var cursorPosition;

        var $textAreaInput = $target.parent().find("textarea" + component);
        $textAreaInput.val("");
        if (charsLeft < 0) {
            // add html marker for edit area
            textStringFirst = textString.substring(0,maxLength);
            textStringSecond = textString.substring(maxLength);
            editTextString = textStringFirst + '<span>' + textStringSecond + '</span>';
            $target.html(editTextString);
            moveCursor(event);
        }
        $textAreaInput.val(textString);
        charsLeft = maxLength - textString.length;
        var $counter = $target.parent().find('.' + wrapDiv + "__counter");
        $counter.text(charsLeft);
        console.log(event);
    }
    
    function moveCursor(event) {
        var totaLength = (event.currentTarget.childNodes[0].length + event.currentTarget.childNodes[1].firstChild.length) - 1;
        var range = document.createRange();
        var sel = window.getSelection();
        console.log('moveCursor', totaLength);
        range.setStart(event.currentTarget.childNodes[1], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

counterTextArea(".js-counter");
counterTextAreaHighlight(".js-counter-two");
