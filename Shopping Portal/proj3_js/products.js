var categories_array;
var vendors_array;
var err_qty=false;
var search_page =false;
var final_id ="";
var option = "";
var first_category;
var selected_id;
var selected_text;
var toSelectID;
var toSelectItem;
var title;
var add_to_cart = false;
var idx;
$(document).ready(function()
{
    
    $("#left-content").accordion({
    collapsible:true,
    heightStyle: "content",
    autoHeight: false,
    clearStyle: true,
    active:0,
    icons: {
            header: "ui-icon-circle-arrow-e",
            activeHeader: "ui-icon-circle-arrow-s"
        },
        
    });
     
    idx = document.URL.indexOf('?id=');
    toSelectItem = localStorage.getItem("get");
    //alert(toSelectItem);
     if (idx !== -1 && idx != null) 
     {
        //alert("inside");
        //alert(document.URL);
        //alert(decodeURIComponent(document.URL)); 
        var string = document.URL.split('?');
        var my_category = decodeURI(string[1]);
        
        var required = my_category.split('=');
        final_id = required[1];
        showProducts('cat',final_id);
    }
    
    
    if($("#search_content").length)
    {
     //alert("you are in search page"); 
     search_page = true;
     selected_id = "cat";
     selected_text = "DSLR";
     $("input[name='qty']").on("blur",function(){
        var y=$(this);
        checkQty(y);
     });
    $("td a.title").on("click",showDetail);
    $("td a img").on("click",showDetail);
    $("input[name='addCart']").on("click",addToCart);
        
    }
    else
    {
     //alert("you are in products page");
     //
     if(final_id == "" && toSelectID == null && toSelectItem == null)
     {
        first_category = "DSLR";
        showProducts('cat','DSLR');
        selected_id = "cat";
        selected_text = "DSLR";
      //$("#categories").find('ul li:first-child').find('a').css("font-weight","bold");
      //$("#categories ul>li a").;
     }
     search_page = false;
   }
     
    
    $("#dialog-modal").dialog({
             height: 280,
            width: 600,
            modal: true,
            autoOpen: false,
           resizable:false,
        	dialogClass:'customDialog',


        open: function(event, ui) {  
            jQuery('.ui-dialog-titlebar-close').removeClass("ui-dialog-titlebar-close").html('<span>X</span>');  
             $(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar").addClass("ui-state-error");
        }
        

    });
    
    $("#detail-dialog-modal").dialog({
             height: 800,
            width: 600,
            modal: true,
            autoOpen: false,
           resizable:false,
        	dialogClass:'customDialog',


        open: function(event, ui) {  
            jQuery('.ui-dialog-titlebar-close').removeClass("ui-dialog-titlebar-close").html('<span>X</span>');  
             $(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar").addClass("ui-state-error");
        }
        

    });
      $("#ui-id-4").css("height","20px");
    //$("#ui-id-4").css("display","none");
    //$(".ui-dialog-titlebar").hide()     
    
    
    
    cart = new shopping_cart("jadrn007PROJ3");
    $("span#count").html(cart.size());
    $.get("/jadrn007/servlet/DispatchServlet?action=getCategoryAndVendor",handler);
    
});
//Fetch categories and vendors and store in array
function handler(response)
{
 $('.busy_wait').css("display","none");
 //alert(response);
  if(response == "logout")
    {
     redirect();   
    }
    else
    {
        var catAndVen=response.split('||');
        categories_array = catAndVen[0].split('|');
        vendors_array = catAndVen[1].split('|');
        loadLists();
        toSelectID = localStorage.getItem("filter");
        //alert(toSelectID);
        if(toSelectID == null)
        {
          //alert("is null");  
        }
        else
        {
          toSelectItem = localStorage.getItem("get");
          //alert(toSelectItem);
          selected_id = toSelectID;
          selected_text = toSelectItem;
            if(toSelectID == "ven")
            {     
                $("#left-content").accordion("option", "active", 1); 
            }
            if(toSelectID == "price")
            {
                $("#left-content").accordion("option", "active", 2);
            }
            showProducts(toSelectID,toSelectItem);
            localStorage.clear();
        }
    }
}
//Load categories and vendors
function loadLists()
{
  var cat_list="";
  var ven_list="";
  var price_list="";

  cat_list+="<ul>";
  for(var i=0;i<categories_array.length;i++)
  {
   cat_list+="<li><a class='cat' href='javascript:;'>"+categories_array[i]+"</a></li>" ;  
  }
    cat_list+="</ul>";
    $('div#categories').html(cat_list);
    if(first_category == "DSLR")
    {
      //alert(first_category);
      $("#categories ul li:first a").css("font-weight","bold");  
    }
    if(toSelectID != null)
    {
     highlightItem(toSelectItem);   
        
    }
    if(final_id !=null && idx != null && idx !=-1 )
    {
        highlightItem(final_id);
    }
    
  ven_list+="<ul>";
  for(var j=0;j<vendors_array.length;j++)
  {
   ven_list+="<li><a class='ven' href='javascript:;'>"+vendors_array[j]+"</a></li>";   
  }
    ven_list+="</ul>";
    $('div#vendors').html(ven_list);

   price_list+="<ul>";
   price_list+="<li><a class='price' href='javascript:;'>Under $250</a></li>" ;
   price_list+="<li><a class='price' href='javascript:;'>$250-$500</a></li>" ;
   price_list+="<li><a class='price' href='javascript:;'>$500-$750</a></li>" ;
   price_list+="<li><a class='price' href='javascript:;'>$750-$1000</a></li>" ;
   price_list+="<li><a class='price' href='javascript:;'>$1000 and above</a></li>" ;
   price_list+="</ul>";
    $("div#price").html(price_list);

     $("#products #left-content li a").on("click",function(){
         selected_id = $(this).parents("div").attr("id");
         if(selected_id == "categories")
         {
          selected_id = "cat";   
         }
          if(selected_id == "vendors")
         {
          selected_id = "ven";   
         }
         selected_text = $(this).text();
         //alert(selected_id);
         //alert(selected_text);
         var offset = $('#header-content').offset()
        offset.top -= 0;

        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
         showProducts($(this).attr("class"),$(this).text());
     });
     
    
}
//Update content when a filter is selected
function showProducts(filter_by,text)
{
//alert("show products");
  //alert(text);
    highlightItem(text);
  
    if(filter_by == "cat" || filter_by == "ven")
    {
        title ="<h2 id='search_title' class='product_title'>"+text+" cameras</h2><hr />";   
    }
    if(filter_by == "price")
    {
      title ="<h2 id='search_title' class='product_title'>cameras with price range "+text+"</h2><hr />";
    }
    $.get("/jadrn007/servlet/DispatchServlet?action=getProducts&filter="+filter_by+"&text="+text,getProducts); 
}
//Highlight active link
function highlightItem(text)
{
    //alert(text);
      $("#left-content ul li a").each(function(){
    if($(this).text() == text)
    {
        //alert("inside if");   
        option = $(this);
             $("#left-content").find('a').css("font-weight","normal");
             //$("#categories").find('a').css("text-decoration","underline");
             option.css("font-weight","bold");
             
             return false;
    }
           
        });
    
}
function getProducts(response)
{
 var result=$.trim(response);
 if(search_page)
 {
  $("#search_content").html(title + response);   
 }
 else
 {
 $("#product_list").html(title + response);
 }
 $("input[name='qty']").on("blur",function(){
     var y=$(this);
     checkQty(y);
 });
  $("td a.title").on("click",showDetail);
  $("td a img").on("click",showDetail);
  $("input[name='addCart']").on("click",addToCart);
    
}
//add to cart
function addToCart()
{
    add_to_cart = true;
    var x=$(this);
    if(validateFeilds(x))
    {
        //alert("inside");
        //alert("added to cart");
    }
    else
    { 
      add_to_cart = false;
    }
}

function validateFeilds(obj)
{
    //alert("inside validate feilds");
 var QTY = obj.parents("tr").find("input[name='qty']").val(); 
   //alert(QTY);
 if(QTY == "")
 {
      $(this).parents("tr").find("input[name='qty']").focus();
       $(this).parents("tr").find("div.error").html("The quantity feild is empty");
        $(this).parents("tr").find("input[name='qty']").addClass("chgborder");
        err_qty = true;
        return false;
 }
 
else if(!checkQty(obj))
{
       $(this).parents("tr").find("input[name='qty']").focus();
       return false;
}
    //alert("returning true");
return true;   
    
}

function slideDiv()
{
 //alert("slide div");
 $("div#features").slideToggle("slow");
 var features=$("#show_features").val();
 $(this).closest('td').find('div#features').html(features);
}
function checkQty(ref)
{
  //alert("check qty");
  var qty_on_hand=ref.parents("td").find("#onHand_qty").val();
  
  //alert(qty_on_hand);
   var invalid_qty="Please enter a valid quantity";
   var negative_qty="Quantity cannot be zero or negative";
   var qty_unavailable="Sorry only "+qty_on_hand+" item(s) are available";
    var quantity=ref.parents("tr").find("input[name='qty']").val();
    
    if(quantity !="" && !validQty(quantity))
    {
        ref.parents("tr").find("div.error").html(invalid_qty);
         ref.parents("tr").find("input[name='qty']").addClass("chgborder");
        err_qty = true;
        return false;
    }
    else if(quantity !="" && !positiveQty(quantity))
    {
        ref.parents("tr").find("div.error").html(negative_qty);
         ref.parents("tr").find("input[name='qty']").addClass("chgborder");
        err_qty = true;
        return false;
        
    }
    /*else if(quantity !="" && !checkOnHand(ref))
    {
        //alert(checkOnHand(ref));
        alert("should not come inside");
        err_qty = true;
        return false;
        
    } */

    else
    {
        

        if(err_qty)
        {
         ref.parents("tr").find("input[name='qty']").removeClass("chgborder");
          var error = ref.parents("tr").find("div.error").text();
          if (error == invalid_qty || error == negative_qty || error == qty_unavailable) {
                ref.parents("tr").find("div.error").html("");
                ref.parents("tr").find("input[name='qty']").removeClass("chgborder");
            }
          err_qty=false;  
        }
        checkOnHand(ref);
        
      return true;  
    }
}
function checkOnHand(reference)
{
   //alert("check on hand");
   $.ajax({
    url : "/jadrn007/servlet/DispatchServlet?action=getOnhandQuantity&sku="+reference.parents("tr").find("#hidden_item_sku").val(),
    type: "get",
    context: self,
    success: function (response) {
        var requestedQuantity = reference.parents("tr").find("input[name='qty']").val();
        var addedQty = cart.getQuantity(reference.parents("tr").find("#hidden_item_sku").val());
        var totalRequestedQty = parseInt(requestedQuantity) + parseInt(addedQty) ;
        if(response >= totalRequestedQty)
        {
            //alert("returning true");
            reference.parents("tr").find("div.error").html("");
            reference.parents("tr").find("input[name='qty']").removeClass("chgborder");
            if(add_to_cart)
            {
              var sku = reference.parents("tr").find("#hidden_item_sku").val();
              //alert(sku);
              var quantity = reference.parents("tr").find("input[name='qty']").val();
              //alert(quantity);
              var price = reference.parents("tr").find("#hidden_item_price").val();
              var title = reference.parents("tr").find("#hidden_item_title").val();
              var image = reference.parents("tr").find("#hidden_item_image").val();
              cart.add(sku,quantity,price,title,image);
              //alert(cart.size());
              $("span#count").html(cart.size());
              add_to_cart = false;
              showDialog(sku,price,title,image,quantity);  
             }
             return true;   
        }
        else
        {
            if(add_to_cart)
            {
             add_to_cart = false;
            }
            if(addedQty > 0)
            {
                reference.parents("tr").find("div.error").html("You already have "+addedQty+" item(s) in cart. Only "+response+" item(s)                    are in stock");
                reference.parents("tr").find("input[name='qty']").addClass("chgborder");
                err_qty = true;
                //alert("returning false");
                return false;   
            }
            else
            {
                reference.parents("tr").find("div.error").html("Sorry only "+response+" item(s) left in stock");
                reference.parents("tr").find("input[name='qty']").addClass("chgborder");
                err_qty = true;
                //alert("returning false");
                return false; 
        
            }
     
        }
    }
}); 
    
    
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

//Dialog box
 
function showDialog(sku,price,title,image,qty)
{
    //alert("show dialog");
    var msg=qty+" item(s) added to cart";
    $("span#ui-id-4").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' />"+"  "+msg);
    //$(“#ui-id-4”).addClass(“addSuccessMessage”);
    //$("#addSuccessMessage").html("<img src='/~jadrn007/proj1/images/success.png' alt='success' width='20' />"+"  "+msg);
    var content="<table>";
    content+="<tr><td><img src=\'"+image+"\' width='150' alt='image' /></td>";
    content+="<td>"+title+"</td>";
    content+="<td><span class='price'>$"+price+"</span></td></tr></table><hr />";
    $("#continue").on("click",function(){
          $("#dialog-modal").dialog('close');
    });
    $("#view_cart").on("click",function(){
          //alert("go to order page");
    });
    content+="<p class='dialog_buttons'><a href='/jadrn007/servlet/DispatchServlet?action=order' id='view_cart'>View Cart</a><a href='javascript:void(0)' id='continue'>Continue Shopping</a></p>";
    
    $("#item_details").html(content);
    $("#continue").on("click",function(){
            
          $("#dialog-modal").dialog('close');
    });
    $("#view_cart").on("click",function(){
         // alert("go to order page");
    });
     $("#dialog-modal").dialog('open');
    
    
    
}
function showDetail()
{
    //alert("show detail");
 localStorage.setItem("filter",selected_id);
 localStorage.setItem("get",selected_text);
 var sku = $(this).parents("tr").find("#hidden_item_sku").val();
 //alert(sku);
  window.location.href="/jadrn007/servlet/GetProductsList?filter=detail&text="+sku;
    
}

