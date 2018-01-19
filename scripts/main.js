$(document).ready(function () {
    // close accordion
    function close_accordion() {
        $(".card-head")
            .removeClass("active")

        $(".card-body").slideUp(300)
            .removeClass("open")
    }

    // get data and
    // pass it to accordion
    $.getJSON("faqs.json")
        .then(function (result) {
            var dataLength = result.faqs.length,
                cardBody = $(".card-body"),
                cardHead = $(".card-head")

            for (var i = 0; i < dataLength; i++) {

                cardHead.each(function (i, elem) {
                    $(this).text("Q: " + result.faqs[i].question)
                })

                cardBody.each(function (i, elem) {
                    $(this).text(result.faqs[i].answer)
                })

            }

            console.log("Status code: " + result.info.responseCode)
            console.log("Response: " + result.info.responseMsg)
        })
        .fail(function () {
            $(".no-response").css({
                display: "block"
            });

            $(".has-response").css({
                display: "none"
            });
        })

    // process open-close accordion 
    $(".card-head").on("click", function (evt) {
        var cardToOpen = $(this)
            .attr("data-body")

        // process swap between [+] and [-]
        $("#opened")
            .removeClass("close-mark")
            .attr("id", "")

        $(this)
            .next()
            .addClass("close-mark")

        $(this)
            .next()
            .attr("id", "opened")

        if ($(evt.target).hasClass("active")) {
            close_accordion()

            $(this)
                .next()
                .toggleClass("close-mark")
        } else {
            close_accordion()

            $(this)
                .addClass("active")

            $(cardToOpen)
                .slideDown(300)
                .addClass('open')
        }
    })
})