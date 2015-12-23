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
my $database_source = "dbi:mysql:$database:$host:$port";
	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

my $sku = $q->param('sku');
my $category = $q->param('category');
my $vendor = $q->param('vendor');
my $identifier = $q->param('identifier');
my $description = $q->param('description');
my $features = $q->param('features');
my $cost = $q->param('cost');
my $retail = $q->param('retail');
my $image = $q->param('image');
my $pos=index $image,'.';
my $ext=substr $image,$pos;
my $filename=$sku.$ext;
$filename=lc($filename);
my $delete_stmt="DELETE FROM product WHERE sku='$sku'";

my $sth1 = $dbh->prepare("SELECT categoryID FROM category where category_name='$category'");
$sth1->execute();
while(my @row=$sth1->fetchrow_array()) {
    $catId= $row[0];
    }
    
$sth1->finish();

my $sth2 = $dbh->prepare("SELECT vendorID FROM vendor where vendor_name='$vendor'");
$sth2->execute();
while(my @row=$sth2->fetchrow_array()) {
    $venId= $row[0];
    }
        
$sth2->finish();
my $result = $dbh->do($delete_stmt);
my $insert_stmt = "INSERT INTO product(sku,catID,venID,vendorModel,description,features,cost,retail,image) VALUES(".
	"?,?,?,?,?,?,?,?,?);";
#######################################################
$check = $dbh->prepare($insert_stmt);

# execute your SQL statement
$check->execute($sku,$catId,$venId,$identifier,$description,$features,$cost,$retail,$filename);


######################################################
if($DBI::err) {
    print "Sorry, an error occurred: $DBI::errstr\n";
    }
else {    
    print "OK";	
	}
$dbh->disconnect();
}
else
{
    print "LOGOUT";

}
