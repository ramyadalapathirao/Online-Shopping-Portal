var categories_array;
var vendors_array;

$("document").ready(function()
{
    $.get("/jadrn007/servlet/GetCatVen",handler);
    
    
    
});

function handler(response)
{
 $('.busy_wait').css("display","none");
 alert(response);
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
    }
}
function loadLists()
{
  var cat_list="";
  var ven_list="";
  cat_list+="<h2>Categories</h2>";
  cat_list+="<ul>";
  for(var i=0;i<categories_array.length;i++)
  {
   cat_list+="<li class='cat'>"+categories_array[i]+"</li>"   
  }
    cat_list+="</ul>";
    $('div#categories').html(cat_list);

    ven_list+="<h2>Vendors</h2>";
  ven_list+="<ul>";
  for(var j=0;j<vendors_array.length;j++)
  {
   ven_list+="<li class='ven'>"+vendors_array[j]+"</li>"   
  }
    ven_list+="</ul>";
    $('div#vendors').html(ven_list);
    
}