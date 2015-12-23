import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class Logout extends HttpServlet {
    	private ServletContext context=null;
	private RequestDispatcher dispatcher = null;
        private String toDo = "";  
          
    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {

	HttpSession session = request.getSession(false);
	if(session != null)
		session.invalidate();
		
        toDo = "/WEB-INF/myjsp/logout.jsp";     
        dispatcher = request.getRequestDispatcher(toDo); 
        dispatcher.forward(request, response);                  
    }    
}