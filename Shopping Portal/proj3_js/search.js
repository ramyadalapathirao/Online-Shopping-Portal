$(document).ready(function(){
	 
$("input[name='search']").keypress(function(e)
{
    if(e.which == 13)
    {
     $(this).blur();
     $("#search-icon").focus().click();
    }
});
$("#search-icon").on("click",doSearch);
    
});
function doSearch()
{
 localStorage.clear();
 var search_query = $("input[name='search']").val();
 window.location.href="/jadrn007/servlet/GetProductsList?filter=search&text="+search_query;
    
}
