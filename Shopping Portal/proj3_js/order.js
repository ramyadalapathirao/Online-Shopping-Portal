var err_fname=false,err_lname=false,err_address=false,err_city=false,err_state=false,
    err_zip=false,err_area=false,err_prefix=false,err_number=false;
var err_sfname=false,err_slname=false,err_saddress=false,err_scity=false,err_sstate=false,
    err_szip=false,err_sarea=false,err_sprefix=false,err_snumber=false,err_paytype=false,err_cvv=false,
    err_card=false,err_month=false,err_year=false,err_category=false,err_product=false,err_qty=false;
var empty_fname="Please enter the first name in billing address";
var empty_lname="Please enter the last name in billing address";
var empty_address="Please enter the billing address";
var empty_city="Please enter the city name in billing address";
var empty_state="Please enter the two letter state abbreviation in billing address";
var empty_zip="Please enter the zip code in billing address";
var empty_cellarea="Please enter the phone number area code with 3 digits";
var empty_cellprefix="Please enter the phone number prefix with 3 digits";
var empty_cellnumber="Please enter your phone number with 4 digits";
var empty_sfname="Please enter the first name in shipping address";
var empty_slname="Please enter the last name in shipping address";
var empty_saddress="Please enter the shipping address";
var empty_scity="Please enter the city name in shipping address";
var empty_sstate="Please enter your two letter state abbreviation in shipping address";
var empty_szip="Please enter the zip code in shipping address";
var empty_scellarea="Please enter your emergency contact number area code with 3 digits";
var empty_scellprefix="Please enter your emergency contact number prefix with 3 digits";
var empty_scellnumber="Please enter your emergency contact number with 4 digits";
var empty_paytype="Please select the payment type";
var empty_cardno="Please enter your card number";
var empty_month="Please enter your card's expiry month";
var empty_year="Please enter your card's expiry year";
var invalidyear="The card has already expired. Please give a valid card expiry date";
var empty_category="Please choose a chocolate category";
var empty_product="Please choose a product";
var empty_quantity="Please enter a quantity greater than 0";
var empty_cvv = "Please enter the security code. It is a 3 digit number on the back of your card";
var invalidqty="Invalid quanity. Please enter a number greater than 0";
var on_hand_qty = 0;



$(document).ready(function()
{
    localStorage.clear();
    $("#order-dialog-modal").dialog({
            dialogClass:'no-close',
             height: 600,
            width: 1000,
            modal: true,
            autoOpen: false,
           resizable:false,
        	


        open: function(event, ui) {  
            jQuery('.ui-dialog-titlebar-close').removeClass("ui-dialog-titlebar-close").html('<span>X</span>');  
        }
        

    });
    cart = new shopping_cart("jadrn007PROJ3");
 
     //alert("cart is there");
     showCart();
    
  /*  else
    {
        alert("cart empty");
    }*/
    
    $("#test").on("click",function()
                  {
                      
                      $("#rder-dialog-modal").dialog('open');
                  });
       // showCart();
    
   /* else{
     $("#no_cart").html("Cart empty");   
    }*/
    $("input[name='fName']").on("blur",chkFirstName);
    $("input[name='lName']").on("blur",chkLastName);
    $("input[name='address1']").on("blur",chkAddress);
    $("input[name='city']").on("blur",chkCity);
    $("input[name='state']").on("blur",chkState);
    $("input[name='zipcode']").on("blur",chkZip);
    $("input[name='cellarea']").on("blur",chkCellarea);
    $("input[name='cellprefix']").on("blur",chkCellprefix);
    $("input[name='cellnumber']").on("blur",chkCellnumber);
    $("input[name='sfName']").on("blur",chkSFirstName);
    $("input[name='slName']").on("blur",chkSLastName);
    $("input[name='saddress1']").on("blur",chkSAddress);
    $("input[name='scity']").on("blur",chkSCity);
    $("input[name='sstate']").on("blur",chkSState);
    $("input[name='szipcode']").on("blur",chkSZip);
    $("input[name='scellarea']").on("blur",chkSCellarea);
    $("input[name='scellprefix']").on("blur",chkSCellprefix);
    $("input[name='scellnumber']").on("blur",chkSCellnumber); 
    $("input[name='cardno']").on("blur",chkCard);
    $("input[name='expmonth']").on("blur",chkMonth);
    $("input[name='expyear']").on("blur",chkYear);
    $("input[name='cvv']").on("blur",chkCvv);
    $("input[name='payment']").on("change",chkPayment);
    $("input[name='state']").on('keyup', function() {
    $("input[name='state']").val($("input[name='state']").val().toUpperCase()); });
    $("input[name='sstate']").on('keyup', function() {
    $("input[name='sstate']").val($("input[name='sstate']").val().toUpperCase()); });
    $(":submit").on('click',function(event)
    {
        $(":input").removeClass("chgborder");
        $("#berror").html("");
        if(!validateForm())
        {
        event.preventDefault(); 
        return;
        }
        
    });
    $(":reset").on('click',function()
    {
        $(":input").removeClass("chgborder");
        $("#berror").html("");
        $("input[name='fName']").focus();             
                     
    }); 

    $("input[name='sameshipping']").on("click",function()
    {
         if($(this).is(":checked"))
         {
          fillShipping();   
         }
         else
         {
            $("input[name='sfName']").val(""); 
            $("input[name='slName']").val("");
            $("input[name='saddress1']").val("");
            $("input[name='scity']").val("");
            $("input[name='sstate']").val("");
            $("input[name='szipcode']").val("");
            $("input[name='scellarea']").val("");
            $("input[name='scellprefix']").val("");
            $("input[name='scellnumber']").val("");  
             
         }
                                           
    }); 
    $("input[name='cellarea']").keyup(function(event)
    {
        if($("input[name='cellarea']").val().length==3)
        {
            $("input[name='cellprefix']").focus();
        }
    	
    });
    	
    $("input[name='cellprefix']").keyup(function(event)
    {
        if($("input[name='cellprefix']").val().length==3)
        {
            $("input[name='cellnumber']").focus();
        }
    });
    $("input[name='scellarea']").keyup(function(event)
    {
        if($("input[name='scellarea']").val().length==3)
        {
            $("input[name='scellprefix']").focus();
        }
    });
    $("input[name='scellprefix']").keyup(function(event)
    {
        if($("input[name='scellprefix']").val().length==3)
        {
            $("input[name='scellnumber']").focus();
        }
    });
    
});
function showCart()
{
//alert("show cart");
var subtotal=0;
var cartArray = cart.getCartArray();
if(cart.size()>0)
{
/*var toWrite="<h2>Shopping Cart</h2>";
toWrite +="<hr />";  */
$("#total_checkout").css("display","block");
$("#order>a").css("display","block");
var toWrite = "";
toWrite += "<table id='scart'>";
toWrite += "<tr><th colspan='2'>Item Description</th><th>Quantity</th><th>Price</th><th>Total</th><th>Details</th></tr>";
for(i=0; i < cartArray.length; i++)
{
     toWrite += "<tr>";
     toWrite +="<td><img src=\'"+cartArray[i][4]+"\' alt='"+cartArray[i][0]+"'"+" width='100'"+" /></td>";
    toWrite +="<td><b class='title'>"+cartArray[i][3]+"</b><br /><br />";
    toWrite +="<div class='error'></div></td>";
    toWrite += "<td><input type='text' class='uqty' name='"+cartArray[i][0]+"' size='3' value='"+cartArray[i][1]+"' /><br /><a id='change' href='javascript:;'></a></td>";
     toWrite += "<td>$"+cartArray[i][2]+"</td>";
     var currentTotalPrice = cartArray[i][1]*cartArray[i][2];
     subtotal = subtotal + currentTotalPrice;
    
      toWrite += "<td class='price'>$"+parseFloat(currentTotalPrice).toFixed(2)+"</td>";
    toWrite+="<td><input type='button' class='button' id='del' name='"+cartArray[i][0]+"' value='Delete' onclick=\"cart.delete('"+cartArray[i][0]+"');showCart();\" /></td>";
    toWrite += "</tr>";
}
toWrite += "</table>"; 
$('#show_cart').html(toWrite); 
    
$(".uqty").on("click",function(){
$(this).parents("tr").find("#change").html("change"); });

if($(".uqty").val() == 0)
{
     $(this).parents("tr").find("#change").html("Remove");  
}

$(".uqty").on("blur",function(){
   $(this).parents("tr").find("#change").html("");  
    
});
$(".uqty").on("change",function(){
  
    //alert("quantity changed");
    var ref=$(this);
    var usku=$(this).attr('name');
    var value=$(this).val();
    if(value==0)
    {
        cart.delete(usku);
        showCart();
    }
    else
    {
        if(!validateQty(value))
        {
            //$(this).val(1);
            $(this).addClass("chgborder");
            $(this).parents("tr").find("div.error").html("Please enter a valid quantity");
            $(this).focus();
            err_qty = true;
            return false;
        }
        else{
        
         $.get("/jadrn007/servlet/DispatchServlet?action=getOnhandQuantity&sku="+usku,handler)
          
        }
        
    }
    function handler(response)
    {
        on_hand_qty = response;
        if(parseInt(response) >= value) 
        {
         ref.removeClass("chgborder");
          ref.parents("tr").find("div.error").html("");
          cart.setQuantity(usku, value);
           showCart();
           err_qty = false;
           return true;
        }
        else
        {
           ref.addClass("chgborder");
            ref.parents("tr").find("div.error").html("Sorry only "+on_hand_qty+" items(s) available in stock.");
            ref.focus();
            err_qty = true;
            return false;
        }
    }
   });

var bill = "<table id='bill'>";
var shipping=5.00;
var tax=(((subtotal+shipping)*8)/100).toFixed(2);
var total=parseFloat(subtotal)+parseFloat(shipping)+parseFloat(tax);
bill +="<tr>";
bill +="<td>Subtotal("+cart.size()+" item(s)): </td><td>$"+subtotal.toFixed(2) +"</td></tr>";
bill +="<tr><td>Tax: </td><td>$"+tax +"</td></tr>";
bill +="<tr><td>Shipping: </td><td>$"+shipping.toFixed(2) +"</td></tr>";
bill +="<tr><td></td><td>--------------</td></tr>";
bill +="<tr><td><b>Grand Total: </b></td><td><b>$"+total.toFixed(2)+"</b></td></tr>";
bill +="</table>";
bill +="<input type='button' class='green' name='checkout' value='Proceed to checkout' />";
$("#total_checkout").html(bill);
$("input[name='checkout']").on("click",function(){
    //alert("clicked checkout");
    if(validateCheckOut())
    {
    window.location.href = "/jadrn007/servlet/DispatchServlet?action=billing";
    }
    //$("#order-dialog-modal").dialog('open');
    
});

//$("input[name='place']").css("display","block");
}
else
{
  //alert("inside else");
  $("#order>a").css("display","none");
  $("div#order h2").html("Shopping Cart is empty");
  $('#show_cart').html("<input type='button' class='shop' name='continue_shop' value='Continue Shopping' />")
  $("#total_checkout").css("display","none");
  $("input[name='continue_shop']").on("click",function(){
     window.location.href = "/jadrn007/servlet/DispatchServlet?action=products"; 
  });
  //$("input[name='place']").css("display","none");  
}

$('#count').text(cart.size());     
}

function validateQty(qty)
{
 if(!((/^\d+$/).test(qty)))
 {
    return false;
 }
 if(qty < 0)
 {
  return false;   
 }
    return true;   
}

function validateCheckOut()
{
$('#show_cart table>tr').each(function() {
    
    $(".uqty").trigger("change");
});
    if(!err_qty)
    {
     return true;   
    }
    
}

//order form
function fillShipping()
{
 $("input[name='sfName']").val($("input[name='fName']").val()); 
 $("input[name='slName']").val($("input[name='lName']").val());
 $("input[name='saddress1']").val($("input[name='address1']").val());
 $("input[name='scity']").val($("input[name='city']").val());
 $("input[name='sstate']").val($("input[name='state']").val());
 $("input[name='szipcode']").val($("input[name='zipcode']").val());
 $("input[name='scellarea']").val($("input[name='cellarea']").val());
 $("input[name='scellprefix']").val($("input[name='cellprefix']").val());
 $("input[name='scellnumber']").val($("input[name='cellnumber']").val());
    
}

function chkFirstName()
{

    var fname=$.trim($("input[name='fName']").val());
    if(fname != "")
    {
        if(err_fname == true)
        {
            $("input[name='fName']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==empty_fname)
            {
               $("#berror").html("");
            }
            err_fname = false;
        }
    }
}
function chkLastName()
{
    var lname=$.trim($("input[name='lName']").val());
    if(lname !="")
    {
        if(err_lname)
        {
            $("input[name='lName']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==empty_lname)
            {
                $("#berror").html("");
            }
            err_lname == false;
        }
    }
}


function chkAddress()
{
    var address=$.trim($("input[name='address1']").val());
    if(address!="")
    {
        if(err_address)
        {
            $("input[name='address1']").removeClass("chgborder"); 
            var ferror= $("#berror").text();
            if(ferror==empty_address)
            {
                $("#berror").html("");
            }
            err_address == false;
          }
    }
}
function chkCity()
{
    var city=$.trim($("input[name='city']").val());
    if(city !="")
    {
        if(err_city)
        {
            $("input[name='city']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==empty_city)
            {
                $("#berror").html("");
            }
            err_city == false;
        }
    } 
}
function isValidState(state) 
{                                
    var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC",
    "DC2","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA",
    "MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH",
    "NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN",
    "TX","UT","VA","VT","WA","WI","WV","WY");
    for(var i=0; i < stateList.length; i++)
        if(stateList[i] == $.trim(state))
            return true;
    return false;
}  
function chkState()
{
    var error_message="The state appears to be invalid, please use the two letter state abbreviation";
    var state=$.trim($("input[name='state']").val());
    if(!isValidState(state) && state != "")
    {
        $("#berror").html(error_message);
        $("input[name='state']").addClass("chgborder");
        err_state=true;
        return false;
    }
    else
    {
        if(err_state)
        {
            $("input[name='state']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==error_message || ferror==empty_state)
            {
                $("#berror").html("");
            }
            err_state=false;
        }
        return true;    
    } 
}
    
function chkZip()
{
    var error_message="The zip code appears to be invalid. Please enter only numbers";
    var length_error="The zip code must have exactly five digits";
    var zip=$.trim($("input[name='zipcode']").val());
    if(!$.isNumeric(zip) && zip !="")
    {
        $("input[name='zipcode']").addClass("chgborder");
        $("#berror").html(error_message);
        $("input[name='zipcode']").focus();  
        err_zip=true;
        return false;
    }
    else if(zip.length != 5 && zip !="")
    {
        $("input[name='zipcode']").addClass("chgborder");
        $("#berror").html(length_error);
        $("input[name='zipcode']").focus();  
        err_zip=true;
        return false;
    }   
    else
    {
        if(err_zip)
        {
            $("input[name='zipcode']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==error_message || ferror==length_error || ferror==empty_zip)
            {
                $("#berror").html("");
            }
            err_zip=false;
        }
        return true;
    } 
    
}
function chkCellarea()
{
    var numeric_error="The Phone number's area code appears to be invalid, numbers only please.";
    var length_error="The Phone number's area code must have exactly three numbers";
    var cellarea=$.trim($("input[name='cellarea']").val()); 
    if(cellarea.length!=3 && cellarea != "")
    {
        $("#berror").html(length_error);
        $("input[name='cellarea']").addClass("chgborder");
        err_area=true;
        return false; 
    }
    else if(!$.isNumeric(cellarea) && cellarea !="")
    {
        $("#berror").html(numeric_error);
        $("input[name='cellarea']").addClass("chgborder");
        err_area=true;
        return false;
    }
    else
    {
        if(err_area)
        {
            $("input[name='cellarea']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==length_error || ferror==numeric_error || ferror==empty_cellarea)
            {
                $("#berror").html("");
            }
            err_area=false;
        }
        return true;
    }
}
function chkCellprefix()
{
    var numeric_error="The phone number's prefix appears to be invalid, numbers only please.";
    var length_error="The phone number's prefix must have exactly three numbers";
    var cellprefix=$.trim($("input[name='cellprefix']").val());
    if(cellprefix.length!=3 && cellprefix !="")
    {
        $("#berror").html(length_error);
        $("input[name='cellprefix']").addClass("chgborder");
        err_prefix=true;
        return false; 
    }
    else if(!$.isNumeric(cellprefix) && cellprefix !="")
    {
        $("#berror").html(numeric_error);
        $("input[name='cellprefix']").addClass("chgborder");
        err_prefix=true;
        return false;
    }
    else
    {
        if(err_prefix)
        {
            $("input[name='cellprefix']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==length_error || ferror==numeric_error || ferror==empty_cellprefix)
            {
                $("#berror").html("");
            }
            err_prefix=false;
        }
        return true;

    }

}
function chkCellnumber()
{
    var numeric_error="The phone number's number appears to be invalid, numbers only please.";
    var length_error="The phone number's number must have exactly four numbers";
    var cellnumber=$.trim($("input[name='cellnumber']").val());
    if(cellnumber.length!=4 && cellnumber !="")
    {
        $("#berror").html(length_error);
        $("input[name='cellnumber']").addClass("chgborder");
        err_number=true;
        return false; 
    }
    else if(!$.isNumeric(cellnumber) && cellnumber !="")
    {
        $("#berror").html(numeric_error);
        $("input[name='cellnumber']").addClass("chgborder");
        err_number=true;
        return false;
    }
    else
    {
        if(err_number)
        {
            $("input[name='cellnumber']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==length_error || ferror==numeric_error || ferror==empty_cellnumber)
            {
                $("#berror").html("");
            }
            err_number=false;
        }
        return true;

    }
}

function chkSFirstName()
{
    var fname=$.trim($("input[name='sfName']").val());
    if(fname !="")
    {
        if(err_sfname)
        {
            $("input[name='sfName']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror== empty_sfname)
            {
                $("#berror").html("");
            }
            err_sfname=false;
        }
    }
}
function chkSLastName()
{
    var lname=$.trim($("input[name='slName']").val());
    if(lname !="")
    {
        if(err_slname)
        {
            $("input[name='childlName']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror== empty_slname)
            {
                $("#berror").html("");
            }
            err_slname=false;
        }
       
    }
}
    
    
function chkSAddress()
{
    var address=$.trim($("input[name='saddress1']").val());
    if(address!="")
    {
        if(err_saddress)
        {
            $("input[name='saddress1']").removeClass("chgborder"); 
            var ferror= $("#berror").text();
            if(ferror==empty_saddress)
            {
                $("#berror").html("");
            }
            err_saddress == false;
          }
    }
}
function chkSCity()
{
    var city=$.trim($("input[name='scity']").val());
    if(city !="")
    {
        if(err_scity)
        {
            $("input[name='scity']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==empty_scity)
            {
                $("#berror").html("");
            }
            err_scity == false;
        }
    } 
}
  
function chkSState()
{
    var error_message="The state appears to be invalid, please use the two letter state abbreviation";
    var state=$.trim($("input[name='sstate']").val());
    if(!isValidState(state) && state != "")
    {
        $("#berror").html(error_message);
        $("input[name='sstate']").addClass("chgborder");
        err_sstate=true;
        return false;
    }
    else
    {
        if(err_sstate)
        {
            $("input[name='state']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==error_message || ferror==empty_sstate)
            {
                $("#berror").html("");
            }
            err_sstate=false;
        }
        return true;    
    } 
}
    
function chkSZip()
{
    var error_message="The zip code appears to be invalid. Please enter only numbers";
    var length_error="The zip code must have exactly five digits";
    var zip=$.trim($("input[name='szipcode']").val());
    if(!$.isNumeric(zip) && zip !="")
    {
        $("input[name='szipcode']").addClass("chgborder");
        $("#berror").html(error_message);
        $("input[name='szipcode']").focus();  
        err_szip=true;
        return false;
    }
    else if(zip.length != 5 && zip !="")
    {
        $("input[name='szipcode']").addClass("chgborder");
        $("#berror").html(length_error);
        $("input[name='szipcode']").focus();  
        err_szip=true;
        return false;
    }   
    else
    {
        if(err_szip)
        {
            $("input[name='szipcode']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==error_message || ferror==length_error || ferror==empty_szip)
            {
                $("#berror").html("");
            }
            err_szip=false;
        }
        return true;
    } 
    
}

    
function chkSCellarea()
{
    var numeric_error="The phone number's area code appears to be invalid, numbers only please.";
    var length_error="The phone number's area code must have exactly three digits";
    var scellarea=$.trim($("input[name='scellarea']").val());
    if(scellarea.length!=3 && scellarea != "")
    {
        $("#berror").html(length_error);
        $("input[name='scellarea']").addClass("chgborder");
        err_sarea=true;
        return false; 
    }
    else if(!$.isNumeric(scellarea) && scellarea !="")
    {
        $("#berror").html(numeric_error);
        $("input[name='scellarea']").addClass("chgborder");
        err_sarea=true;
        return false;
    }
    else
    {
        if(err_sarea)
        {
            $("input[name='scellarea']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==length_error || ferror==numeric_error || ferror==empty_scellarea)
            {
                $("#berror").html("");
            }
            err_sarea=false;
        }
        return true;
    }
}

function chkSCellprefix()
{
    var numeric_error="The phone number's prefix appears to be invalid, numbers only please.";
    var length_error="The phone number's prefix must have exactly three digits";
    var scellprefix=$.trim($("input[name='scellprefix']").val());
    if(scellprefix.length!=3 && scellprefix != "")
    {
        $("#berror").html(length_error);
        $("input[name='scellprefix']").addClass("chgborder");
        err_sprefix=true;
        return false; 
    }
    else if(!$.isNumeric(scellprefix) && scellprefix !="")
    {
        $("#berror").html(numeric_error);
        $("input[name='scellprefix']").addClass("chgborder");
        err_sprefix=true;
        return false;
    }
    else
    {
        if(err_sprefix)
        {
            $("input[name='scellprefix']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==length_error || ferror==numeric_error || ferror==empty_scellprefix)
            {
                $("#berror").html("");
            }
            err_sprefix=false;
        }
        return true;
    }
}
function chkSCellnumber()
{
    var numeric_error="The phone number's number appears to be invalid, numbers only please.";
    var length_error="The phone number's number must have exactly four digits";
    var scellnumber=$.trim($("input[name='scellnumber']").val());
    if(scellnumber.length!=4 && scellnumber != "")
    {
        $("#berror").html(length_error);
        $("input[name='scellnumber']").addClass("chgborder");
        err_snumber=true;
        return false; 
    }
    else if(!$.isNumeric(scellnumber) && scellnumber !="")
    {
        $("#berror").html(numeric_error);
        $("input[name='scellnumber']").addClass("chgborder");
        err_snumber=true;
        return false;
    }
    else
    {
        if(err_snumber)
        {
            $("input[name='scellnumber']").removeClass("chgborder");
            var ferror= $("#berror").text();
            if(ferror==length_error || ferror==numeric_error || ferror==empty_scellnumber)
            {
                $("#berror").html("");
            }
            err_snumber=false;
        }
        return true;
    }
}

function chkPayment()
{
    if($("input[name='payment']").is(':checked'))
    {
        if(err_paytype)
        {
           $("label[for='paytype']").removeClass("chgborder"); 
           var ferror= $("#payerror").text();
           if(ferror==empty_paytype)
           {
                $("#payerror").html("");
           }
           err_paytype == false;
        }
        return true;
     } 
}

function chkCard()
{
  var card_number=$.trim($("input[name='cardno']").val());
  var error_message="The card number seems to be invalid. It must have 16 digits";
    if(card_number != "" && !((/^\d{16}$/).test(card_number)))
    {
       $("#payerror").html(error_message);
        $("input[name='cardno']").addClass("chgborder");
        err_card=true;
        return false;
    }
    else
    {
        if(err_card == true )
        {
            $("input[name='cardno']").removeClass("chgborder");
            var ferror= $("#payerror").text();
            if(ferror==empty_cardno || ferror == error_message)
            {
               $("#payerror").html("");
            }
            err_card = false;
        }
        return true;
    }
    
}
function chkMonth()
{
 var error_message="The month entered is invalid. Please enter only numbers";
    var length_error="Please enter a valid month between 01 and 12";
    var month=$.trim($("input[name='expmonth']").val());
    if(!$.isNumeric(month) && month !="")
    {
        $("input[name='expmonth']").addClass("chgborder");
        $("#payerror").html(error_message);
        $("input[name='expmonth']").focus();  
        err_month=true;
        return false;
    }
    else if(parseInt(month)>12 || parseInt(month)<1)
    {
        $("input[name='expmonth']").addClass("chgborder");
        $("#payerror").html(length_error);
        $("input[name='expmonth']").focus();  
        err_month=true;
        return false;
    }   
    else
    {
        if(err_month)
        {
            $("input[name='expmonth']").removeClass("chgborder");
            var ferror= $("#payerror").text();
            if(ferror==error_message || ferror==length_error || ferror==empty_month || ferror==invalidyear)
            {
                $("#payerror").html("");
            }
            err_month=false;
        }
        return true;
    } 
}
function isValidYearFormat(year)
{
 if((/^\d{4}$/).test(year))
 {
     return true;
 }
 return false;
    
}
function isValidYear()
{
  var month=$.trim($("input[name='expmonth']").val());
  var year=$.trim($("input[name='expyear']").val());
  var currentDate= new Date();
  var currentYear=currentDate.getFullYear();
  var currentMonth=currentDate.getMonth();

  if(year>currentYear)
  {
    if(err_year)
    {
            $("input[name='expyear']").removeClass("chgborder");
            var ferror= $("#payerror").text();
            if(ferror==error_message || ferror==length_error || ferror==empty_year ||
              ferror==invalidyear)
            {
                $("#payerror").html("");
            }
            err_year=false;
    }
      return true;
  }
  if(year < currentYear)
  {
      $("#payerror").html(invalidyear);
      $("input[name='expyear']").focus();
      $("input[name='expyear']").addClass("chgborder");
      err_year=true;
      return false;
  }
  if(year==currentYear && month>=currentMonth+1)
  {
    if(err_month)
    {
            $("input[name='expmonth']").removeClass("chgborder");
            var ferror= $("#payerror").text();
            if(ferror==error_message || ferror==length_error || ferror==empty_month ||
              ferror==invalidyear)
            {
                $("#payerror").html("");
            }
            err_month=false;
    }
    return true;   
  }
  else
  {
      $("#payerror").html(invalidyear);
      $("input[name='expmonth']").focus();
      $("input[name='expmonth']").addClass("chgborder");
      err_month=true;
      return false;
  }
  
}
function chkYear()
{
  var year=$.trim($("input[name='expyear']").val());
  var error_message="The year format is invalid. Please enter year in YYYY format";
  if(!isValidYearFormat(year) && year!="")
  {
    $("input[name='expyear']").addClass("chgborder");
        $("#payerror").html(error_message);
        $("input[name='expyear']").focus();  
        err_year=true;
        return false;  
  }
  if(year!="" && err_year)
  {
     $("input[name='expyear']").removeClass("chgborder");
            var ferror= $("#payerror").text();
            if(ferror==error_message ||ferror==empty_year || ferror==invalidyear)
            {
                $("#payerror").html("");
            }
            err_year=false;
  }

  return true;          
}

function chkCvv()
{
 var cvv = $.trim($("input[name='cvv']").val()); 
 var error_message="The security code should be 3 digits";
 if(!((/^\d{3}$/).test(cvv)))
 {
   $("input[name='cvv']").addClass("chgborder");
        $("#payerror").html(error_message);
        $("input[name='cvv']").focus();  
        err_cvv=true;
        return false;    
 }
 if(cvv != "" && err_cvv)
 {
    $("input[name='cvv']").removeClass("chgborder");
    var ferror= $("#payerror").text();
    if(ferror==error_message)
    {
        $("#payerror").html("");
    }
    err_cvv=false; 
     
 }
  return true;  
}

function validateForm()
{
    var firstName=$.trim($("input[name='fName']").val());
    var lastName=$.trim($("input[name='lName']").val());
    var address=$.trim($("input[name='address1']").val());
    var city=$.trim($("input[name='city']").val());
    var state=$.trim($("input[name='state']").val());
    var zipcode=$.trim($("input[name='zipcode']").val());
    var cellarea=$.trim($("input[name='cellarea']").val());
    var cellprefix=$.trim($("input[name='cellprefix']").val());
    var cellnumber=$.trim($("input[name='cellnumber']").val());
    var sfirstName=$.trim($("input[name='sfName']").val());
    var slastName=$.trim($("input[name='slName']").val());
    var saddress=$.trim($("input[name='saddress1']").val());
    var scity=$.trim($("input[name='scity']").val());
    var sstate=$.trim($("input[name='sstate']").val());
    var szipcode=$.trim($("input[name='szipcode']").val());
    var scellarea=$.trim($("input[name='scellarea']").val());
    var scellprefix=$.trim($("input[name='scellprefix']").val());
    var scellnumber=$.trim($("input[name='scellnumber']").val());
    var cardno=$.trim($("input[name='cardno']").val());
    var month=$.trim($("input[name='expmonth']").val());
     var year=$.trim($("input[name='expyear']").val());
    var cvv = $.trim($("input[name='cvv']").val());
    if(firstName=="")
    {
        $("input[name='fName']").focus();
        $("#berror").html(empty_fname);
        $("input[name='fName']").addClass("chgborder");
        err_fname=true;
        return false;   
    }
    if(lastName=="")
    {
        $("input[name='lName']").focus();
        $("#berror").html(empty_lname);
        $("input[name='lName']").addClass("chgborder");
        err_lname=true;
        return false;   
    }
    if(address=="")
    {
        $("#berror").html(empty_address);
        $("input[name='address1']").focus();
        $("input[name='address1']").addClass("chgborder");
        err_address=true;
        return false;
    }
    if(city=="")
    {
        $("#berror").html(empty_city);
        $("input[name='city']").focus();
        $("input[name='city']").addClass("chgborder");
        err_city=true;
        return false;  
    }
          
    if(state=="")
    {
        $("#berror").html(empty_state);
        $("input[name='state']").focus();
        $("input[name='state']").addClass("chgborder");
        err_state=true;
        return false;  
    }
    else if(!chkState())
    {
        $("input[name='state']").focus();
        return false;   
    }
           
    if(zipcode=="")
    {
        $("#berror").html(empty_zip);
        $("input[name='zipcode']").focus();
        $("input[name='zipcode']").addClass("chgborder");
        err_zip=true;
        return false;  
    }
    else if(!chkZip())
    {
        $("input[name='zipcode']").focus();
        return false;   
    }
    if(cellarea =="")
    {
        $("#berror").html(empty_cellarea);
        $("input[name='cellarea']").focus();
        $("input[name='cellarea']").addClass("chgborder");
        err_area=true;
        return false;
    }
    else if(!chkCellarea())
    {
        $("input[name='cellarea']").focus();
        return false;
    }
    if(cellprefix =="")
    {
        $("#berror").html(empty_cellprefix);
        $("input[name='cellprefix']").focus();
        $("input[name='cellprefix']").addClass("chgborder");
        err_prefix=true;
        return false;
    }
    else if(!chkCellprefix())
    {
        $("input[name='cellprefix']").focus();
        return false;
    }
    if(cellnumber =="")
    {
        $("#berror").html(empty_cellnumber);
        $("input[name='cellnumber']").focus();
        $("input[name='cellnumber']").addClass("chgborder");
        err_number=true;
        return false;
    }
    else if(!chkCellnumber())
    {
        $("input[name='cellnumber']").focus();
        return false;
    }
        
    if(sfirstName=="")
    {
        $("input[name='sfName']").focus();
        $("#berror").html(empty_sfname);
        $("input[name='sfName']").addClass("chgborder");
        err_sfname=true;
        return false;   
    }
       
    if(slastName=="")
    {
        $("input[name='slName']").focus();
        $("#berror").html(empty_clname);
        $("input[name='slName']").addClass("chgborder");
        err_slname=true;
        return false;   
    }
    if(saddress=="")
    {
        $("#berror").html(empty_saddress);
        $("input[name='saddress1']").focus();
        $("input[name='saddress1']").addClass("chgborder");
        err_saddress=true;
        return false;
    }
    if(scity=="")
    {
        $("#berror").html(empty_city);
        $("input[name='scity']").focus();
        $("input[name='scity']").addClass("chgborder");
        err_scity=true;
        return false;  
    }
          
    if(sstate=="")
    {
        $("#berror").html(empty_state);
        $("input[name='sstate']").focus();
        $("input[name='sstate']").addClass("chgborder");
        err_sstate=true;
        return false;  
    }
    else if(!chkState())
    {
        $("input[name='sstate']").focus();
        return false;   
    }
           
    if(szipcode=="")
    {
        $("#berror").html(empty_zip);
        $("input[name='szipcode']").focus();
        $("input[name='szipcode']").addClass("chgborder");
        err_szip=true;
        return false;  
    }
    else if(!chkZip())
    {
        $("input[name='szipcode']").focus();
        return false;   
    }
    if(scellarea =="")
    {
        $("#berror").html(empty_scellarea);
        $("input[name='scellarea']").focus();
        $("input[name='scellarea']").addClass("chgborder");
        err_sarea=true;
        return false;
    }
    
    else if(!chkSCellarea())
    {
        $("input[name='scellarea']").focus();
        return false;
    }
    if(scellprefix =="")
    {
        $("#berror").html(empty_scellarea);
        $("input[name='scellprefix']").focus();
        $("input[name='scellprefix']").addClass("chgborder");
        err_sprefix=true;
        return false;
    }
    else if(!chkSCellprefix())
    {
        $("input[name='scellprefix']").focus();
        return false;
    }
    if(scellnumber =="")
    {
        $("#berror").html(empty_scellnumber);
        $("input[name='scellnumber']").focus();
        $("input[name='scellnumber']").addClass("chgborder");
        err_snumber=true;
        return false;
    }
    else if(!chkSCellnumber())
    {
        $("input[name='scellnumber']").focus();
        return false;
    }
    if(!$("input[name='payment']").is(":checked"))
    {
       $("label[for='paytype']").addClass("chgborder"); 
       $("#payerror").html(empty_paytype); 
       $("input[name='payment']").focus();
       err_paytype=true;
       return false;
    }
    if(cardno=="")
    {
        $("#payerror").html(empty_cardno);
        $("input[name='cardno']").focus();
        $("input[name='cardno']").addClass("chgborder");
        err_card=true;
        return false; 
    }
     else if(!chkCard())
    {
        $("input[name='cardno']").focus();
        return false;   
    }
    if(month=="")
    {
        $("#payerror").html(empty_month);
        $("input[name='expmonth']").focus();
        $("input[name='expmonth']").addClass("chgborder");
        err_month=true;
        return false; 
    }
    if(year=="")
    {
        $("#payerror").html(empty_year);
        $("input[name='expyear']").focus();
        $("input[name='expyear']").addClass("chgborder");
        err_year=true;
        return false; 
    }
    else if(!isValidYear())
    {

        return false;  
        
    }
    if(cvv == "")
    {
       $("#payerror").html(empty_cvv);
        $("input[name='cvv']").focus();
        $("input[name='cvv']").addClass("chgborder");
        err_cvv=true;
        return false;  
        
    }
    else if(!chkCvv())
    {
     return false;   
    }
    
    return true;
}





