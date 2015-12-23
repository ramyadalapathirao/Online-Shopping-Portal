var err_sku = false,err_qty=false,err_date=false;
var empty_sku = "Please enter SKU",invalid_sku = "The SKU format is invalid. Sample format:(ABC-123)",
    no_sku = "The sku entered does not exist",empty_qty="Please enter Quantity",
    empty_date="Please enter a date";



$("document").ready(function() {
    $("input[name='sku']").focus();
    $("#add_busy_pic").css("display", "none");
    $("input[name='quantity']").prop("disabled",true);
    $("input[name='sku']").on("keyup", upper);
    $("input[name='sku']").on("blur", chkDupSku);
    $("input[name='quantity']").on("blur",chkQuantity);
    $("input[name='todaydate']").on("blur",chkDate);
    $("div.successMessage").css("display","none");
    $("div.faliureMessage").css("display","none");
    $("a#recievedIn").css("border-top", "4px solid green");
    showCurrentDate();
    
    //Add form submit handler
    $("#in form").submit(function(event) {
        //alert("submit clicked");
        $(":input").removeClass("chgborder");
        $("label").removeClass("chgborder");
        $("#inerror").html("");
        $("successMessage").css("display", "none");
        $("failureMessage").css("display", "none");
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
function reset() {
    $(":input").removeClass("chgborder");
    $("label").removeClass("chgborder");
    $(".error").html("");
    $("input[name='sku']").focus();
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
    var skuVal=$("input[name='sku']").val();
    var result=response.split('|');
    
    if (!(result[0] == "DUP")) {
        
        $("#inerror").html(no_sku);
        $("input[name='sku']").addClass("chgborder");
        err_sku = true;
        $("#in form").get(0).reset();
        $("input[name='sku']").val(skuVal);
        showCurrentDate();
        /*$("input[name='sku']").focus();*/
        $("#displaypic").css("display","none");
        return false;

    } 
    else { 
         $("input[name='quantity']").prop("disabled",false);
       $("input[name='category']").val(result[1]);
   $("input[name='vendor']").val(result[2]);
   $("input[name='identifier']").val(result[3]);
   var img = "<img src='/~jadrn007/proj1/up_imgs/" + result[4] + "' alt='image' width='200' />";
   $("#displaypic").css("display","block");
   $("#displaypic").html("<figure><figcaption>Item image</figcaption>" + img + "</figure>");
   $("[name='onHandQty']").val(result[5]);
    }
}
/*function populateFields()
{
    var req = new HttpRequest('http://jadran.sdsu.edu/jadrn007/servlet/RetrieveDetails?' + "sku=" + $("[name='sku']").val(),
                retrieveDetails);
            req.send(); 
}


function retrieveDetails(response)
{
   var result = new Array();
   result= response.split('|');
   $("input[name='category']").val(result[0]);
   $("input[name='vendor']").val(result[1]);
   $("input[name='identifier']").val(result[2]);
   var img = "<img src='/~jadrn007/proj1/up_imgs/" + result[3] + "' alt='image' width='200' />";
     $("#displaypic").css("display","block");
   $("#displaypic").html("<figure><figcaption>Item image</figcaption>" + img + "</figure>");
  // $("[name='onHandQty']").val(result[4]);
   //alert($("[name='onHandQty']").val());   
    
}*/

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
   var invalid_qty="Please enter a valid quantity";
   var negative_qty="Quantity cannot be zero or negative";
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
    else
    {
        if(err_qty)
        {
          $("input[name='quantity']").removeClass("chgborder");
          var error = $("#inerror").text();
          if (error == invalid_qty || error == negative_qty) {
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
//validate date
function chkDate()
{
   var format_error="The date format is invalid. Please enter date in mm/dd/yyyy format";
   var date_error="The date entered is invalid. Please enter valid date";
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
    //alert(response);
    var result=response.split('|');
    if (!(result[0] == "DUP")) {
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
    var req = new HttpRequest('http://jadran.sdsu.edu/jadrn007/servlet/MerchandiseIn?' + params,
        handleInsert);
    req.send();
    $("#add_busy_pic").css("display", "block");
}
function handleInsert(response)
{
    //alert(response);
    $("#add_busy_pic").css("display", "none");
    if ($.trim(response) == "success") {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $(".successMessage").css("display", "block").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' /> The merchandise with sku \'" + $("[name='sku']").val() + "\' has been added");
        $(".successMessage").css("border", "2px solid green");
        $("#inerror").html("");
            $("#in form").get(0).reset();
    $("input[name='quantity']").prop("disabled",true);
     $("#displaypic").css("display","none");

    } 
    else {
        var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
        $(".successMessage").html("");
        $(".failureMessage").css("display", "block").html("Sorry,An error has been encoutered");
        // $("#editform table").hide();
}
           $("input[name='sku']").focus();
    
}



