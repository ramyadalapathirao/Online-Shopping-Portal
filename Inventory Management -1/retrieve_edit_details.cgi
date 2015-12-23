use DBI;
use CGI;
use CGI::Carp qw (fatalsToBrowser);
use CGI::Session;
print "Content-type: text/html\n\n";
my $q = new CGI;
my $sid=$q->cookie('jadrn007_SID') || undef;
my $session=new CGI::Session(undef,$sid, {Directory=>'/tmp'});
my $cookie_id=$q->cookie('jadrn007_SID');
my $session_id=$session->id;
if($cookie_id eq $session_id)
{
    my $host = "opatija.sdsu.edu";
    my $port = "3306";
    my $database = "jadrn007";
    my $username = "jadrn007";
    my $password = "floor";
    my $q = CGI->new();
    my $sku=$q->param("sku");
    my $database_source = "dbi:mysql:$database:$host:$port";
    my $dbh = DBI->connect($database_source, $username, $password) 
    or die 'Cannot connect to db';
    my $sth = $dbh->prepare("select sku,category_name,vendor_name,vendorModel,description,features,cost,retail,image from product,category,vendor where product.catID=category.categoryID and product.venID=vendor.vendorID and sku='$sku'");
    $sth->execute();
    my $str="";
    while(my @row=$sth->fetchrow_array()) 
    {
                    $str.="$row[0]"."|"."$row[1]"."|"."$row[2]"."|"."$row[3]"."|"."$row[4]"."|"."$row[5]"."|"."$row[6]"."|"."$row[7]"."|"."$row[8]"."|";
    }
    $sth->finish();
    $dbh->disconnect();
    print $str;
  
    }
else
{
 print "LOGOUT";
}
