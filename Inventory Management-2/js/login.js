/*    Ramya Krishna Dalapathirao    Account:  jadrn007
        CS645, Spring 2015
        Project #1
*/
var err_uname = false,
    err_pswd = false;
var empty_uname = "Please enter your username";
var empty_pswd = "Please enter your Password";
$(document).ready(function() {
    $('[name="username"]').focus();
    $('[name="hiddenfield"]').val(Math.floor((Math.random() * 100) + 1));
    $('[name="username"]').on("blur", chkuname);
    $('[name="password"]').on("blur", chkpswd);
    $(':submit').on("click", function(event) {
        if (!validate_form())
            event.preventDefault();
    });
    $(':reset').on("click", function() {
        $('input').removeClass("chgborder");
        $('div.error').html("");
        $('[name="username"]').focus();
    });

});

function chkuname() {
    var uname = $.trim($('[name="username"]').val());
    if (uname != "" && err_uname) {
        $('div.error').html("");
        $('[name="username"]').removeClass("chgborder");
        err_uname = false;
    }

}

function chkpswd() {
    var pswd = $.trim($('[name="password"]').val());
    if (pswd != "" && err_pswd) {
        $('div.error').html("");
        $('[name="password"]').removeClass("chgborder");
        err_pswd = false;
    }

}

function validate_form() {
    var uname = $.trim($('[name="username"]').val());
    var pswd = $.trim($('[name="password"]').val());
    if (uname == "") {
        $('div.error').html(empty_uname);
        $('[name="username"]').focus();
        $('[name="username"]').addClass("chgborder");
        err_uname = true;
        return false;
    }

    if (pswd == "") {
        $('div.error').html(empty_pswd);
        $('[name="password"]').focus();
        $('[name="password"]').addClass("chgborder");
        err_pswd = true;
        return false;

    }

    return true;
}