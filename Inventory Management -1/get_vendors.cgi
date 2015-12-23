   
use DBI;
use CGI;
print <<END_HTML;
Content-type: text/html


END_HTML

    my $host = "opatija.sdsu.edu";
    my $port = "3306";
    my $database = "jadrn007";
    my $username = "jadrn007";
    my $password = "floor";
    my $q = CGI->new();
    my $database_source = "dbi:mysql:$database:$host:$port";
    my $dbh = DBI->connect($database_source, $username, $password) 
    or die 'Cannot connect to db';
    my $sth = $dbh->prepare("SELECT vendor_name FROM vendor order by vendor_name");
    $sth->execute();
    my $str="";
    while(my @row=$sth->fetchrow_array()) {
    $str.= "$row[0]"."|";
    }
    $sth->finish();
    $dbh->disconnect();    	
print $str;



