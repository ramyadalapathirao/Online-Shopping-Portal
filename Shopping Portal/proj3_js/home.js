var category_name_array = new Array();
var category_image_array = new Array();
$(document).ready(function()
{
   localStorage.clear();
   cart = new shopping_cart("jadrn007PROJ3");
   $("span#count").html(cart.size());    
   fetchCategories();
    
});
function fetchCategories()
{
 $.get("/jadrn007/servlet/GetCategories",handler);   
}
function handler(response)
{
    var result = response.slice(0,-2);
    var categoryArray = result.split('||');
    for(var i=0;i<categoryArray.length;i++)
    {
        var element_array = categoryArray[i].split('|');
        category_name_array.push(element_array[0]);
        category_image_array.push(element_array[1]);
    }
    loadCategories();
    
}
function loadCategories()
{
 var display = "";
 for(var j=0;j<category_name_array.length;j++)
 { 
     display += "<div class='product_icon'>";
     var image = "<img src='/~jadrn007/proj1/up_imgs/"+category_image_array[j]+"' alt='category1' width='200px' height='200px'>";
     var name = category_name_array[j];
     display += "<a href='/jadrn007/products.html?id="+category_name_array[j]+"'>"+image+"</a>";
     display +="<p class='choc_type'>"+name+"</p>";
	 display += "</div>";				
 }
    $("#products_img_div").html(display);
    
}
