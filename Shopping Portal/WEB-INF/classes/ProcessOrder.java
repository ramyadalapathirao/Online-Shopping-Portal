import java.io.*;
import java.text.*;
import java.util.*;
import java.util.regex.Pattern;
import javax.servlet.*;
import javax.servlet.http.*;

import sdsu.*;
import helpers.*;

public class ProcessOrder extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    PrintWriter out = response.getWriter();
    response.setContentType("text/html");
    int success=0;
    /*if(!(helpers.AuthHelper.isValidSession(request))) {
		out.print("logout");	
		return;
		}*/
    String cookieValue = request.getParameter("cookieValue");
    DateFormat formatter = new SimpleDateFormat("MM-dd-yyyy");
    String date = formatter.format(new Date());
    Cookie[] cookie_jar = request.getCookies();
    if (cookie_jar != null)
    {
	   for (int i =0; i< cookie_jar.length; i++)
	   {
		  Cookie aCookie = cookie_jar[i];
        //out.println(aCookie.getValue());
            String cookie_name = aCookie.getName();
		    if(cookie_name.equals("jadrn007PROJ3"))
            {
                aCookie.setValue("");
                aCookie.setPath("/");
                aCookie.setMaxAge(0);
                response.addCookie(aCookie);
            }
        }
    }
         String[] products = cookieValue.split(Pattern.quote("||"));
         //out.println(products.length);
         for(int j=0;j<products.length;j++)
         {
          String aProduct = products[j];
          //out.println ("aProduct : " + aProduct);
          String[] product_details = aProduct.split(Pattern.quote("|"));
          String sku = product_details[0];
          //out.println(sku);
          String quantity = product_details[1];
          int insert_result = DBHelper.doUpdate("INSERT INTO merchandise_out values('"+sku+"','"+date+"','"+quantity+"');");    
   
            if(insert_result == -1)
            {
                success = 0;
                out.print("Sorry an error occurred");
            }
             else
             {
                Vector<String[]> onHand_qty = DBHelper.doQuery("SELECT on_hand_quantity FROM on_hand where sku='"+sku+"';");
                if(onHand_qty.size()>0)
                {
                    //on hand record is present
                    String[] onHand_columns=onHand_qty.elementAt(0);
                    String currentQuantity=onHand_columns[0];
                    int totalQuantity=Integer.parseInt(currentQuantity)-Integer.parseInt(quantity);
                    int update_result = DBHelper.doUpdate("UPDATE on_hand set               last_date_modified='"+date+"',on_hand_quantity="+totalQuantity+" where sku='"+sku+"';");
                    if(update_result == -1)
                    {
                        success = 0;
                        out.print("sorry could not update onhand");   
                    }
                    else
                    {
                        success = 1;
                       
             //request.getRequestDispatcher("/WEB-INF/proj3_jsp/confirmation.jsp").forward(request, response);
             
                    }
                }
                else
                {
                    success = 0;
                    out.print("Sorry,the item is not available on hand");   
                }        
            } 
                 
                 
         }//end of for loop
            if(success == 1)
            {
               out.print ("success");  
            }

    }
        
    
                                           
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



