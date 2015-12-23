import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.lang.Integer;
import sdsu.*;
import helpers.*;

public class GetOnHandQty extends HttpServlet 
{
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
     response.setContentType("text/html");
     PrintWriter out = response.getWriter();
    /*if(!(helpers.AuthHelper.isValidSession(request))) {
		out.print("logout");	
		return;
		}*/
        String sku=request.getParameter("sku");
    
        Vector<String[]> onHand_qty = DBHelper.doQuery("SELECT on_hand_quantity FROM on_hand where sku='"+sku+"';");
        if(onHand_qty.size()>0)
        {
         //on hand record is present
         String[] onHand_columns=onHand_qty.elementAt(0);
         String currentQuantity=onHand_columns[0];
         out.print(currentQuantity);
        }
        else
        {
             out.print("Sorry,the item is not available on hand");   
        }        
            
    }
	
                                           
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



