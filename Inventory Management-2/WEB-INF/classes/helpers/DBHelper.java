package helpers;

import java.util.*;
import java.sql.*;

/*  DBHelper.java
    This helper class is designed to remove database access from servlet and JSP code by
    putting DB code in a separate class.  The single static method doQuery takes a string
    parameter which is the SQL query.  The return value is a vector;  each row, or vector 
    element contains an array of type String.
    
    The goal is to create a helper class that returns a Java object that is free of any
    database types or references.  THis allows us to close the resultSet and connection 
    quickly, returning an object unrelated to the JDBC.  It assumes that all data returned 
    from the result set is String data.  For most web apps this is suitable, but if you need
    to perform calculations on int data, or manipulate a date, you'll need to convert the
    field to that type.
    
    Alan Riggins
    CS645, Spring 2014
*/    
    

public class DBHelper implements java.io.Serializable {
    
// This method is for queries that return a result set.  The returned
// vector holds the results.    
    public static Vector<String []> doQuery(String s) {
        String user = "jadrn007";
        String password = "floor";
        String database = "jadrn007";
	String connectionURL = "jdbc:mysql://opatija:3306/" + database +
            "?user=" + user + "&password=" + password;		
	Connection connection = null;
	Statement statement = null;
	ResultSet resultSet = null;
        Vector<String[]> v = new Vector<String[]>();        

	try {
	    Class.forName("com.mysql.jdbc.Driver").newInstance();
	    connection = DriverManager.getConnection(connectionURL);
	    statement = connection.createStatement();
	    resultSet = statement.executeQuery(s);
        
            ResultSetMetaData md = resultSet.getMetaData();
            int numCols = md.getColumnCount();
           
            while(resultSet.next()) {
                String [] tmp = new String[numCols];
                for(int i=0; i < numCols; i++)
                    tmp[i] = resultSet.getString(i+1);  // resultSet getString is 1 based
                v.add(tmp);                
                    }
		}
		catch(Exception e) {
			e.printStackTrace();
			}
// IMPORTANT, you must make sure that the resultSet, statement and connection
// are closed, or a memory leak occurs in Tomcat.            
        finally {
            try {
                resultSet.close();
                statement.close();                
        		connection.close();
                }
            catch(SQLException e) {}  // don't do anything if the connection is not open.
        }
        return v;
    }
    
// This method is appropriate for DB operations that do not return a result 
// set, but rather the number of affected rows.  This includes INSERT and UPDATE    
    public static int doUpdate(String s) {
        String user = "jadrn007";
        String password = "floor";
        String database = "jadrn007";
		String connectionURL = "jdbc:mysql://opatija:3306/" + database +
            "?user=" + user + "&password=" + password;		
		Connection connection = null;
		Statement statement = null;
        int result = -1;   

	try {
	    Class.forName("com.mysql.jdbc.Driver").newInstance();
	    connection = DriverManager.getConnection(connectionURL);
	    statement = connection.createStatement();  
            result = statement.executeUpdate(s);
            }
	catch(Exception e) {
	    e.printStackTrace();
	    }
// IMPORTANT, you must make sure that the statement and connection
// are closed, or a memory leak occurs in Tomcat.            
        finally {
            try {
                statement.close();                
        		connection.close();
                }
            catch(SQLException e) {}  // don't do anything if the connection is not open.
        }
        return result;
    }
    
    public static String getQueryResultTable(Vector<String []> v) {
        StringBuffer toReturn = new StringBuffer();
    toReturn.append("<table>");
    for(int i=0; i < v.size(); i++) {
        String [] tmp = v.elementAt(i);
        toReturn.append("<tr>");        
        for(int j=0; j < tmp.length; j++)
            toReturn.append("<td>" + tmp[j] + "</td>");
        toReturn.append("</tr>");
        }
    toReturn.append("</table>"); 
    return toReturn.toString();
    } 
  /*  
    public static ProductBean[] getBeanArray(String query) {
        Vector<String[]> v = doQuery(query);
        ProductBean [] beanArray = new ProductBean[v.size()];
        for(int i=0; i < v.size(); i++) {
            String [] tmp = v.elementAt(i);
            ProductBean bean = new ProductBean();            
            bean.setSku(tmp[0]);
            bean.setTitle(tmp[1]);
            bean.setCategory(tmp[2]);
            bean.setRetail(tmp[3]);
            }
        return beanArray;
        }
        */
                            
}            
	
	
