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
my $sku=$q->param("sku");
my $delete_stmt="DELETE FROM product WHERE sku='$sku'";
my $result = $dbh->do($delete_stmt);
if($DBI::err) {
    print "Sorry, an error occurred: $DBI::errstr\n";
    }
else {
    if($result==1)
    {
        print "OK";
    }
	}
$dbh->disconnect();
}
else
{
    print "LOGOUT";

}
