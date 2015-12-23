import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class GetCatVen extends HttpServlet {


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
    Vector<String[]> categories = DBHelper.doQuery("SELECT category_name FROM category;");
    String category_result="";
    String vendor_result="";
    String final_result="";
            if(categories.size()>0)
            {
             
             for(int i=0;i<categories.size();i++)
             {
                String cat_row[] = categories.elementAt(i);
                category_result+=cat_row[0]+"|";
             }
            }
    Vector<String[]> vendors = DBHelper.doQuery("SELECT vendor_name FROM vendor;");
            if(vendors.size()>0)
            {
              
               for(int i=0;i<vendors.size();i++)
             {
                String ven_row[] = vendors.elementAt(i);
                vendor_result+=ven_row[0]+"|";
             }
                
            }
    category_result=category_result.substring(0, category_result.length()-1);
    vendor_result=vendor_result.substring(0, vendor_result.length()-1);
    final_result=category_result+"||"+vendor_result; 
    out.print(final_result);
        
}
	
                                           
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



