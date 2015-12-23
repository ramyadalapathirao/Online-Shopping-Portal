import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class GetCategories extends HttpServlet {


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
    Vector<String[]> categories = DBHelper.doQuery("SELECT category_name,categoryImage FROM category;");
    String category_result="";

    if(categories.size()>0)
            {
             
             for(int i=0;i<categories.size();i++)
             {
                String cat_row[] = categories.elementAt(i);
                category_result+=cat_row[0]+"|"+cat_row[1]+"||";
             }
            }
    out.print(category_result);
        
}
	
                                           
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



