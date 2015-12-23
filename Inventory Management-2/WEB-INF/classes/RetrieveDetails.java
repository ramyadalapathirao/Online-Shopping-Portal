import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.lang.Integer;

import sdsu.*;
import helpers.*;

public class RetrieveDetails extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    HttpSession session = request.getSession(false);
    if(session == null) 
    {    
        ServletContext context = getServletContext();       
        RequestDispatcher dispatcher 
            = request.getRequestDispatcher("/jsp/error.jsp");   
        dispatcher.forward(request, response);              
        }
    String sku=request.getParameter("sku");
    Vector<String[]> v = DBHelper.doQuery("SELECT catID, venID, vendorModel, image FROM product where sku = \'" + sku + "\'");          
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    if(v.size()>0)
    {
      String columns[]=v.elementAt(0);
      String category_name="";
      String vendor_name="";
      String result="";
      int onHand_qty=0;
      Vector<String[]> category= DBHelper.doQuery("SELECT category_name FROM category where categoryID = \'" + columns[0] + "\'");  
      if(category.size()>0)
      {
       String[] category_columns=category.elementAt(0);
       category_name=category_columns[0];
      }
      
      Vector<String[]> vendor= DBHelper.doQuery("SELECT vendor_name FROM vendor where vendorID = \'" + columns[1] + "\'");  
      if(vendor.size()>0)
      {
       String[] vendor_columns=vendor.elementAt(0);
       vendor_name=vendor_columns[0];
      } 
      Vector<String[]> onHand = DBHelper.doQuery("SELECT on_hand_quantity FROM on_hand where sku = \'" + sku + "\'");
      if(onHand.size()>0)
      {
        String[] onHand_columns=onHand.elementAt(0);
        onHand_qty=Integer.parseInt(onHand_columns[0]);
      }
        
      result=category_name+"|"+vendor_name+"|"+columns[2]+"|"+columns[3]+"|"+onHand_qty+"|";
      out.print(result);
    }
    }
	
                                           
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



