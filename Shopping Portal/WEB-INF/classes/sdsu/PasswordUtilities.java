package sdsu;

import java.security.*;
import java.util.*;
import java.io.*;

public class PasswordUtilities {
    private static final String passwordFileName =
        "/srv/tomcat/webapps/jadrn007/WEB-INF/classes/sdsu/passwords.dat";
        
    public static boolean isValidLogin(String username, String password) {
       Vector<String> userData = new Vector<String>(); 
       String inLine;
       try {    
        BufferedReader reader = new BufferedReader
               (new FileReader(passwordFileName));
           while((inLine = reader.readLine()) != null)
               userData.add(inLine);
           reader.close();  
            }
        catch(Exception e) {
            throw new RuntimeException("Error reading password file!");
            }  
       String encryptedPassword = getEncryptedPassword(password);     
       for(int i=0; i < userData.size(); i++) {
            String tmp = userData.elementAt(i);
            StringTokenizer t = new StringTokenizer(tmp,"=",false);
            String fileUsername = t.nextToken();
            String filePassword = t.nextToken();
            if(fileUsername.equals(username) &&
                    filePassword.equals(encryptedPassword)) 
                return true;                             
            }   // end for
        return false;
        }
        
    public static String getEncryptedPassword(String str) {   
        try {  
            MessageDigest d = MessageDigest.getInstance("MD5");
            byte [] b = str.getBytes();     
            d.update(b);
            return  byteArrayToHexString(d.digest());
            }
        catch(Exception e) {
            e.printStackTrace();               
            }
    return null;
    }          
    
    private static String byteArrayToHexString(byte[] b){
        String str = "";
        for(int i=0; i < b.length; i++) {
            int value = b[i] & 0xFF;
            if(value < 16)
                str += "0";
            str += Integer.toHexString(value);
            }
        return str.toUpperCase();
        }   
	
        
    public static boolean addEntryToPasswordFile(String username, String password) {
        try {
            Properties p = new Properties();
            FileInputStream in = new FileInputStream(passwordFileName);
            p.load(in);
            in.close();
            String encryptedPassword = getEncryptedPassword(password);
            p.setProperty(username, encryptedPassword);
            
            FileOutputStream out = new FileOutputStream(passwordFileName);
            p.store(out, "password file");
            out.close();
            return true;
            }
        catch(Exception e) {
            e.printStackTrace();
            return false;
            }
        }	 
	
   public static void main(String [] args) {
       PasswordUtilities.addEntryToPasswordFile("cs645","sp2015");
       PasswordUtilities.addEntryToPasswordFile("ramya","sarwin123");
       PasswordUtilities.addEntryToPasswordFile("sarath","Dw@rakamay1");
       PasswordUtilities.addEntryToPasswordFile("sarwin","ramya123");
	}
	
   	            
}            
