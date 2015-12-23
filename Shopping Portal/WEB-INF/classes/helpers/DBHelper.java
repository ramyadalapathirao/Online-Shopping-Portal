package helpers;

import java.util.*;
import java.sql.*;
import java.util.regex.Pattern;

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
    
    public static String getProductDetail(Vector<String []> v)
    {
        StringBuffer detail = new StringBuffer();
        if(v.size() > 0)
        {
         for(int i=0;i<v.size();i++)
         { 
            String row[]=v.elementAt(i);
            detail.append("<div id='detailImage'>");
            String pic="/~jadrn007/proj1/up_imgs/"+row[8];
            String product_on_hand = onHandResult(row[0]);  
            String[] onHand_result = product_on_hand.split(Pattern.quote("|"));
            String onHand_status=onHand_result[0];
            int on_hand_qty=Integer.parseInt(onHand_result[1]);
            detail.append("<img src=\'"+pic+"\' alt=\'"+row[0]+"\' width='300' height='300'/></div>");
            detail.append("<div id='all_details'>");
            detail.append("<h3><b class='title'>"+row[2]+" "+row[3]+"</b></h3><hr /><br />");
            detail.append("<b>Category: </b><i><span class='category'>"+row[1]+"</span></i>&nbsp;&nbsp;");
            detail.append("<b class='vendor'>Vendor:</b><i>"+row[2]+"</i><br /><br />");
            detail.append("<h3>Description:</h3>");
            detail.append("<p id='detail_Description'>"+row[4]+"</p><br />");
            detail.append("<h3>Features:</h3>");
            detail.append("<p id='detail_features'>"+row[5]+"</p><br/>");          
            detail.append(onHand_status+"<br />");
            //detail.append("<div class='center'>");
            detail.append("<p class='price'><b>Price: </b><i>$"+row[7]+"</i></p>");
             
             
             if(on_hand_qty == 0)
                {
                  detail.append("<span class='hidden'>Qty:</span> <input type='text' name='qty' size='3' class='hidden' value='1' disabled /><br /><br />");
                  detail.append("<input type='button' class='hidden' value='Add to Cart' name='addCart' disabled />"); 
                    
                }
                else
                {            
             
             
            detail.append("Qty: <input type='text' name='detail_qty' size='3' value='1' />&nbsp;&nbsp;&nbsp;");
            detail.append("<input type='button' value='Add to Cart' name='addCart'/>");  
                }
                
             
       
            detail.append("<input type='hidden' id='hidden_item_image' value=\'"+pic+"\' />");
            detail.append("<input type='hidden' id='hidden_item_title' value=\'"+row[2]+" "+row[3]+"\' />");
            detail.append("<input type='hidden' id='hidden_item_price' value=\'"+row[7]+"\' />");
            detail.append("<input type='hidden' id='hidden_item_sku' value=\'"+row[0]+"\' />");
            detail.append("<input type='hidden' id='onHand_qty' value=\'"+on_hand_qty+"\' />"); 
            detail.append("<div class='error'></div>");
            detail.append("</div>");
             
         }   
        }
         else
        {
         detail.append("No products available at this time");   
            
        }
        
        
        return detail.toString();
        
    }
    
    
    
    
    
    
    
    
    
    public static String getProductsList(Vector<String []> v)
    {
        StringBuffer result = new StringBuffer();
        if(v.size() > 0)
        {
           result.append("<table>");
           for(int i=0;i<v.size();i++)
           { 
             String row[]=v.elementAt(i);
             String product_on_hand = onHandResult(row[0]);  
             String[] onHand_result = product_on_hand.split(Pattern.quote("|"));
             String onHand_status=onHand_result[0];
             int on_hand_qty=Integer.parseInt(onHand_result[1]);
             result.append("<tr><td>");
             String pic="/~jadrn007/proj1/up_imgs/"+row[8];
             result.append("<a href='javascript:void(0)'><img src=\'"+pic+"\' alt=\'"+row[0]+"\' width='200' height='200'/></a></td>");
             result.append("<td><a href='javascript:void(0)' class='title'><b>"+row[2]+" "+row[3]+"</b></a><hr />");
             result.append("<b>Category: </b><i><span class='category'>"+row[1]+"</span></i>");
             result.append("<b class='vendor'>Vendor:</b><i>"+row[2]+"</i><br />");
             //result.append("<a class='align_right' href='javascript:void(0)'>more details..</a><br />");
             //result.append("<div id='features'></div>");
             result.append("<span class='price'><b>Price: </b><i>$"+row[7]+"</i></span><br />");
             if(on_hand_qty !=0){
             result.append(onHand_status);}
             result.append("<br />");
             result.append("<div class='error'></div></td>");
             if(on_hand_qty == 0)
                {
                  result.append("<td><b>"+onHand_status+"</b>");
                  //result.append("<td><span class='hidden'>Qty:</span> <input type='text' name='qty' size='3' class='hidden' value='1' disabled /><br /><br />");
                  //result.append("<input type='button' class='hidden' value='Add to Cart' name='addCart' disabled />"); 
                    
                }
                else
                {
                 result.append("<td>Qty: <input type='text' name='qty' size='3' value='1' /><br /><br />");
                 result.append("<input type='button' value='Add to Cart' name='addCart'/>");   
                }
                
                result.append("<input type='hidden' id='onHand_qty' value=\'"+on_hand_qty+"\' />");
                //result.append("<input type='hidden' id='show_features' value=\'<b>Features: </b>"+row[5]+"\' />");
                //result.append("<input type='hidden' id='show_description' value=\'<b>Description: </b>"+row[4]+"\' />");
                result.append("<input type='hidden' id='hidden_item_image' value=\'"+pic+"\' />");
                result.append("<input type='hidden' id='hidden_item_title' value=\'"+row[2]+" "+row[3]+"\' />");
                result.append("<input type='hidden' id='hidden_item_price' value=\'"+row[7]+"\' />");
                result.append("<input type='hidden' id='hidden_item_sku' value=\'"+row[0]+"\' />");
                result.append("</td>");
                //result+="<b>Cost:</b><i>"+row[7]+"</i><br />";
                //result+="<b>Features:</b><i>"+row[5]+"</i><br />";
                result.append("</tr>");
                
               //result+=row[0]+"|"+row[1]+"|"+row[2]+"|"+row[3]+"|"+row[4]+"|"+row[5]+"|"+row[6]+"|"+row[7]+"|"+row[8]+"||";
            }
            result.append("</table>");
        }
        else
        {
         result.append("No products available at this time");   
            
        }
        return result.toString();
            
    }
        
        
        
    
    public static String onHandResult(String sku)
    {
       String onHand_result="";
       int onHand_qty=0;
       Vector<String[]> onHand = DBHelper.doQuery("SELECT on_hand_quantity FROM on_hand where sku = \'" + sku + "\'");
       if(onHand.size()>0)
       {
            String[] onHand_columns=onHand.elementAt(0);
            onHand_qty=Integer.parseInt(onHand_columns[0]);
            if(onHand_qty > 0)
            {
                onHand_result="<span class='green'>Available in Stock</span>";   
            }
            if(onHand_qty == 0)
            {
                onHand_result="<span class='price'><b>More on the way..</b></span>";  
            }
        }
        else
        {
            onHand_result="<span class='price'><b>Coming soon..</b></span>";  
                    
        }
        return onHand_result+"|"+onHand_qty;
        
    }
    
                            
}            
	
	
