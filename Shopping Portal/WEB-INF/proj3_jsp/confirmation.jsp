
<%@ page session="false" %>
<html>
   <!--    Ramya Krishna Dalapathirao    Account:  jadrn007
      CS645, Spring 2015
      Project #3
      -->
   <head>
      <title>Checkout</title>
      <meta charset="utf-8">
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="cache-control" content="no-cache, no-store" />
      <meta http-equiv="expires" content="-1" />
      <link href="http://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" type="text/css" />
      <link href="http://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" href="/jadrn007/proj3_css/font-awesome-4.3.0/css/font-awesome.min.css">
      <link rel="stylesheet" type="text/css" href="/jadrn007/proj3_css/proj3.css" />
      <link rel="stylesheet" type="text/css" href="/jadrn007/proj3_js/jquery-ui-1.11.2.custom/jquery-ui.theme.min.css" />
      <script type="text/javascript" src="/jadrn007/proj3_js/jquery-1.11.1.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/jquery-ui-1.11.2.custom/jquery-ui.min.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/ajax_get_lib.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/shoppingcart.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/search.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/confirmation.js"></script>
   </head>
   <body>
      <div id="wrapper">
         <div id="header">
            <div id="header-content">
               <div id="logo">
                  <p><span id="heading"><strong>Camera W<img src="/jadrn007/images/cameralens.png" alt="eye" 
                     width="28"/>rld</strong></span><span id="cart"><a href="/jadrn007/servlet/DispatchServlet?action=order"><i class="fa fa-shopping-cart fa-2x"></i>Cart(<span id="count">0</span>)</a></span></p>
                  <p id="caption"><em><b>Capture it all...</b></em></p>
               </div>
            </div>
            <div id="menu">
               <ul>
                  <li><a href="/jadrn007/servlet/DispatchServlet?action=home"><i class="fa fa-home"></i>Home</a></li>
                  <li><a href="/jadrn007/servlet/DispatchServlet?action=products"><i class="fa fa-tags"></i>Products</a></li>
                  <li><a href="/jadrn007/servlet/DispatchServlet?action=order"  class="active"><i class="fa fa-cart-plus"></i>Order Now</a></li>
                  <li><a href="/jadrn007/servlet/DispatchServlet?action=contact"><i class="fa fa-phone"></i>Contact us</a></li>
                  <li><input type="text" size="25" name="search" placeholder="Search our Products" /><a id='search-icon' href='javascript:void(0)'><i class="fa fa-search"></i></a></li>
               </ul>
            </div>
         </div>
         <div id="confirmation">
            <a href="/jadrn007/servlet/DispatchServlet?action=products">&lt;&lt; Continue Shopping</a>
            <h2>Please verify your details and confirm the order</h2>
            <div>
               <h2>Order Summary</h2>
               <div class="left">
                  <h3>Shipping address</h3>
                  <p>Name: <%= request.getParameter("fName") %> <%= request.getParameter("lName") %></p>
                  <p>Address: <%= request.getParameter("address1") %></p>
                  <p><%= request.getParameter("address2") %></p>
                  <p>City: <%= request.getParameter("city") %></p>
                  <p>State: <%= request.getParameter("state") %></p>
                  <p>Zip: <%= request.getParameter("zipcode") %></p>
                  <p>Contact: <%= request.getParameter("cellarea") %>-<%= request.getParameter("cellprefix") %>-<%= request.getParameter("cellnumber") %></p>
               </div>
               <!-- end of left -->
               <table id="confirm">
               </table>
            </div>
            <div>
               <h2>Payment Information</h2>
               <div class='right'>
                  <table id="confirmation_bill">
                  </table>
               </div>
               <h3>Payment Method</h3>
               <p><%= request.getParameter("payment") %> | Last Digits: <%= request.getParameter("cardno").substring(12) %></p>
               <br />
               <h3>Billing address</h3>
               <p>Name: <%= request.getParameter("sfName") %> <%= request.getParameter("slName") %></p>
               <p>Address: <%= request.getParameter("saddress1") %></p>
               <p><%= request.getParameter("saddress2") %></p>
               <p>City: <%= request.getParameter("scity") %></p>
               <p>State: <%= request.getParameter("sstate") %></p>
               <p>Zip: <%= request.getParameter("szipcode") %></p>
               <p>Contact: <%= request.getParameter("scellarea") %>-<%= request.getParameter("scellprefix") %>-<%= request.getParameter("scellnumber") %></p>
            </div>
            <div class="buttons">
               <input type="button" class="button" name="cancel_order" value="Cancel" />
               <input type="submit" class="button green" name="place_order" value="Place Order" />
               <img src="/jadrn007/images/busy_wait.gif" class="busy_wait" id="add_busy_pic" width="50" alt="busy wait icon" />
            </div>
         </div>
      </div>
      <footer>
         &copy; Copyright 2015, Camera World 
      </footer>
   </body>
</html>