   
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
if('$session_id' eq '$cookie_id')
{
    my $host = "opatija.sdsu.edu";
    my $port = "3306";
    my $database = "jadrn007";
    my $username = "jadrn007";
    my $password = "floor";
    my $q = CGI->new();
    my $database_source = "dbi:mysql:$database:$host:$port";
    my $dbh = DBI->connect($database_source, $username, $password) 
    or die 'Cannot connect to db';
    my $sth1 = $dbh->prepare("SELECT category_name FROM category order by category_name");
    $sth1->execute();
    $result=$sth1->rows;
    my $str1="";
    while(my @row=$sth1->fetchrow_array()) {
    $str1.= "$row[0]"."|";
    }
    $sth1->finish();
    
    
    my $sth2 = $dbh->prepare("SELECT vendor_name FROM vendor order by vendor_name");
    $sth2->execute();
    my $str2="";
    while(my @row=$sth2->fetchrow_array()) {
    $str2.= "$row[0]"."|";
    }
    $sth2->finish();
    
    $dbh->disconnect();    	
    print $str1."&".$str2;
    }
else
{
    print "Location: /~jadrn007/proj1/error.html";

}



