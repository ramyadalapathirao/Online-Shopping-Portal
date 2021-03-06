<%@ page session="false" %>
<!DOCTYPE html>
<html>
   <!--    Ramya Krishna Dalapathirao    Account:  jadrn007
      CS645, Spring 2015
      Project #3
      -->
   <head>
      <title>Product Information</title>
      <meta charset="utf-8">
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="cache-control" content="no-cache, no-store" />
      <meta http-equiv="expires" content="-1" />
      <link href="http://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" type="text/css" />
      <link href="http://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" href="/jadrn007/proj3_css/font-awesome-4.3.0/css/font-awesome.min.css">
      <link rel="stylesheet" type="text/css" href="/jadrn007/proj3_css/proj3.css" />
      <link rel="stylesheet" type="text/css" href="/jadrn007/proj3_js/jquery-ui-1.11.4.custom/jquery-ui.theme.min.css" />
      <link rel="stylesheet" type="text/css" href="/jadrn007/proj3_js/jquery-ui-1.11.4.custom/jquery-ui.structure.min.css" />
      <script type="text/javascript" src="/jadrn007/proj3_js/jquery-1.11.1.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/jquery-ui-1.11.4.custom/jquery-ui.min.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/ajax_get_lib.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/search.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/shoppingcart.js"></script>
      <script type="text/javascript" src="/jadrn007/proj3_js/product_detail.js"></script>
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
                  <li><a href="/jadrn007/servlet/DispatchServlet?action=products" class="active"><i class="fa fa-tags"></i>Products</a></li>
                  <li><a href="/jadrn007/servlet/DispatchServlet?action=order"><i class="fa fa-cart-plus"></i>Order Now</a></li>
                  <li><a href="/jadrn007/servlet/DispatchServlet?action=contact"><i class="fa fa-phone"></i>Contact us</a></li>
                  <li><input type="text" size="25" name="search" placeholder="Search our Products" /><a id='search-icon' href='javascript:void(0)'><i class="fa fa-search"></i></a></li>
               </ul>
            </div>
         </div>
         <div id="detail">
            <p class="alignleft"><a href="/jadrn007/servlet/DispatchServlet?action=products">&lt;&lt; Cameras</a></p>
            <p class="aligncenter successMessage"></p>
            <p class="alignright"><a href="/jadrn007/servlet/DispatchServlet?action=order">&gt;&gt; View Cart</a></p>
            <div id="product_detail">
               <%= request.getAttribute("detail") %>  
            </div>
         </div>
      </div>
      <footer>
         &copy; Copyright 2015, Camera World 
      </footer>
   </body>
</html>