/**
 * Created with PyCharm.
 * User: menangen
 * Date: 30.08.13
 * Time: 17:17
 * To change this template use File | Settings | File Templates.
 */
$(function() {
    // Tooltip for search input
    $('.search_form_input').tooltip({placement: "bottom"});
    // Hide Registration Div
    $("#registerDiv").hide();
    // Hide Complite Registration Div
    $("#messageRegisterDiv").hide();


    $("#register_button").click(showRegisterForm);


    //TODO: delete this
    //showRegisterForm();

    if (window.premiumparts.user && window.premiumparts.error == undefined) {
        showCompleteRegistartion();
    }

    if (window.premiumparts.error) {
        showErrorRegistartion();
    }

});

want_register_button_remove = function () {
    $(".i_want_register_button").remove();
    $(".login-div").remove();
};

showRegisterForm = function(){
    var formRegistr = $("#registerDiv");
    formRegistr.show();

    want_register_button_remove();

    $('#inputLoginName').tooltip({placement: "bottom"});
    $('#inputPassword').tooltip({placement: "bottom"});
    $('#inputFirstName').tooltip({placement: "bottom"});

};

showCompleteRegistartion = function() {
    console.log("Show Complete Form");
    want_register_button_remove();

    var formRegistr = $("#registerDiv");
    formRegistr.remove();

    var msgMainDiv = $("#messageRegisterDiv");

    msgMainDiv.find("div").addClass("complete_register_div");

    msgMainDiv.show();
};

showErrorRegistartion = function() {
    var errorHeader, errorText = "";

    console.log("Show Error Form");
    want_register_button_remove();

    if (window.premiumparts.user) {
        errorHeader = "<h1 class='text-center'>Внимание!</h1>";
        errorText = "Пользователь <span>"+ window.premiumparts.user +"</span> с таким номером телефона уже был зарегистрирован ранее.";
    }

    else {
        errorHeader = "<h1 class='text-center'>" + window.premiumparts.error + "</h1>"
    }




    var formRegistr = $("#registerDiv");
    formRegistr.remove();

    var msgMainDiv = $("#messageRegisterDiv");

    var insideMessage = msgMainDiv.find("div");
    insideMessage.addClass("error_register_div");

    insideMessage.find("h1").html(errorHeader);
    insideMessage.find("h3").html(errorText);

    msgMainDiv.show();
};