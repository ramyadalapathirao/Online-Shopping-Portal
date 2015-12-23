print <<END_HTML;
Content-type: text/html


<!DOCTYPE html>
<html>
<!--    Ramya Krishna Dalapathirao    Account:  jadrn013
        CS645, Spring 2015
        Project #1
-->
<head>
	<title>Add Item</title>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <link href="http://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="/~jadrn007/proj1/proj1.css" />
    <script type="text/javascript" src="/~jadrn007/proj1/js/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="/~jadrn007/proj1/js/ajax_get_lib.js"></script>
    <script type="text/javascript" src="/~jadrn007/proj1/js/additem.js"></script>
</head>
<body>
<div id="tabs">
        <div id="additem">
            <h1>Add an Item to Inventory</h1>
            
            <form id="add" method="post" action="">
                <div class="error" >&nbsp;</div>
               <table>
                    <tr><td><label>SKU:<span class="imp"> *</span></label></td>
		                  <td><input type="text" name="sku" size="25"/></td></tr>
                   <tr><td><label>Category:<span class="imp"> *</span></label></td>
                       <td>
                          <select name="category">
                              <option>None</option>
                            </select></td>
                    </tr>
                    <tr><td><label>Vendor:<span class="imp"> *</span></label></td>
                       <td>
                          <select name="vendor">
                              <option>None</option>
                            </select></td>
                    </tr>
                   <tr><td><label>Manufacturer's Identifier:<span class="imp"> *</span></label></td>
		                  <td><input type="text" name="identifier" size="25"/></td></tr>
                   <tr><td><label>Description:<span class="imp"> *</span></label></td>
		                  <td><textarea name="description" placeholder="product description" rows="5" cols="30"/></textarea></td></tr>
                    <tr><td><label>Product Features:<span class="imp"> *</span></label></td>
		                  <td><textarea name="features" placeholder="product features" rows="5" cols="30"/></textarea></td></tr>
                    <tr><td><label>Cost:<span class="imp"> *</span></label></td>
		                  <td><input type="text" name="cost" size="25"/></td></tr>
                    <tr><td><label>Retail:<span class="imp"> *</span></label></td>
		                  <td><input type="text" name="retail" size="25"/></td></tr>
                    <tr><td><label>Product Image:<span class="imp"> *</span></label></td>
		                  <td><input type="file" name="photo" /></td></tr>
                
               </table>
            <div>&nbsp;</div>
             
            <div id="buttons">
             
             <input type="reset" class="button" name="reset" value="Clear" />
             <input type="submit" class="button" name="submitform" value="Submit" />
             </div>
             
            </form>
            <div>&nbsp;</div>
        </div><!-- end of add -->
    </div>
</body>
</html>
END_HTML

    