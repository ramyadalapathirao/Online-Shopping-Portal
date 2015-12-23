package helpers;

import javax.servlet.*;
import javax.servlet.http.*;

public class AuthHelper {
	public static boolean isValidSession(HttpServletRequest request) {
		HttpSession s = request.getSession(false);
		if(s == null || s.isNew()) return false;
		return true;
		}
	}
