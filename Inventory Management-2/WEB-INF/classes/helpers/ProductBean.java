package helpers;

public class ProductBean implements java.io.Serializable {
    private String sku;
    private String title;        
    private String category;
    private String retail;
    
    public ProductBean() {}
    
    public String getSku() {
        return sku;
        }
        
    public String getTitle() {
        return title;
        }
        
    public String getCategory() {
        return category;
        }
        
    public String getRetail() {
        return retail;
        }
        
    public void setSku(String s) {
        sku = s;
        }
        
    public void setTitle(String s) {
        title = s;
        }
        
    public void setCategory(String s) {
        category = s;
        }
        
    public void setRetail(String s) {
        retail = s;
        }
    }
