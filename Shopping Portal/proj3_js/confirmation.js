$(document).ready(function()
{
   $(".busy_wait").css("display","none");
   localStorage.clear();
   cart = new shopping_cart("jadrn007PROJ3");
    $('#count').text(cart.size());
    if(cart.size() == 0)
    {
     var content = "<h2>Shopping Cart is empty<h2>";
     content += "<a href='/jadrn007/servlet/DispatchServlet?action=products'>&lt;&lt; Continue Shopping</a>";
     $("#confirmation").html(content);
     return;
    }
    $("#confirmation>a").css("display","none");
    fetchCart();
    $("input[name='place_order']").on("click",placeOrder);
    $("input[name='cancel_order']").on("click",cancelOrder);
});
function fetchCart()
{
 var cartArray = cart.getCartArray();
  var subtotal = 0;
  var toWrite = "";
  for(i=0; i < cartArray.length; i++)
  {  
    toWrite += "<tr>";
     toWrite +="<td><img src=\'"+cartArray[i][4]+"\' alt='"+cartArray[i][0]+"'"+" width='100'"+" /></td>";
    toWrite +="<td><b class='title'>"+cartArray[i][3]+"</b><br />";
    toWrite += "<td>"+cartArray[i][1]+"</td>";
     var currentTotalPrice = cartArray[i][1]*cartArray[i][2];
     subtotal = subtotal + currentTotalPrice;
    
      toWrite += "<td class='price'>$"+parseFloat(currentTotalPrice).toFixed(2)+"</td>";
    toWrite += "</tr>";
    
  }
  $("table#confirm").html(toWrite); 
  var shipping=5.00;
  var tax=(((subtotal+shipping)*8)/100).toFixed(2);
  var total=parseFloat(subtotal)+parseFloat(shipping)+parseFloat(tax);
  var bill="<tr>";
  bill+="<td>Subtotal:</td><td> $"+subtotal.toFixed(2)+"</td></tr>";
  bill+="<tr><td>Tax:</td><td> $"+tax+"</td></tr>";
  bill+="<tr><td>shipping:</td><td> $"+shipping.toFixed(2)+"</td></tr>";
  bill+="--------";
  bill+="<tr><td><b>Total:</b></td><td> $"+total.toFixed(2)+"</td></tr>";
  $("#confirmation #confirmation_bill").html(bill);
}
function placeOrder()
{
    var cartArray = cart.getCartArray();
    var cartInfo="";
    for(i=0; i < cartArray.length; i++)
    {
        cartInfo += cartArray[i][0]+"|"+cartArray[i][1]+"||";
    }
		
		cartInfo = cartInfo.substring(0, cartInfo.length - 2);
    $(".busy_wait").css("display","inline");
    $.get("/jadrn007/servlet/DispatchServlet?action=confirmOrder&cookieValue="+cartInfo,orderConfirmation);
    
}
function orderConfirmation(response)
{
  $(".busy_wait").css("display","none");
  var currentSku;
  var cartArray = cart.getCartArray();
		$(cartArray).each(function() {	   
			currentSku = $(this)[0];
			cart.delete(currentSku);
		});
		
 $('#count').text(cart.size());
  $('#count').text(cart.size());
  if(response == "success")
  {
      var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
   var msg = "Your order has been placed<br />Your items are on the way..";
   $("#confirmation>h2").html(msg);
   $("#confirmation>h2").css("text-align","center");
   $("#confirmation>h2").css("color","green");
   $("#confirmation>a").css("display","inline");
   $("div.buttons").css("display","none");
      
  }
    
}
function cancelOrder()
{
  window.location.href="/jadrn007/servlet/DispatchServlet?action=home"; 
}