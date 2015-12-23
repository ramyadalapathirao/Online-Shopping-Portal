import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;



public class DispatchServlet extends HttpServlet {
	private String command;
	private String toDo=null;

	
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {
	
	HttpSession session = request.getSession(false);
	if(session == null) {
		toDo = "/WEB-INF/myjsp/error.jsp";
		processRequest(request, response);
		}
		
	command = request.getParameter("action");
        if(command == null)
                toDo = "/WEB-INF/myjsp/error.jsp";
	else if(command.equals("menu"))
		toDo = "/WEB-INF/myjsp/menu.jsp";
        else if(command.equals("logout"))
    {
            if(session!=null)
                    session.invalidate();
                toDo = "/WEB-INF/myjsp/logout.jsp"; 
    }
	else
		toDo = "/WEB-INF/myjsp/error.jsp";
				
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



