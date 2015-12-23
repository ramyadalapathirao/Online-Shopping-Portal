import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class GetProductsList extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    PrintWriter out = response.getWriter();
    response.setContentType("text/html");
    /*if(!(helpers.AuthHelper.isValidSession(request))) {
		out.print("logout");	
		return;
		}*/
    String filter = request.getParameter("filter");
    String text = request.getParameter("text");
    String result="";
    if(filter.equals("cat"))
    {
       Vector<String[]> get_cat_products = DBHelper.doQuery("select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and categoryID=(select categoryID from category where category_name=\'"+text+"\');"); 
        
        result = DBHelper.getProductsList(get_cat_products);
       
        
    }
    if(filter.equals("ven"))
    {
        Vector<String[]> get_ven_products =DBHelper.doQuery("select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and vendorID=(select vendorID from vendor where vendor_name=\'"+text+"\');"); 
       
        result = DBHelper.getProductsList(get_ven_products);
        
    }
            
    if(filter.equals("price"))
    {
      String query = "";
      String price_text = text.trim();
      if(price_text.equals("Under $250"))
      {
         query = "select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and retail<250 order by retail"; 

      }
      if(price_text.equals("$250-$500"))
      {
          query = "select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and retail>=250 and retail<500 order by retail";
      }
      if(price_text.equals("$500-$750"))
      {
          query = "select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and retail>=500 and retail<750 order by retail";
       
      }
      if(price_text.equals("$750-$1000"))
      {
          query = "select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and retail>=750 and retail<1000 order by retail";
       
      }
      if(price_text.equals("$1000 and above"))
      {
          query = "select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and retail>=1000 order by retail";
      }
        Vector<String[]> get_price_products = DBHelper.doQuery(query);
        result = DBHelper.getProductsList(get_price_products);
    }
            
    if(filter.equals("search"))
    {
       Vector<String[]> search_query = DBHelper.doQuery("select sku,category_name,vendor_name,vendorModel,product.description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and (vendorModel like '%"+text+"%' or product.description like '%"+text+"%' or features like '%"+text+"%' or CONCAT_WS(' ',vendor_name,vendorModel) like '%"+text+"%' or CONCAT_WS(' ',vendor_name,category_name) like '%"+text+"%' or CONCAT_WS(' ',category_name,vendor_name) like '%"+text+"%' or CONCAT_WS(' ',category_name,vendorModel) like '%"+text+"%' or category_name like '%"+text+"%' or vendor_name like '%"+text+"%');"); 
        result +="<h2 class='product_title'>Search result for '"+text+"' </h2><hr />";
        String temp_result = DBHelper.getProductsList(search_query);
        if(temp_result.equals("No products available at this time"))
        {
         result +="Your search returned no results.";   
        }
        else
        {
        result += temp_result;
        }
        request.setAttribute("searchResult",result);
        request.getRequestDispatcher("/WEB-INF/proj3_jsp/search_products.jsp").forward(request, response);
        
    }
    if(filter.equals("detail"))
    {
      Vector<String[]> get_detail_product =DBHelper.doQuery("select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and sku=\'"+text+"\';"); 
        result = DBHelper.getProductDetail(get_detail_product);
        request.setAttribute("detail",result);
        request.getRequestDispatcher("/WEB-INF/proj3_jsp/product_detail.jsp").forward(request, response);
        
    }
    out.print(result);
        
}
    
                                           
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



