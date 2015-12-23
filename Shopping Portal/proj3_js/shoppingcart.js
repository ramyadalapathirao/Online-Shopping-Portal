/*  A shopping cart in javascript that uses cookies
    Alan Riggins
    CS645 Spring 2014

    Method Prototypes:
    // creates a new shopping cart using cookies.
    // The parameter is your jadran account number.
    var cart = new shopping_cart("jadrnxxx");
    
    // Adds a new entry or increments the quantity if the entry exists.
    cart.add(sku, quantity);
    
    // changes the quantity associated with the sku to the new value
    // parameter provided
    cart.setQuantity(sku, quantity);
    
    // deletes the sku from the cart (cookie).
    cart.delete(sku);
    
    // returns the total number of elements in the cart.
    cart.size();
    
    // returns a two-dimensional array of the sku=quantity pairs
    // [0] is the sku, [1] is the quantity. array[sku][quantity]
    cart.getCartArray();
*/
    
    
function shopping_cart(owner) {
    this.owner = $.trim(owner);
    this.skuArray = new Array();
    this.qtyArray = new Array();
    this.priceArray=new Array();
    this.titleArray=new Array();
    this.imgArray = new Array();

//////////////////////////////////////////////////////////////////////////
// Do not use the following two methods;  they are private to this class
    this.getCookieValues = function() {  // PRIVATE METHOD
        var raw_string = document.cookie;        
        var arr = new Array();
        if(raw_string == undefined)
            return;
        var tmp = raw_string.split(";");
        var myValue = null;        
        for(i=0; i < tmp.length; i++)
            if(tmp[i].indexOf(owner) != -1)
                myValue = tmp[i].split("=");
        if(!myValue)
            return;
        arr = myValue[1].split("||");
        for(i=0; i < arr.length; i++) {
            var pair = arr[i].split("|"); 
            if(pair[0] == undefined || pair[1] == undefined || pair[2] == undefined || pair[3] == undefined || pair[4] == undefined) continue;
            this.skuArray[i] = pair[0];
            this.qtyArray[i] = pair[1];
            this.priceArray[i] = pair[2];
            this.titleArray[i] = pair[3];
            this.imgArray[i] = pair[4];
            }         
        }
        
    this.writeCookie = function() {  // PRIVATE METHOD
        var toWrite = this.owner+"=";
        for(i=0; i < this.skuArray.length; i++) 
            toWrite += this.skuArray[i] + "|" + this.qtyArray[i] + "|" + this.priceArray[i] + "|" + this.titleArray[i]+ "|" + this.imgArray[i]+"||";
        toWrite = toWrite.substring(0,toWrite.length - 2);
        document.cookie = toWrite+";path=/";
        }
//////////////////////////////////////////////////////////////////////////            
        
    this.add = function(sku, quantity,retailprice,producttitle,productImage) {
        sku = $.trim(sku);
        quantity = $.trim(quantity);
        retailprice=$.trim(retailprice);
        producttitle=$.trim(producttitle);
        image = $.trim(productImage);
        
        this.getCookieValues(); 
        var found = false;
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku) {        
            this.qtyArray[i] = parseInt(quantity,10) + parseInt(this.qtyArray[i],10);
            found = true;            
            }
        if(!found) {       
            this.skuArray.push(sku);
            this.qtyArray.push(quantity);
            this.priceArray.push(retailprice);
            this.titleArray.push(producttitle);
            this.imgArray.push(image);
            }
        this.writeCookie();         
    }
    
    this.setQuantity = function(sku, quantity) {  
        sku = $.trim(sku);
        var found = false;
        if(sku == "") return;        
        quantity = $.trim(quantity);            
        this.getCookieValues();
        
        for(i=0; i < this.skuArray.length; i++)
            if(this.skuArray[i] == sku) {        
                this.qtyArray[i] = parseInt(quantity,10);            
                found = true;
                }
        if(found)
            this.writeCookie();
        }    
    
    
    this.getQuantity = function(sku) {  
        sku = $.trim(sku);
        if(sku == "") return;            
        this.getCookieValues();
        
        for(i=0; i < this.skuArray.length; i++)
            if(this.skuArray[i] == sku) {           
                return this.qtyArray[i];
            }
        return 0;
        }  
    
    this.delete = function(sku) {
        sku = $.trim(sku);
        var index = -1;
        this.getCookieValues();       
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku)  
            index = i;               
        if(index != -1) {      
            this.skuArray.splice(index,1);
            this.qtyArray.splice(index,1);
            this.priceArray.splice(index,1);
            this.titleArray.splice(index,1);
            this.imgArray.splice(index,1);
            }         
        if(this.skuArray.length == 0) {
            document.cookie = this.owner +"= ;path=/;expires=-1";
            }
        else
            this.writeCookie();
        }
        
    this.size = function() {
        this.getCookieValues();
        var count = 0;
        for(i=0; i < this.qtyArray.length; i++)
            count += parseInt(this.qtyArray[i],10);
        return count;
        }        
        
    this.getCartArray = function() {
        this.getCookieValues();
        var returnArray = new Array();
        for(i=0; i < this.skuArray.length; i++) {
            returnArray[i] = new Array();
            returnArray[i].push(this.skuArray[i]);
            returnArray[i].push(this.qtyArray[i]);
            returnArray[i].push(this.priceArray[i]);
            returnArray[i].push(this.titleArray[i]);
            returnArray[i].push(this.imgArray[i]);
            }
        return returnArray;
        }                    
}    
        