import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;



public class DispatchServlet extends HttpServlet {
	private String command;
	private String toDo=null;

	
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {
	
	//HttpSession session = request.getSession(false);

		
	command = request.getParameter("action");
        if(command == null)
                toDo = "/proj3.html";
        else if(command.equals("home"))
            toDo = "/proj3.html";
        else if(command.equals("products"))
            toDo = "/products.html";
        else if(command.equals("order"))
            toDo = "/order.html";
        else if(command.equals("billing"))
            toDo = "/billing.html";
        else if(command.equals("contact"))
            toDo = "/contact.html";
	else if(command.equals("place_order"))
		toDo = "/WEB-INF/proj3_jsp/confirmation.jsp";
    else if(command.equals("getOnhandQuantity"))
		toDo = "/servlet/GetOnHandQty";
    else if(command.equals("getCategoryAndVendor"))
		toDo = "/servlet/GetCatVen";
    else if(command.equals("getProducts"))
		toDo = "/servlet/GetProductsList";
    else if(command.equals("search"))
		toDo = "/WEB-INF/proj3_jsp/search_products.jsp";
    else if(command.equals("confirmOrder"))
		toDo = "/servlet/ProcessOrder";
    
        
	else
		toDo = "/proj3.html";
				
	processRequest(request, response);
	}
        
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException { 
            doPost(request, response);
            }       
	
    public void processRequest(HttpServletRequest request,
                    HttpServletResponse response)
                                throws  ServletException  {
    	ServletContext context=null;
	RequestDispatcher dispatcher = null;
    	try {
	    context = getServletContext();	
	    dispatcher = request.getRequestDispatcher(toDo);	
	    dispatcher.forward(request, response);	
	    }
	catch(Exception e) {
	    System.out.print("ToDo is " + toDo + " and dispatcher is " +
	    dispatcher);
	    e.printStackTrace();}
        }
    
}



