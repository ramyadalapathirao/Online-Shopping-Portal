import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class DupCheck extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    PrintWriter out = response.getWriter();
    response.setContentType("text/html");
    if(!(helpers.AuthHelper.isValidSession(request))) {
		out.print("logout"+"|");	
		return;
		}
    String sku=request.getParameter("sku");
    int onHand_qty=0;
    Vector<String[]> v = DBHelper.doQuery("SELECT sku,category_name,vendor_name,vendorModel,image FROM product,category,vendor where sku = '" + sku + "' and category.categoryID = product.catID and vendor.vendorID = product.venID;");     
            if(v.size()>0)
            {
             String result="";
             String[] result_columns=v.elementAt(0);
             Vector<String[]> onHand = DBHelper.doQuery("SELECT on_hand_quantity FROM on_hand where sku = \'" + sku + "\'");
            if(onHand.size()>0)
            {
                String[] onHand_columns=onHand.elementAt(0);
                onHand_qty=Integer.parseInt(onHand_columns[0]);
            }    
                
             result="DUP"+"|"+result_columns[1]+"|"+result_columns[2]+"|"+result_columns[3]+"|"+result_columns[4]+"|"+onHand_qty+"|";
             out.print(result);   
            }
            else
            {
             out.print("NOT A DUP"+"|");   
            }
    }
	
                                           
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



