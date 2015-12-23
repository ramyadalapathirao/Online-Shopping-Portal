var err_sku = false,err_qty=false,err_date=false,err_insku=false,err_inqty=false,err_indate=false;
var empty_sku = "Please enter SKU",invalid_sku = "The SKU format is invalid. Sample format:(ABC-123)",
    no_sku = "The sku entered does not exist",empty_qty="Please enter Quantity",
    empty_date="Please enter a date";

$("document").ready(function() {
    $.get("/jadrn007/servlet/AjaxCheckSession",handler);
    history.go(1);
    history.navigationMode = 'compatible';
    $(window).unload(function(e) { return " "; });
    
    $(window).on('beforeunload', function() {
    	$('body').html(" ");
	});
    $("input[name='sku']").focus();
    manageTabs();
    $("a#sentOut").on("click", manageOut);
    $("a#recievedIn").on("click", manageIn);
    $("#out #add_busy_pic").css("display", "none");
    $("input[name='quantity']").prop("disabled",true);
    $("input[name='sku']").on("keyup", outUpper);
    $("input[name='sku']").on("blur", chkDupSku);
    $("input[name='quantity']").on("blur",chkQuantity);
    $("input[name='todaydate']").on("blur",chkDate);
    showCurrentDate();
    //*****************************************************//
    //in feilds validation
    
    $("input[name='in_sku']").on("keyup", inUpper);
    $("input[name='in_sku']").on("blur", chkInDupSku);
    $("input[name='in_quantity']").on("blur",chkInQuantity);
    $("input[name='in_todaydate']").on("blur",chkInDate);
    
    //Add form submit handler
    $("#out form").submit(function(event) {
        //alert("submit clicked");
        $(":input").removeClass("chgborder");
        $("label").removeClass("chgborder");
        $("#inerror").html("");
        $("#out .successMessage").css("display", "none");
        $("#out .failureMessage").css("display", "none");
        if (!validateForm()) {
            event.preventDefault();
            return;
        } else {
            event.preventDefault();	
            chkDupSubmitSku();
             
        }
});
    $("#in form").submit(function(event){
     //alert("submit clicked");
        $(":input").removeClass("chgborder");
        $("label").removeClass("chgborder");
        $("#outerror").html("");
        $("#in .successMessage").css("display", "none");
        $("#in .failureMessage").css("display", "none");
        if (!validateInForm()) {
            event.preventDefault();
            return;
        } else {
            event.preventDefault();	
            chkDupInSubmitSku();
             
        }                    
});
    
    $("#out :reset").on('click', reset);
    $("#in :reset").on('click',in_reset);
});


function handler(response)
{
  answer = $.trim(response);
    if(answer == "OK") return;
	window.location("http://jadran.sdsu.edu/jadrn007/login.html");
}

// Turn sku to upper case
function outUpper() {
    $(this).val($(this).val().toUpperCase());
    if ($(this).val().length == 3) {
        $(this).val($(this).val() + "-");
    }
     if($(this).val().length == 7){
        
       if ($.trim($("input[name='sku']").val()) != "" && chkSku()) {
        var req = new HttpRequest("http://jadran.sdsu.edu/jadrn007/servlet/DupCheck?" + "sku=" + $("[name='sku']").val(),
            check_dup_sku);
        req.send();
    } else {
        if($.trim($("input[name='sku']").val()) == "")
        {
                $("#inerror").html("");
                $("input[name='sku']").removeClass("chgborder");
        }   
        return;
    } 
        
        
    }
}


function showCurrentDate()
{
    var currentDate = new Date();
    var month = currentDate.getMonth()+1;
    var day = currentDate.getDate();
    var output =
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day + '/' + currentDate.getFullYear();
    $("input[name='todaydate']").val(output);
}
function showCurrentInDate()
{
    var currentDate = new Date();
    var month = currentDate.getMonth()+1;
    var day = currentDate.getDate();
    var output =
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day + '/' + currentDate.getFullYear();
    $("input[name='in_todaydate']").val(output);  
}
function reset() {
    $(":input").removeClass("chgborder");
    $("label").removeClass("chgborder");
    $(".error").html("");
    $("input[name='sku']").focus();
    $("#out #displaypic").css("display","none");
    $("input[name='quantity']").prop("disabled",true);
}
function in_reset(){
     $(":input").removeClass("chgborder");
    $("label").removeClass("chgborder");
    $(".error").html("");
    $("input[name='in_sku']").focus();
    $("#in #in_displaypic").css("display","none");
    $("input[name='in_quantity']").prop("disabled",true);
}
function validateForm()
{
    var SKU = $.trim($("input[name='sku']").val());
    var QTY = $.trim($("input[name='quantity']").val());
    var DATE= $.trim($("input[name='todaydate']").val());
    if (SKU == "") {
        $("input[name='sku']").focus();
        $("#inerror").html(empty_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        return false;
    }
    else if(!chkSku())
    {
       $("input[name='sku']").focus(); 
       return false;
    }
    if(DATE == "")
    {
        $("input[name='todaydate']").focus();
       $("#inerror").html(empty_date);
        $("input[name='todaydate']").addClass("chgborder");
        err_date = true;
        return false;
    }
    else if(!chkDate())
    {
        $("input[name='todaydate']").focus();
        return false;   
    }
    if(QTY == "")
    {
       $("input[name='quantity']").focus();
       $("#inerror").html(empty_qty);
        $("input[name='quantity']").addClass("chgborder");
        err_qty = true;
        return false;
    }
    else if(!chkQuantity())
    {
       $("input[name='quantity']").focus();
       return false;
    }
    
    
  return true;  
}
//check for duplicate sku

function chkDupSku() {

    if ($.trim($("input[name='sku']").val()) != "" && chkSku()) {
        var req = new HttpRequest("http://jadran.sdsu.edu/jadrn007/servlet/DupCheck?" + "sku=" + $("[name='sku']").val(),
            check_dup_sku);
        req.send();
    } else {
        if($.trim($("input[name='sku']").val()) == "")
        {
                $("#inerror").html("");
                $("input[name='sku']").removeClass("chgborder");
        }   
        return;
    }

}

function check_dup_sku(response) {
    $("input[name='quantity']").val("").prop("disabled",true);
    $("input[name='quantity']").removeClass('chgborder');
    $(".error").html("");
    var skuVal=$("input[name='sku']").val();
    var result=response.split('|');
    if(result[0] == "logout")
    {
     redirect();   
    }
    else if(!(result[0] == "DUP")) {
        $("#inerror").html(no_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        $("#out form").get(0).reset();
        $("input[name='sku']").val(skuVal);
        showCurrentDate();
        /*$("input[name='sku']").focus(); */
        $("#displaypic").css("display","none");
        return false;

    }
   
    else {  
        //alert(result[1]);
    $("input[name='quantity']").prop("disabled",false);
    $("input[name='category']").val(result[1]);
   $("input[name='vendor']").val(result[2]);
   $("input[name='identifier']").val(result[3]);
   var img = "<img src='/~jadrn007/proj1/up_imgs/" + result[4] + "' alt='image' width='200' />";
   $("#displaypic").css("display","block");
   $("#displaypic").html("<figure><figcaption>Product image</figcaption>" + img + "</figure>");
   $("[name='onHandQty']").val(result[5]);
   //alert($("[name='onHandQty']").val());
    }
}

function chkSku() {
    var sku = $.trim($("input[name='sku']").val());
    if (sku != "" && !validateSku(sku)) {
        $("#inerror").html(invalid_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        return false;
    } else {
        if (err_sku) {
            $("input[name='sku']").removeClass("chgborder");
            var error = $("#inerror").text();
            if (error == empty_sku || error == invalid_sku || error == no_sku) {
                $("#inerror").html("");
                $("input[name='sku']").removeClass("chgborder");
            }
            err_sku = false;

        }

        return true;
    }
}
//validate quantity
function chkQuantity()
{
   var qty_available=$("input[name='onHandQty']").val();
   var invalid_qty="Please enter a valid quantity";
   var negative_qty="Quantity cannot be zero or negative";
   var qty_unavailable="Sorry the inventory has only "+qty_available +" item(s)";
    var quantity=$.trim($("input[name='quantity']").val());
    if(quantity !="" && !validQty(quantity))
    {
        $("#inerror").html(invalid_qty);
         $("input[name='quantity']").addClass("chgborder");
        err_qty = true;
        return false;
    }
    else if(quantity !="" && !positiveQty(quantity))
    {
        $("#inerror").html(negative_qty);
         $("input[name='quantity']").addClass("chgborder");
        err_qty = true;
        return false;
        
    }
    else if(quantity !="" && !qtyAvailable(quantity,qty_available))
    {
       $("#inerror").html(qty_unavailable);
         $("input[name='quantity']").addClass("chgborder");
        err_qty = true;
        return false; 
        
    }
    else
    {
        if(err_qty)
        {
          $("input[name='quantity']").removeClass("chgborder");
          var error = $("#inerror").text();
          if (error == invalid_qty || error == negative_qty || error == qty_unavailable) {
                $("#inerror").html("");
                $("input[name='quantity']").removeClass("chgborder");
            }
          err_qty=false;  
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
function validQty(qty)
{
    if((/^\d+$/).test(qty))
    {
        return true;
    }
    return false;
}
function positiveQty(qty)
{
  if(qty>0)
  {
   return true;   
  }
    return false;
}

function qtyAvailable(qty,availQty)
{
 if(parseInt(qty)<=parseInt(availQty))
 {
     return true;
 }
    return false;
}
//validate date
function chkDate()
{
   var format_error="The date format is invalid. Please enter date in mm/dd/yyyy format";
   var date_error="The date entered is invalid. Please enter a valid date in mm/dd/yyyy format";
   var date=$.trim($("input[name='todaydate']").val());
   if(date != "" && !validDate(date))
   {
      $("#inerror").html(date_error);
      $("input[name='todaydate']").addClass("chgborder");
      err_date = true;
      return false; 
   }
   else if(date != "" && !validFormat(date))
    {
        $("#inerror").html(format_error);
        $("input[name='todaydate']").addClass("chgborder");
        err_date=true;
        return false;
    }
    else
    {
        if(err_date)
        {
            $("input[name='todaydate']").removeClass("chgborder");
            var ferror= $("#inerror").text();
            if(ferror==format_error|| ferror== date_error || ferror==empty_date)
            {
                $("#inerror").html("");
            }
            err_date=false;
        }
        return true;
    }
}
function validDate(date)
{
 var month=date.split("/")[0]-1;
    var day=date.split("/")[1];
    var year=date.split("/")[2];
    var actualdate = new Date(year, month, day);
    if ((actualdate.getMonth()!=month)||(actualdate.getDate()!=day)||(actualdate.getFullYear()!=year))
    {
        return false;
    }
    else
        return true;   
    
}
function validFormat(date)
{
    if (!(/^\d{2}\/\d{2}\/\d{4}$/).test(date))
    {
        return false;
    }
    return true;
}
/********************************************/
function chkDupSubmitSku() {
    //alert("inside check dup");
    if ($.trim($("input[name='sku']").val()) != "" && chkSku()) {
        //alert("inside");
        var req = new HttpRequest('http://jadran.sdsu.edu/jadrn007/servlet/DupCheck?' + "sku=" + $("[name='sku']").val(),
            check_dup_submit_sku);
        req.send();
    } else {
              if($.trim($("input[name='sku']").val()) == "")
              {
                $("#inerror").html("");
                $("input[name='sku']").removeClass("chgborder");
              }   
        return;
    }

}

function check_dup_submit_sku(response) {
   var result=response.split('|');
    if(result[0] == "logout")
    {
     redirect();   
    }
    else if(!(result[0] == "DUP")) {
        $("#inerror").html(no_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        return false;

    }
  
    else {
          processUpload();
          
        }
            
        $("#inerror").html("");
        $("input[name='sku']").removeClass("chgborder");
        return true;
    }
function processUpload()
{
  var params = "sku=" + $("[name='sku']").val() +
        "&date=" + $("[name='todaydate']").val() +
        "&quantity=" + $("[name='quantity']").val();
    params = encodeURI(params);
    var req = new HttpRequest('http://jadran.sdsu.edu/jadrn007/servlet/MerchandiseOut?' + params,
        handleInsert);
    req.send(); 
    $("#add_busy_pic").css("display", "block");
    
}
function handleInsert(response)
{
 $("#add_busy_pic").css("display", "none");
 //alert(response);
  
    if($.trim(response) == "logout")
    {
     redirect();   
    }
  if ($.trim(response) == "success") {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $("#out .successMessage").css("display", "block").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' /> The merchandise <span class='brown'>\'"+$("[name='quantity']").val()+" item(s) of "+ $("[name='sku']").val() + "\'</span> has been successfully sent out");
        $("#out .successMessage").css("border", "2px solid green");
        $("#inerror").html("");
          $("#out form").get(0).reset();
        
        $("#out #displaypic").css("display","none");
        showCurrentDate();
        $("input[name='quantity']").prop("disabled",true);

    } 
    else {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $(".successMessage").css("display", "none");
        $(".failureMessage").css("display", "block").html(response);
}
     $("input[name='sku']").focus();
  
}


/********************************/

function manageTabs() {
     $("#out .successMessage").css("display","none");
    $("#out .faliureMessage").css("display","none");
    $("a#sentOut").addClass("active");    
    $("a#sentOut").css("border-top", "4px solid #754719");
    $("a#recievedIn").removeClass("active");
    $("div#out").css("display", "block");
    $("div#in").css("display", "none");
}
function manageOut()
{
   $("#out .successMessage").css("display","none");
    $("#out .faliureMessage").css("display","none");
    $("#out form").get(0).reset();
    reset();
    setTimeout(function() {
        $("input[name='sku']").focus();
    });
    showCurrentDate();
    $("a#sentOut").addClass("active");
    $("a#sentOut").css("border-top", "4px solid #754719");
    $("a#recievedIn").removeClass("active");
    $("a#recievedIn").css("border", "none");
    $("#out").css("display", "block");
    $("#in").css("display", "none");
}

//in functions
function manageIn() {
    $("#in_busy_pic").css("display", "none");
    setTimeout(function() {
        $("input[name='in_sku']").focus();
    });
    $("#in form").get(0).reset();
    in_reset();
    $("input[name='in_sku']").val("");
    showCurrentInDate();
    $("a#recievedIn").addClass("active");
    $(":input").removeClass("chgborder");
    $("#outerror").html("");
    $("#in .successMessage").css("display","none");
    $("#in .failureMessage").css("display","none");
    $("a#recievedIn").css("border-top", "4px solid green");
    $("a#sentOut").removeClass("active");
    $("a#sentOut").css("border", "none");
    $("#in").css("display", "block");
    $("#out").css("display", "none");
}

function inUpper(){
   $(this).val($(this).val().toUpperCase());
    if ($(this).val().length == 3) {
        $(this).val($(this).val() + "-");
    }
     if($(this).val().length == 7){
        
       if ($.trim($("input[name='in_sku']").val()) != "" && chkInSku()) {
        var req = new HttpRequest("http://jadran.sdsu.edu/jadrn007/servlet/DupCheck?" + "sku=" + $("[name='in_sku']").val(),
            check_dup_in_sku);
        req.send();
    } else {
        if($.trim($("input[name='in_sku']").val()) == "")
        {
                $("#outerror").html("");
                $("input[name='in_sku']").removeClass("chgborder");
        }   
        return;
    } 
        
 }
}
function chkInDupSku()
{
    if ($.trim($("input[name='in_sku']").val()) != "" && chkInSku()) {
        var req = new HttpRequest("http://jadran.sdsu.edu/jadrn007/servlet/DupCheck?" + "sku=" + $("[name='in_sku']").val(),
            check_dup_in_sku);
        req.send();
    } else {
        if($.trim($("input[name='in_sku']").val()) == "")
        {
                $("#outerror").html("");
                $("input[name='in_sku']").removeClass("chgborder");
        }   
        return;
    }
}
function chkInSku()
{
  var sku = $.trim($("input[name='in_sku']").val());
    if (sku != "" && !validateSku(sku)) {
        $("#outerror").html(invalid_sku);
        $("input[name='in_sku']").addClass("chgborder");
        err_insku = true;
        return false;
    } else {
        if (err_insku) {
            $("input[name='in_sku']").removeClass("chgborder");
            var error = $("#outerror").text();
            if (error == empty_sku || error == invalid_sku || error == no_sku) {
                $("#outerror").html("");
                $("input[name='in_sku']").removeClass("chgborder");
            }
            err_insku = false;

        }

        return true;
    }  
}
function check_dup_in_sku(response)
{
  //alert(response);
     $("input[name='in_quantity']").val("").prop("disabled",true);
    $("input[name='in_quantity']").removeClass('chgborder');
    $(".error").html("");
    var skuVal=$("input[name='in_sku']").val();
    var result=response.split('|');
    if(result[0] == "logout")
    {
     redirect();   
    }
    else if(!(result[0] == "DUP")) {
        $("#outerror").html(no_sku);
        $("input[name='in_sku']").addClass("chgborder");
        err_insku = true;
        $("#in form").get(0).reset();
        $("input[name='in_sku']").val(skuVal);
        showCurrentInDate();
        /*$("input[name='sku']").focus(); */
        $("#in #in_displaypic").css("display","none");
        return false;

    }
    
    else {  
        //alert("inside else");
        //alert(result[1]);
    $("input[name='in_quantity']").prop("disabled",false);
    $("input[name='in_category']").val(result[1]);
   $("input[name='in_vendor']").val(result[2]);
   $("input[name='in_identifier']").val(result[3]);
   var img = "<img src='/~jadrn007/proj1/up_imgs/" + result[4] + "' alt='image' width='200' />";
   $("#in #in_displaypic").css("display","block");
   $("#in #in_displaypic").html("<figure><figcaption>Product image</figcaption>" + img + "</figure>");
   $("[name='in_onHandQty']").val(result[5]);
   //alert($("[name='onHandQty']").val());
    }  
}
function validateInForm()
{
  var SKU = $.trim($("input[name='in_sku']").val());
    var QTY = $.trim($("input[name='in_quantity']").val());
    var DATE= $.trim($("input[name='in_todaydate']").val());
    if (SKU == "") {
        $("input[name='in_sku']").focus();
        $("#outerror").html(empty_sku);
        $("input[name='in_sku']").addClass("chgborder");
        err_insku = true;
        return false;
    }
    else if(!chkInSku())
    {
        $("input[name='in_sku']").focus();
        return false;
    }
    if(DATE == "")
    {
        $("input[name='in_todaydate']").focus();
       $("#outerror").html(empty_date);
        $("input[name='in_todaydate']").addClass("chgborder");
        err_indate = true;
        return false;
    }
    else if(!chkInDate())
    {
        $("input[name='in_todaydate']").focus();
        return false;   
    }
    if(QTY == "")
    {
       $("input[name='in_quantity']").focus();
       $("#outerror").html(empty_qty);
        $("input[name='in_quantity']").addClass("chgborder");
        err_inqty = true;
        return false;
    }
    else if(!chkInQuantity())
    {
       $("input[name='in_quantity']").focus();
       return false;
    }
    
    return true;  
}
function chkDupInSubmitSku()
{
    //alert("inside check dup");
    if ($.trim($("input[name='in_sku']").val()) != "" && chkInSku()) {
        //alert("inside");
        var req = new HttpRequest('http://jadran.sdsu.edu/jadrn007/servlet/DupCheck?' + "sku=" + $("[name='in_sku']").val(),
            check_dup_in_submit_sku);
        req.send();
    } else {
              if($.trim($("input[name='in_sku']").val()) == "")
              {
                $("#outerror").html("");
                $("input[name='in_sku']").removeClass("chgborder");
              }   
        return;
    }
    
}
function check_dup_in_submit_sku(response)
{
   var result=response.split('|');
     if(result[0] == "logout")
    {
     redirect();   
    }
    else if(!(result[0] == "DUP")) {
        $("#outerror").html(no_sku);
        $("input[name='in_sku']").addClass("chgborder");
        err_insku = true;
        return false;

    }
   
    else {
          processInUpload();
          
        }
            
        $("#outerror").html("");
        $("input[name='in_sku']").removeClass("chgborder");
        return true; 
}
function processInUpload()
{
  var params = "sku=" + $("[name='in_sku']").val() +
        "&date=" + $("[name='in_todaydate']").val() +
        "&quantity=" + $("[name='in_quantity']").val();
    params = encodeURI(params);
    var req = new HttpRequest('http://jadran.sdsu.edu/jadrn007/servlet/MerchandiseIn?' + params,
        handleInInsert);
    req.send(); 
    $("#in_busy_pic").css("display", "block");  
    
}
function handleInInsert(response)
{
   //alert(response);
    $("#in_busy_pic").css("display", "none");
    if($.trim(response) == "logout")
    {
     redirect();   
    }
    if ($.trim(response) == "success") {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $("#in .successMessage").css("display", "block").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' /> The merchandise <span class='brown'>\'" + $("[name='in_quantity']").val()+" item(s) of "+$("[name='in_sku']").val() + "\'</span> has been added");
        $("#in .successMessage").css("border", "2px solid green");
        $("#outerror").html("");
        $("#in form").get(0).reset();
        showCurrentInDate();
    $("input[name='in_quantity']").prop("disabled",true);
     $("#in_displaypic").css("display","none");

    } 
    else {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $("#in .successMessage").css("display","none");
        $("#in .failureMessage").css("display", "block").html(response);
        // $("#editform table").hide();
}
           $("input[name='in_sku']").focus(); 
}
function chkInQuantity()
{
   var invalid_qty="Please enter a valid quantity";
   var negative_qty="Quantity cannot be zero or negative";
    var quantity=$.trim($("input[name='in_quantity']").val());
    if(quantity !="" && !validQty(quantity))
    {
        $("#outerror").html(invalid_qty);
         $("input[name='in_quantity']").addClass("chgborder");
        err_inqty = true;
        return false;
    }
    else if(quantity !="" && !positiveQty(quantity))
    {
        $("#outerror").html(negative_qty);
         $("input[name='in_quantity']").addClass("chgborder");
        err_inqty = true;
        return false;
        
    }
    else
    {
        if(err_inqty)
        {
          $("input[name='in_quantity']").removeClass("chgborder");
          var error = $("#outerror").text();
          if (error == invalid_qty || error == negative_qty) {
                $("#outerror").html("");
                $("input[name='in_quantity']").removeClass("chgborder");
            }
          err_inqty=false;  
        }
      return true;  
    } 
}
function chkInDate()
{
   var format_error="The date format is invalid. Please enter date in mm/dd/yyyy format";
   var date_error="The date entered is invalid. Please enter a valid date in mm/dd/yyyy format";
   var date=$.trim($("input[name='in_todaydate']").val());
   if(date != "" && !validDate(date))
   {
      $("#outerror").html(date_error);
      $("input[name='in_todaydate']").addClass("chgborder");
      err_indate = true;
      return false; 
   }
   else if(date != "" && !validFormat(date))
    {
        $("#outerror").html(format_error);
        $("input[name='in_todaydate']").addClass("chgborder");
        err_indate=true;
        return false;
    }
    else
    {
        if(err_indate)
        {
            $("input[name='in_todaydate']").removeClass("chgborder");
            var ferror= $("#outerror").text();
            if(ferror==format_error|| ferror== date_error || ferror==empty_date)
            {
                $("#outerror").html("");
            }
            err_indate=false;
        }
        return true;
    } 
}
function redirect() {
        window.location.href = "http://jadran.sdsu.edu/jadrn007/error.html";
        return false;
    }






