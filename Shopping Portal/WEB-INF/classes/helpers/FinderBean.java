package helpers;

import java.util.*;
import java.sql.*;

public class FinderBean implements java.io.Serializable {

public FinderBean() {}

public String processRequest(String query) {
    Vector<String []> v = DBHelper.doQuery(query);
    return DBHelper.getQueryResultTable(v);
    }
}    
