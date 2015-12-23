
/*    Ramya Krishna Dalapathirao    Account:  jadrn007
        CS645, Spring 2015
        Project #1
*/

/*************  Variables Declaration ******/
var err_sku = false,err_editsku = false,err_deletesku = false,err_cost = false,err_retail = false,err_photo = false,
    load_category = 0,load_vendor = 0,response_received = 0,err_editcost = false,err_editretail = false,
    edit_submit_clicked = 0,delete_submit_clicked = 0;
var empty_sku = "Please enter SKU",empty_category = "Please choose a category",empty_vendor = "Please choose a vendor",
    empty_identifier = "Please enter the manufacturer's identifier",empty_description = "Please enter the product's description",
    empty_features = "Please enter the product features",empty_cost = "Please enter the cost of the product",
    empty_retail = "Please enter the retail of the product",empty_photo = "Please upload the item's photo";
    invalid_sku = "The SKU format is invalid. Sample format:(ABC-123)", invalid_cost = "The value entered in cost field is not valid. Please enter a positive number with two decimal digits",
    invalid_retail = "The value entered in retail field is not valid. Please enter a positive number with two decimal digits",
    dup_sku = "Duplicate sku. Item already exists in inventory", no_sku = "The sku entered does not exist";

$("document").ready(function() {
    
    categories_array = new Array();
    vendors_array = new Array();
    manageTabs();
    $("a#edit").on("click", manageEdit);
    $("a#delete").on("click", manageDelete);
    $("#add").on("click", manageAdd);
    $(".busy_wait").css("display", "none");
    $("input[name='sku']").focus();
    $("input[name='sku']").on("keyup", upper);
    $("input[name='editsku']").on("keyup", upper);
    $("input[name='deletesku']").on("keyup", upper);

    //Fetch category and vendor information
    var cat_ven_request = new HttpRequest('/perl/jadrn007/get_cat_ven.cgi', getData);
    cat_ven_request.send();
    //*****************************************************
    //Add form feilds validation
    $("input[name='sku']").on("blur", chkDupSku);
    $("select[name='category']").on("blur", chkCategory);
    $("select[name='vendor']").on("blur", chkVendor);
    $("input[name='identifier']").on("blur", chkIdentifier);
    $("textarea[name='description']").on("blur", chkDescription);
    $("textarea[name='features']").on("blur", chkFeatures);
    $("input[name='cost']").on("blur", chkCost);
    $("input[name='retail']").on("blur", chkRetail);
    $("input[name='photo']").on("change", chkPhoto);

    //*****************************************************
    //Edit feilds validation
    $("input[name='editsku']").on("blur", chkEditDupSku);
    $("input[name='getsku']").on("click", getEditDetails);
    $("input[name='editformbutton']").on("click", submitEditDetails);
    $("select[name='editcategory']").on("blur", chkEditCategory);
    $("select[name='editvendor']").on("blur", chkEditVendor);
    $("input[name='editidentifier']").on("blur", chkEditIdentifier);
    $("textarea[name='editdescription']").on("blur", chkEditDescription);
    $("textarea[name='editfeatures']").on("blur", chkEditFeatures);
    $("input[name='editcost']").on("blur", chkEditCost);
    $("input[name='editretail']").on("blur", chkEditRetail);
    
    //********************************************************
    //Delete feilds validation
    $("input[name='deletesku']").on("blur", chkDeleteDupSku);
    $("input[name='findsku']").on("click", deleteSku);
    $("input[name='deleteformbutton']").on("click", confirmDelete);
    $("input[name='canceldelete']").on("click", cancelDelete);
    //******************************************************

    //Add form submit handler
    $("#additem form").submit(function(event) {
        //alert("submit clicked");
        $(":input").removeClass("chgborder");
        $("label").removeClass("chgborder");
        $("#adderror").html("");
        $("#addItemSuccessMessage").css("display", "none");
        $("#addItemFailureMessage").css("display", "none");
        if (!validateForm()) {
            event.preventDefault();
            return;
        } else {
            event.preventDefault();	
            chkDupSubmitSku();
             
        }
});
    $(":reset").on('click', reset);
});

// Turn sku to upper case
function upper() {
    $(this).val($(this).val().toUpperCase());
    if ($(this).val().length == 3) {
        $(this).val($(this).val() + "-");
    }
}

function reset() {
    $(":input").removeClass("chgborder");
    $("label").removeClass("chgborder");
    $(".error").html("");
    $("input[name='sku']").focus();
}

function processUpload() {
    //alert("process upload");
    $("#add_busy_pic").css("display", "block");
    send_file(); // picture upload takes longer, get it going
}
//insert add form data into database through ajax get
function send_form_data() {
    var x=$("[name='sku']").val()
    var params = "sku=" + $("[name='sku']").val() +
        "&category=" + $("[name='category']").val() +
        "&vendor=" + $("[name='vendor']").val() +
        "&identifier=" + $("[name='identifier']").val() +
        "&description=" + $("[name='description']").val() +
        "&features=" + $("[name='features']").val() +
        "&cost=" + $("[name='cost']").val() +
        "&retail=" + $("[name='retail']").val() +
        "&image=" + $("[name='photo']").val();
    params = encodeURI(params);
    var req = new HttpRequest('process_add.cgi?' + params,
        handleAdd);
    req.send();
}
//Handler for processing insert
function handleAdd(response) {
    $("#add_busy_pic").css("display", "none");
    if ($.trim(response) == "OK") 
    {
        // alert(response);
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $("#addItemSuccessMessage").css("display", "block");
        $("#addItemSuccessMessage").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' /> The item with sku \'" + $("[name='sku']").val() + "\' has been added to the inventory");
        $("#addItemSuccessMessage").css("border", "2px solid green");
        $("#additem form#add").get(0).reset();
        $("input[name='sku']").focus();
    } 
    else if ($.trim(response) == "LOGOUT") {
        redirect();
    } 
    else {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $("#addItemSuccessMessage").html("");
        $("#addItemFailureMessage").css("display", "block").html("Sorry,An error has been encoutered");
    }
}
//upload picture
function send_file() {
    $("#add_busy_pic").css("display", "block");
    var form_data = new FormData($('form')[0]);
    form_data.append("image", ($("input[name='photo']"))[0].files[0]);
    $.ajax({
        url: "/perl/jadrn007/upload.cgi",
        type: "post",
        data: form_data,
        processData: false,
        contentType: false,
        success: function(response) {
            send_form_data();
        },
        error: function(response) {
            $("#add_busy_pic").css("display", "none");
            $('#addItemFailureMessage').css("display", "block").html("Sorry, an upload error occurred, " + response.statusText);
        }
    });
}
//Check for duplicat sku
function chkDupSku() {

    if ($.trim($("input[name='sku']").val()) != "" && chkSku()) {
        var req = new HttpRequest('check_dup_sku.cgi?' + "sku=" + $("[name='sku']").val(),
            check_dup_sku);
        req.send();
    } else {
        if($.trim($("input[name='sku']").val()) == "")
        {
                $("#adderror").html("");
                $("input[name='sku']").removeClass("chgborder");
        }   
        return;
    }

}

function check_dup_sku(response) {
    if ($.trim(response) == "DUP") {
        $("#adderror").html(dup_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        return false;

    } else if ($.trim(response) == "LOGOUT") {
        redirect();
    } else {      
        $("#adderror").html("");
        $("input[name='sku']").removeClass("chgborder");
        return true;
    }
}

/**********************/

function chkDupSubmitSku() {
    //alert("inside check dup");
    if ($.trim($("input[name='sku']").val()) != "" && chkSku()) {
        //alert("inside");
        var req = new HttpRequest('check_dup_sku.cgi?' + "sku=" + $("[name='sku']").val(),
            check_dup_submit_sku);
        req.send();
    } else {
              if($.trim($("input[name='sku']").val()) == "")
              {
                $("#adderror").html("");
                $("input[name='sku']").removeClass("chgborder");
              }   
        return;
    }

}

function check_dup_submit_sku(response) {
    //alert(response);
    if ($.trim(response) == "DUP") {
        $("#adderror").html(dup_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        return false;

    } else if ($.trim(response) == "LOGOUT") {
        redirect();
    } 
    else {
          processUpload();
          
        }
            
        $("#adderror").html("");
        $("input[name='sku']").removeClass("chgborder");
        return true;
    }



/*************Add form validation *****************/
function chkSku() {
    var sku = $.trim($("input[name='sku']").val());
    if (sku != "" && !validateSku(sku)) {
        $("#adderror").html(invalid_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        return false;
    } else {
        if (err_sku) {
            $("input[name='sku']").removeClass("chgborder");
            var error = $("#adderror").text();
            if (error == empty_sku || error == invalid_sku || error == dup_sku) {
                $("#adderror").html("");
                $("input[name='sku']").removeClass("chgborder");
            }
            err_sku = false;

        }

        return true;
    }
}

function validateSku(sku) {
    if ((/^[A-Z]{3}-[0-9]{3}$/).test(sku)) {
        return true;
    }
    return false;
}

function chkCategory() {
    if ($.trim($("select[name='category']").val()) != "None") {
        $("#adderror").html("");
        $("select[name='category']").removeClass("chgborder");
    }
}

function chkVendor() {
    if ($.trim($("select[name='vendor']").val()) != "None") {
        $("#adderror").html("");
        $("select[name='vendor']").removeClass("chgborder");
    }
}

function chkIdentifier() {
    if ($.trim($("input[name='identifier']").val()) != "") {
        $("#adderror").html("");
        $("input[name='identifier']").removeClass("chgborder");
    }
}

function chkDescription() {
    if ($.trim($("textarea[name='description']").val()) != "") {
        $("#adderror").html("");
        $("textarea[name='description']").removeClass("chgborder");
    }
}

function chkFeatures() {
    if ($.trim($("textarea[name='features']").val()) != "") {
        $("#adderror").html("");
        $("textarea[name='features']").removeClass("chgborder");
    }
}

function chkCost() {
    var cost = $.trim($("input[name='cost']").val());
    if (cost != "" && !validAmount(cost)) {
        $("#adderror").html(invalid_cost);
        $("input[name='cost']").addClass("chgborder");
        err_cost = true;
        return false;
    } else {
        if (err_cost) {
            $("input[name='cost']").removeClass("chgborder");
            var error = $("#adderror").text();
            if (error == empty_cost || error == invalid_cost) {
                $("#adderror").html("");
            }
            err_cost == false;
        }
        return true;
    }

}

function chkRetail() {
    var retail = $.trim($("input[name='retail']").val());
    if (retail != "" && !validAmount(retail)) {
        $("#adderror").html(invalid_retail);
        $("input[name='retail']").addClass("chgborder");
        err_retail = true;
        return false;
    } else {
        if (err_retail) {
            $("input[name='retail']").removeClass("chgborder");
            var error = $("#adderror").text();
            if (error == empty_retail || error == invalid_retail) {
                $("#adderror").html("");
            }
            err_retail == false;
        }
        return true;
    }
}

function validAmount(amount) {
    if ((/^[0-9]+(\.[0-9]{1,2})?$/).test(amount)) {
        return true;
    }
    return false;

}
function chkPhoto() {
    if ($("input[name='photo']").val() != "") {
        if (err_photo) {
            $("input[name='photo']").removeClass("chgborder");
            var error = $("#adderror").text();
            if (error == empty_photo) {
                $("#adderror").html("");
            }
            err_photo = false;
        }
    }
}

function validateForm() {
    var SKU = $.trim($("input[name='sku']").val());
    var category = $.trim($("select[name='category']").val());
    var vendor = $.trim($("select[name='vendor']").val());
    var identifier = $.trim($("input[name='identifier']").val());
    var description = $.trim($("textarea[name='description']").val());
    var features = $.trim($("textarea[name='features']").val());
    var COST = $.trim($("input[name='cost']").val());
    var RETAIL = $.trim($("input[name='retail']").val());
    var photo = $.trim($("input[name='photo']").val());
    if (SKU == "") {
        $("input[name='sku']").focus();
        $("#adderror").html(empty_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        return false;
    }
    if (category == "None") {
        $("#adderror").html(empty_category);
        $("select[name='category']").addClass("chgborder");
        $("select[name='category']").focus();
        return false;
    }
    if (vendor == "None") {
        $("#adderror").html(empty_vendor);
        $("select[name='vendor']").addClass("chgborder");
        $("select[name='vendor']").focus();
        return false;
    }
    if (identifier == "") {
        $("input[name='identifier']").focus();
        $("#adderror").html(empty_identifier);
        $("input[name='identifier']").addClass("chgborder");
        //err_identifier=true;
        return false;
    }
    if (description == "") {
        $("textarea[name='description']").focus();
        $("#adderror").html(empty_description);
        $("textarea[name='description']").addClass("chgborder");
        //err_description=true;
        return false;

    }
    if (features == "") {
        $("textarea[name='features']").focus();
        $("#adderror").html(empty_features);
        $("textarea[name='features']").addClass("chgborder");
        //err_features=true;
        return false;

    }
    if (COST == "") {
        $("input[name='cost']").focus();
        $("#adderror").html(empty_cost);
        $("input[name='cost']").addClass("chgborder");
        err_cost = true;
        return false;
    }
    if (!chkCost()) {
        return false;
    }
    if (RETAIL == "") {
        $("input[name='retail']").focus();
        $("#adderror").html(empty_retail);
        $("input[name='retail']").addClass("chgborder");
        err_retail = true;
        return false;
    }
    if (!chkRetail()) {
        return false;
    }
    if (photo == "") {
        $("input[name='photo']").focus();
        $("#adderror").html(empty_photo);
        $("input[name='photo']").addClass("chgborder");
        err_photo = true;
        return false;
    }
    return true;
}

function manageTabs() {
    $("#addItemSuccessMessage").css("display", "none");
    $("#addItemFailureMessage").css("display", "none");
    $("a#add").addClass("active");
    $("a#add").css("border-top", "4px solid green");
    $("a#edit").removeClass("active");
    $("a#delete").removeClass("active");
    $("#additem").css("display", "block");
    $("#edititem").css("display", "none");
    $("#deleteitem").css("display", "none");

}

function manageAdd() {
    $("#addItemSuccessMessage").css("display", "none");
    $("#addItemFailureMessage").css("display", "none");
    /*refreshing add item form */
    $("#additem form#add").get(0).reset();
    reset();
    setTimeout(function() {
        $("input[name='sku']").focus();
    });
    $("a#add").addClass("active");
    $("a#add").css("border-top", "4px solid green");
    $("a#edit").removeClass("active");
    $("a#edit").css("border", "none");
    $("a#delete").css("border", "none");
    $("a#delete").removeClass("active");
    $("#additem").css("display", "block");
    $("#edititem").css("display", "none");
    $("#deleteitem").css("display", "none");
}
//Handler for fetching category and vendor
function getData(response) {
        if ($.trim(response) == "LOGOUT") {
            redirect();
        }
        var result_array = response.split('&');
        categories_array = result_array[0].split('|');
        vendors_array = result_array[1].split('|');
        loadCategories($('[name="category"]'));
        loadVendors($('[name="vendor"]'));

    }
function loadCategories(selectCategory) {
        // alert("inside loadCategory");
        selectCategory.empty().append('<option id="None" value="None">Select Category</option>');
        for (var i = 0; i < categories_array.length; i++) {
            var category = categories_array[i];
            var newOption = $('<option>');
            newOption.attr('value', category).text(category);
            selectCategory.append(newOption);
        }
    }
function loadVendors(selectvendor) {
    selectvendor.empty().append('<option id="None" value="None">Select Vendor</option>');
    for (var i = 0; i < vendors_array.length; i++) {
        var vendor = vendors_array[i];
        var newOption = $('<option>');
        newOption.attr('value', vendor).text(vendor);
        selectvendor.append(newOption);
    }
}

function redirect() {
        window.location.href = "/~jadrn007/proj1/error.html";
        return false;
    }
//***************************************************************
//edit functions
function manageEdit() {
    $("#edit_busy_pic").css("display", "none");
    setTimeout(function() {
        $("input[name='editsku']").focus();
    });
    $("input[name='editsku']").val("");

    $("a#edit").addClass("active");
    $(":input").removeClass("chgborder");
    $("#editerror").html("");
    $("#hideedit").hide();
    $("#editItemSuccessMessage").css("display", "none");
    $("#editItemFailureMessage").css("display", "none");
    $("a#edit").css("border-top", "4px solid #3A9FE5");
    $("a#add").removeClass("active");
    $("a#delete").removeClass("active");
    $("a#add").css("border", "none");
    $("a#delete").css("border", "none");
    $("#edititem").css("display", "block");
    $("#additem").css("display", "none");
    $("#deleteitem").css("display", "none");
}

function chkEditSku() {
    var sku = $.trim($("input[name='editsku']").val());
    if (sku != "" && !validateSku(sku)) {
        $("#editerror").html(invalid_sku);
        $("input[name='editsku']").addClass("chgborder");
        err_editsku = true;
        return false;
    } else {
        if (err_editsku) {
            $("input[name='editsku']").removeClass("chgborder");
            var error = $("#editerror").text();
            if (error == empty_sku || error == invalid_sku || error == no_sku) {
                $("#editerror").html("");
            }
            err_editsku = false;

        }
        return true;
    }
}

function getEditDetails() {
    $("#editItemSuccessMessage").css("display", "none");
    $("#editItemFailureMessage").css("display", "none");
    $(":input").removeClass("chgborder");
    $("label").removeClass("chgborder");
    $(".error").html("");
    $("#hideedit").hide();
    var SKU = $.trim($("input[name='editsku']").val());
    if (SKU == "") {
        $("input[name='editsku']").focus();
        $("#editerror").html(empty_sku);
        $("input[name='editsku']").addClass("chgborder");
        err_editsku = true;
        return false;
    }
    if (chkEditSku()) {
        edit_submit_clicked = 1;
        chkEditDupSku();
    }
}
//check for duplicate sku
function chkEditDupSku() {
    if ($.trim($("input[name='editsku']").val()) != "" && chkEditSku()) {
        var req = new HttpRequest('check_dup_sku.cgi?' + "sku=" + $("[name='editsku']").val(),
            check_edit_dup_sku);
        req.send();

    } else {
        return;
    }
}

function check_edit_dup_sku(response) {
    if ($.trim(response) == "LOGOUT") {
        redirect();
    } else if (!(response == "DUP")) {
        $("#editerror").html(no_sku);
        err_editsku = true;
    } else {

        $("#editerror").html("");
        if (edit_submit_clicked == 1) {
            edit_submit_clicked = 0;
            $("#hideedit").show();
            $("input[name='retrievedsku']").prop('readonly', true);
            loadCategories($('[name="editcategory"]'));
            loadVendors($('[name="editvendor"]'));
            var req = new HttpRequest('retrieve_edit_details.cgi?' + "sku=" + $("[name='editsku']").val(),
                retrieveEditDetails);
            req.send();
        }
    }

}
//fill the form with retrieved details from database
function retrieveEditDetails(response) {

    if ($.trim(response) == "LOGOUT") {
        redirect();
    } else {
        var edit_result = new Array();
        edit_result = response.split('|');
        $("input[name='retrievedsku']").attr("value", edit_result[0]);
        $("select[name='editcategory']").val(edit_result[1]);
        $("select[name='editvendor']").val(edit_result[2]);
        $("input[name='editidentifier']").val(edit_result[3]);
        $("[name='editdescription']").val(edit_result[4]);
        $("[name='editfeatures']").val(edit_result[5]);
        $("input[name='editcost']").val(edit_result[6]);
        $("input[name='editretail']").val(edit_result[7]);
        $("input[name='hiddenphoto']").val(edit_result[8]);
        $("[name='editphoto']").val("");
        var img = "<img src='/~jadrn007/proj1/up_imgs/" + edit_result[8] + "' alt='image' width='200' />";
        $("#displaypic").html("<figure><figcaption>Item image</figcaption>" + img + "</figure>");
    }
}
//edit form feilds validation
function validateEditForm() {

    var category = $.trim($("select[name='editcategory']").val());
    var vendor = $.trim($("select[name='editvendor']").val());
    var identifier = $.trim($("input[name='editidentifier']").val());
    var description = $.trim($("textarea[name='editdescription']").val());
    var features = $.trim($("textarea[name='editfeatures']").val());
    var COST = $.trim($("input[name='editcost']").val());
    var RETAIL = $.trim($("input[name='editretail']").val());


    if (category == "None") {
        $("#editerror").html(empty_category);
        $("select[name='editcategory']").addClass("chgborder");
        $("select[name='editcategory']").focus();
        return false;
    }
    if (vendor == "None") {
        $("#editerror").html(empty_vendor);
        $("select[name='editvendor']").addClass("chgborder");
        $("select[name='editvendor']").focus();
        return false;
    }
    if (identifier == "") {
        $("input[name='editidentifier']").focus();
        $("#editerror").html(empty_identifier);
        $("input[name='editidentifier']").addClass("chgborder");
        //err_identifier=true;
        return false;
    }
    if (description == "") {
        $("textarea[name='editdescription']").focus();
        $("#editerror").html(empty_description);
        $("textarea[name='editdescription']").addClass("chgborder");
        //err_description=true;
        return false;

    }
    if (features == "") {
        $("textarea[name='editfeatures']").focus();
        $("#editerror").html(empty_features);
        $("textarea[name='editfeatures']").addClass("chgborder");
        //err_features=true;
        return false;

    }
    if (COST == "") {
        $("input[name='editcost']").focus();
        $("#editerror").html(empty_cost);
        $("input[name='editcost']").addClass("chgborder");
        err_editcost = true;
        return false;
    }
    if (!chkEditCost()) {
        return false;
    }
    if (RETAIL == "") {
        $("input[name='editretail']").focus();
        $("#editerror").html(empty_retail);
        $("input[name='editretail']").addClass("chgborder");
        err_editretail = true;
        return false;
    }
    if (!chkEditRetail()) {
        return false;
    }
     
    return true;

}

function chkEditCategory() {
    if ($.trim($("select[name='editcategory']").val()) != "None") {
        $("#editerror").html("");
        $("select[name='editcategory']").removeClass("chgborder");
    }
}

function chkEditVendor() {
    if ($.trim($("select[name='editvendor']").val()) != "None") {
        $("#editerror").html("");
        $("select[name='editvendor']").removeClass("chgborder");
    }
}

function chkEditIdentifier() {
    if ($.trim($("input[name='editidentifier']").val()) != "") {
        $("#editerror").html("");
        $("input[name='editidentifier']").removeClass("chgborder");
    }
}

function chkEditDescription() {
    if ($.trim($("textarea[name='editdescription']").val()) != "") {
        $("#editerror").html("");
        $("textarea[name='editdescription']").removeClass("chgborder");
    }
}

function chkEditFeatures() {
    if ($.trim($("textarea[name='editfeatures']").val()) != "") {
        $("#editerror").html("");
        $("textarea[name='editfeatures']").removeClass("chgborder");
    }
}

function chkEditCost() {
    var cost = $.trim($("input[name='editcost']").val());
    if (cost != "" && !validAmount(cost)) {
        $("#editerror").html(invalid_cost);
        $("input[name='editcost']").addClass("chgborder");
        err_editcost = true;
        return false;
    } else {
        if (err_editcost) {
            $("input[name='editcost']").removeClass("chgborder");
            var error = $("#editerror").text();
            if (error == empty_cost || error == invalid_cost) {
                $("#editerror").html("");
            }
            err_editcost == false;
        }
        return true;
    }

}

function chkEditRetail() {
    var retail = $.trim($("input[name='editretail']").val());
    if (retail != "" && !validAmount(retail)) {
        $("#editerror").html(invalid_retail);
        $("input[name='editretail']").addClass("chgborder");
        err_editretail = true;
        return false;
    } else {
        if (err_editretail) {
            $("input[name='editretail']").removeClass("chgborder");
            var error = $("#editerror").text();
            if (error == empty_retail || error == invalid_retail) {
                $("#editerror").html("");
            }
            err_editretail == false;
        }
        return true;
    }
}


function submitEditDetails() {
    if (validateEditForm()) {
        $("#edit_busy_pic").css("display", "block");
            send_edit_file();
            send_edit_form_data();
    }
}

function send_edit_form_data() {
    var editimage = ($.trim($("[name='editphoto']").val()) == "") ? $("input[name='hiddenphoto']").val() : $("[name='editphoto']").val();
    var params = "sku=" + $("[name='retrievedsku']").val() +
        "&category=" + $("[name='editcategory']").val() +
        "&vendor=" + $("[name='editvendor']").val() +
        "&identifier=" + $("[name='editidentifier']").val() +
        "&description=" + $("[name='editdescription']").val() +
        "&features=" + $("[name='editfeatures']").val() +
        "&cost=" + $("[name='editcost']").val() +
        "&retail=" + $("[name='editretail']").val() +
        "&image=" + editimage;
    params = encodeURI(params);
    var req = new HttpRequest('process_edit.cgi?' + params,
        handleEdit);
    req.send();
    //event.preventDefault();
}

function handleEdit(response) {

    $("#edit_busy_pic").css("display", "none");
    if ($.trim(response) == "OK") {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $("#editItemSuccessMessage").css("display", "block").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' /> The item with sku \'" + $("[name='retrievedsku']").val() + "\' has been modified");
        $("#editItemSuccessMessage").css("border", "2px solid green");
        $("#hideedit").hide();
        $(".error").html("");

    } else if ($.trim(response) == "LOGOUT") {
        redirect();
    } else {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $("#editItemSuccessMessage").html("");
        $("#editItemFailureMessage").css("display", "block").html("Sorry,An error has been encoutered");
        // $("#editform table").hide();
        //$("#editform #buttons").hide();
        $("#hidedit").hide();
    }
    $("input[name='editsku']").val("");
    $("input[name='editsku']").focus();
}

function send_edit_file() {
        if ($.trim($("[name='editphoto']").val()) != "") {
            var form_data = new FormData($('form')[1]);
            form_data.append("image", ($("input[name='editphoto']"))[0].files[0]);
            $.ajax({
                url: "/perl/jadrn007/upload_edit.cgi",
                type: "post",
                data: form_data,
                processData: false,
                contentType: false,
                success: function(response) {
                },
                error: function(response) {
                    //$('#status').css('color','red');
                    $('#editItemFailureMessage').html("Sorry, an upload error occurred, " + response.statusText);
                }
            });
        }
    }
//***********************************************************
//Delete functions

function manageDelete() {
    $("#delete_busy_pic").css("display", "none");
    $("#deleteItemSuccessMessage").css("display", "none");
    $("#deleteItemFailureMessage").css("display", "none");
    $("a#delete").addClass("active");
    
    $("#hidedelete").hide();
    $(":input").removeClass("chgborder");
    $("#deleteerror").html("");
    setTimeout(function() {
        $("input[name='deletesku']").focus();
    });
    $("input[name='deletesku']").val("");
    $("a#delete").css("border-top", "4px solid #754719");
    $("a#edit").removeClass("active");
    $("a#add").removeClass("active");
    $("a#edit").css("border", "none");
    $("a#add").css("border", "none");
    $("#deleteitem").css("display", "block");
    $("#edititem").css("display", "none");
    $("#additem").css("display", "none");
}

function chkDeleteSku() {
    var sku = $.trim($("input[name='deletesku']").val());
    if (sku != "" && !validateSku(sku)) {
        $("#deleteerror").html(invalid_sku);
        $("input[name='deletesku']").addClass("chgborder");
        err_deletesku = true;
        return false;
    } else {
        if (err_deletesku) {
            $("input[name='deletesku']").removeClass("chgborder");
            var error = $("#deleteerror").text();
            if (error == empty_sku || error == invalid_sku || error == no_sku) {
                $("#deleteerror").html("");
            }
            err_deletesku = false;

        }
        return true;
    }
}

function deleteSku() {
    $("#deleteItemSuccessMessage").css("display", "none");
    $("#deleteItemFailureMessage").css("display", "none");
    $("#hidedelete").hide();
    var SKU = $.trim($("input[name='deletesku']").val());
    if (SKU == "") {
        $("input[name='deletesku']").focus();
        $("#deleteerror").html(empty_sku);
        $("input[name='deletesku']").addClass("chgborder");
        err_deletesku = true;
        return false;
    }
    if (chkDeleteSku()) {
        delete_submit_clicked = 1;
        chkDeleteDupSku();
    }
}

function chkDeleteDupSku() {
    if ($.trim($("input[name='deletesku']").val()) != "" && chkDeleteSku()) {
        var req = new HttpRequest('check_dup_sku.cgi?' + "sku=" + $("[name='deletesku']").val(),
            check_delete_dup_sku);
        req.send();

    } else {
        return;
    }
}

function check_delete_dup_sku(response) {
    if ($.trim(response) == "LOGOUT") {
        redirect();
    } else if (!(response == "DUP")) {
        $("#deleteerror").html(no_sku);
        err_deletesku = true;
    } else {
        //Retrieve details of the sku
        $("#deleteerror").html("");
        if (delete_submit_clicked == 1) {
            delete_submit_clicked = 0;
            var req = new HttpRequest('retrieve_edit_details.cgi?' + "sku=" + $("[name='deletesku']").val(),
                retrieveDeleteDetails);
            req.send();
            $("#hidedelete").show();
        }

    }

}

function retrieveDeleteDetails(answer) {
    if ($.trim(answer) == "LOGOUT") {
        redirect();
    } else {
        var delete_result = new Array();
        delete_result = answer.split('|');
        $("[name='skutodelete']").val(delete_result[0]);
        $("[name='deletecategory']").val(delete_result[1]);
        $("[name='deletevendor']").val(delete_result[2]);
        $("[name='deleteidentifier']").val(delete_result[3]);
        $("[name='deletedescription']").html(delete_result[4]);
        $("[name='deletefeatures']").html(delete_result[5]);
        $("[name='deletecost']").val("$" + delete_result[6]);
        $("[name='deleteretail']").val("$" + delete_result[7]);
        $("input[name='deletephoto']").val(delete_result[8]);
        var img = "<img src='/~jadrn007/proj1/up_imgs/" + delete_result[8] + "' alt='image' width='200' />";
        //alert(img);
        $("#displaydeletepic").html("<figure><figcaption>Item image</figcaption>" + img + "</figure>");
    }
}

function confirmDelete() {
    $("#delete_busy_pic").css("display", "block");
    var req = new HttpRequest('process_delete.cgi?' + "sku=" + $("[name='deletesku']").val(),
        deleteResponse);
    req.send();
}


function deleteResponse(response) {
    $("#delete_busy_pic").css("display", "none");
    if ($.trim(response) == "OK") {
        $("#deleteItemSuccessMessage").css("display", "block").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' /> The item with sku \'" + $("[name='deletesku']").val() + "\' has been deleted");
        $("#deleteItemSuccessMessage").css("border", "2px solid green");
        $("#hidedelete").hide();
    } else if ($.trim(response) == "LOGOUT") {
        redirect();
    } else {
        $("#deleteItemSuccessMessage").html("");
        $("#deleteItemFailureMessage").css("display", "block").html("Sorry,An error has been encoutered");

    }
    $("[name='deletesku']").val("");
    $("[name='deletesku']").focus();
}

function cancelDelete() {
    $("#hidedelete").hide();
    $("[name='deletesku']").val("");
    $("[name='deletesku']").focus();
}