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

// version #1
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
        var textStringFirst = (textStringSecond = "");

        var $textAreaInput = $target.parent().find("textarea" + component);
        $textAreaInput.val("");
        if (charsLeft < 0) {
            // add html marker for edit area
            textStringFirst = textString.substring(0, maxLength);
            textStringSecond = textString.substring(maxLength);
            editTextString =
                textStringFirst + "<span>" + textStringSecond + "</span>";
            $target.html(editTextString);
            moveCursor(event);
        }
        $textAreaInput.val(textString);
        charsLeft = maxLength - textString.length;
        var $counter = $target.parent().find("." + wrapDiv + "__counter");
        $counter.text(charsLeft);
    }

    function moveCursor(event) {
        var totaLength =
            event.currentTarget.childNodes[0].length +
            event.currentTarget.childNodes[1].firstChild.length -
            1;
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(event.currentTarget.childNodes[1], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

// version #2
function textareaHighlight(component) {
    var maxLength = 0;
    var charsLeft = 0;
    var dataAttr = "data-maxlength";
    var wrapDiv = "js-texthighlight-wrap";
    var $textArea = $(component);
    var $backdrop = $('div' + component);
    var cssArea = $textArea[0].className;

    $textArea
        .wrap('<div class="' + wrapDiv + '"></div>')
        .after('<span class="' + wrapDiv + '__counter"></span>')
        .after('<div class="' + cssArea + '"></div>');

    charsLeft = maxLength = Number($textArea.attr(dataAttr));
    $textArea
        .on({
            'change keyup keydown paste input': changeHandler,
            'scroll': handleScroll
        })
        .trigger("change");

    function changeHandler(event) {
        var textString = event.currentTarget.value;
        var $target = $(event.currentTarget);
        var textStringFirst = (textStringSecond = "");

        var $textAreaInput = $target.parent().find("div" + component);
        $textAreaInput.html('');
        if (charsLeft < 0) {
            // add html marker for edit area
            textStringFirst = textString.substring(0, maxLength);
            textStringSecond = textString.substring(maxLength);
            editTextString = textStringFirst + "<mark>" + textStringSecond + "</mark>";
            $textAreaInput.html(editTextString);
        }
        charsLeft = maxLength - textString.length;
        var $counter = $target.parent().find("." + wrapDiv + "__counter");
        $counter.text(charsLeft);
    }

    function handleScroll() {
        var scrollTop = $(component).scrollTop();
        $backdrop.scrollTop(scrollTop);
        
        var scrollLeft = $(component).scrollLeft();
        $backdrop.scrollLeft(scrollLeft);  
      }
}

$(document).ready(function() {
    // counterTextArea(".js-counter");
    // counterTextAreaHighlight(".js-counter-two");
    textareaHighlight(".js-counter-three");
});
