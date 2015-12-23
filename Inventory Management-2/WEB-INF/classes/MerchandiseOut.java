import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.lang.Integer;
import sdsu.*;
import helpers.*;

public class MerchandiseOut extends HttpServlet 
{
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
     response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    if(!(helpers.AuthHelper.isValidSession(request))) {
		out.print("logout");	
		return;
		}
    String sku=request.getParameter("sku");
    String date=request.getParameter("date");
    String quantity=request.getParameter("quantity");
    int insert_result = DBHelper.doUpdate("INSERT INTO merchandise_out values('"+sku+"','"+date+"','"+quantity+"');");    
   
    if(insert_result == -1)
    {
        out.print("Sorry could not send merchandise");
    }
    else
    {
     //insert successful
        Vector<String[]> onHand_qty = DBHelper.doQuery("SELECT on_hand_quantity FROM on_hand where sku='"+sku+"';");
        if(onHand_qty.size()>0)
        {
         //on hand record is present
         String[] onHand_columns=onHand_qty.elementAt(0);
         String currentQuantity=onHand_columns[0];
         int totalQuantity=Integer.parseInt(currentQuantity)-Integer.parseInt(quantity);
         int update_result = DBHelper.doUpdate("UPDATE on_hand set last_date_modified='"+date+"',on_hand_quantity="+totalQuantity+" where sku='"+sku+"';");
            if(update_result == -1)
            {
             out.print("sorry could not update onhand");   
            }
            else
            {
             out.print ("success");   
            }
        }
        else
            {
             out.print("Sorry,the item is not available on hand");   
            }        
    }
            
    }
	
                                           
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



