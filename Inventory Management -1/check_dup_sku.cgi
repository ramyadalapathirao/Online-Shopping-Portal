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
    my $sth = $dbh->prepare("SELECT sku FROM product where sku='$sku'");
    $sth->execute();
    $result=$sth->rows;
    $sth->finish();
    $dbh->disconnect();
    if($result==0)
    {
        print "NOT A DUP";
    }
    else
    {
        print "DUP";
    }
    }
else
{
    print "LOGOUT";

}