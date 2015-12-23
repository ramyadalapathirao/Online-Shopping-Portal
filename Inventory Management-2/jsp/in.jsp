<!DOCTYPE html>

<html>
   <!--    Ramya Krishna Dalapathirao    Account:  jadrn007
      CS645, Spring 2015
      Project #2
      -->
   <head>
      <title>Manage Inventory</title>
      <meta http-equiv="content-type" content="text/html;charset=utf-8" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="expires" content="0" />
      <link href="http://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" type="text/css" />
      <link href="http://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" type="text/css" href="/jadrn007/proj1.css" />
      <script type="text/javascript" src="/jquery/jquery.js"></script>
      <script type="text/javascript" src="/jadrn007/js/ajax_get_lib.js"></script>
      <script type="text/javascript" src="/jadrn007/js/recievedin.js"></script>
   </head>
   <body>
      <div id="wrapper">
      <div id="header">
         <div id="header-content">
            <div id="logo">
               <p id="heading"><strong>Camera W<img src="/jadrn007/images/cameralens.png" alt="eye" 
                  width="28"/>rld</strong></p>
               <!-- <p id="caption"><em><b>Capture it all...</b></em></p> -->
            </div>
        </div>
         </div>
         <div id="menu">
            <ul>
               <li><a href="/jadrn007/servlet/DispatchServlet?action=menu" id="sentOut">Merchandise Sent</a></li>
               <li><a href="/jadrn007/servlet/DispatchServlet?action=in" id="recievedIn" class="active">Merchandise Recieved</a></li>
               <li><a href="/jadrn007/servlet/DispatchServlet?action=logout" id="logout">Logout</a></li>
            </ul>
         </div>
         <div id="tabs">
            <div id="in">
               <div class="successMessage"></div>
               <div class="failureMessage"></div>
               <h1><u>Merchandise Recieved</u></h1>

            <form method="post" enctype="multipart/form-data" action="">
               <fieldset>
               <legend>Merchandise Details</legend>
                  <table>
                     <tr>
                        <td><label>SKU:<span class="imp"> *</span></label></td>
                        <td><input type="text" name="sku" size="10" placeholder="ABC-123"/></td>
                    </tr>
                    <tr>
                        <td><label>Date:<span class="imp"> *</span></label></td>
                        <td><input type="text" name="todaydate" placeholder="mm/dd/yyyy" /></td>   
                     </tr>
                     <tr>
                        <td><label>Category:</label></td>
                        <td><input type="text" name="category" readonly/></td>
                    </tr>
                    <tr>
                        <td><label id="vendor">Vendor:</label></td>
                        <td><input type="text" name="vendor" readonly/></td>
                   </tr>
                     <tr>
                        <td><label>Manufacturer's Identifier:</label></td>
                        <td><input type="text" name="identifier" size="15" readonly/></td>
                    </tr>
                    <tr>
                        <td><label>Quantity:<span class="imp"> *</span></label></td>
                        <td><input type="text" name="quantity" size="15"/></td>
                        <td><input type="hidden" name="onHandQty" size="15"/></td>
                    </tr>
                  </table>
                   <div id="displaypic"></div>
                    <div class="error" id="inerror">&nbsp;</div>
                   <hr />
                  <div>&nbsp;</div>
                  <div id="buttons">
                     <input type="reset" class="button" name="resetform" value="Reset" />
                     <input type="submit" class="button" name="submitform" value="Submit" />
                     <img src="/jadrn007/images/busy_wait.gif" class="busy_wait" id="add_busy_pic" alt="busy wait icon" />
                  </div>
               </fieldset>
               </form>
               <div>&nbsp;</div>
            </div>
            <!-- end of add -->
        </div>
    </div>
       <footer>
         &copy; Copyright 2015, Camera World 
      </footer>
</body>
</html>