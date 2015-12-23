import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import helpers.*;

public class AjaxCheckSession extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {

	response.setContentType("text/html");
        PrintWriter out = response.getWriter();
	if(helpers.AuthHelper.isValidSession(request))
		out.print("OK");
	else
		out.print("NO");

    	}

    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException
    {
    	doGet(request, response);
    }
}
