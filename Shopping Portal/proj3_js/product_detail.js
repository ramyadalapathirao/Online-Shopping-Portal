var err_qty = false;
var add_to_cart = false;
$(document).ready(function()
{
    cart = new shopping_cart("jadrn007PROJ3");
    $("span#count").html(cart.size());
    $(".successMessage").css("display","none");
    $(".alignright").css("display","none");
    $("input[name='detail_qty']").on("blur",chkQuantity);
    $("input[name='addCart']").on("click",addProduct);
});
function chkQuantity()
{
   var qty_available=$("#onHand_qty").val();
   var invalid_qty="Please enter a valid quantity";
   var negative_qty="Quantity cannot be zero or negative";
   var qty_unavailable="Sorry we have only "+qty_available +" item(s) in stock";
   var quantity=$.trim($("input[name='detail_qty']").val());
   if(quantity !="" && !validQty(quantity))
   {
        $("#all_details .error").html(invalid_qty);
        $("input[name='detail_qty']").addClass("chgborder");
        err_qty = true;
        return false;
    }
    else if(quantity !="" && !positiveQty(quantity))
    {
        $("#all_details .error").html(negative_qty);
        $("input[name='detail_qty']").addClass("chgborder");
        err_qty = true;
        return false;
        
    }
    else if(quantity !="")
    {

        if(err_qty)
        {
          $("input[name='detail_qty']").removeClass("chgborder");
          var error = $("#all_details .error").text();
          if (error == invalid_qty || error == negative_qty || error == qty_unavailable) {
               $("#all_details .error").html("");
                $("input[name='detail_qty']").removeClass("chgborder");
            }
          err_qty=false;  
        }
       checkOnHandQty();
      return true;  
    }
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


function addProduct()
{
  add_to_cart = true;
 if(validate())
 {   
 }
 else
 {
     add_to_cart = false;
 }
}
function validate()
{
 var QTY = $("input[name='detail_qty']").val(); 
   //alert(QTY);
 if(QTY == "")
 {
      $("input[name='detail_qty']").focus();
      $("#all_details .error").html("The quantity feild is empty");
      $("input[name='detail_qty']").addClass("chgborder");
      err_qty = true;
      return false;
 }
else if(!chkQuantity())
{
       $("input[name='detail_qty']").focus();
       return false;
}
    //alert("returning true");
return true;   
       
}
function checkOnHandQty()
{
   $.ajax({
    url : "/jadrn007/servlet/DispatchServlet?action=getOnhandQuantity&sku="+$("#hidden_item_sku").val(),
    type: "get",
    context: self,
    success: function (response) {
        var requestedQuantity = $("input[name='detail_qty']").val();
        var addedQty = cart.getQuantity($("#hidden_item_sku").val());
        var totalRequestedQty = parseInt(requestedQuantity) +parseInt(addedQty) ;
        if(response >= totalRequestedQty)
        {
            $("#all_details .error").html("");
            $("input[name='detail_qty']").removeClass("chgborder");
            if(add_to_cart)
            {
                var sku = $("#hidden_item_sku").val();
                var quantity = $("input[name='detail_qty']").val();
                var price = $("#hidden_item_price").val();
                var title = $("#hidden_item_title").val();
                var image = $("#hidden_item_image").val();
                cart.add(sku,quantity,price,title,image);
                $("span#count").html(cart.size()); 
                var offset = $('#header-content').offset()
                offset.top -= 0;
                $('html, body').animate({
                    scrollTop: offset.top,
                    scrollLeft: offset.left
                });
                if(quantity == 1)
                {
                    $(".successMessage").css("display", "block").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' />"+quantity+" item is added to cart"); 
                    
                }
                else
                {
                    $(".successMessage").css("display", "block").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' />"+quantity+" items are added to cart");  
                    
                }
 
                $(".alignright").css("display","inline");
                $(".successMessage").css("border", "2px solid green");
                add_to_cart = false;
                return true;   
            }
        }
        else
        {
        add_to_cart = false;
        if(addedQty > 0)
        {
            $("#all_details .error").html("You already have "+addedQty+" items in cart. Only "+response+" item(s) in stock");
            $("input[name='detail_qty']").addClass("chgborder");
            err_qty = true;
            return false;   
        }
        else
        {
            $("#all_details .error").html("Sorry only "+response+" item(s) left in stock");
            $("input[name='detail_qty']").addClass("chgborder");
            err_qty = true;
            return false; 
        
        }
     
        }
    }
}); 
    
}