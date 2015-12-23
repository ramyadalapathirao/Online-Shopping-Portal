use CGI;
use CGI::Carp qw (fatalsToBrowser);
use CGI::Session;
my $q = new CGI;
my $sid=$q->cookie('jadrn007_SID') || undef;
my $session=new CGI::Session(undef,$sid, {Directory=>'/tmp'});
my $cookie_id=$q->cookie('jadrn007_SID');
my $session_id=$session->id;
if($cookie_id eq $session_id)
{
    print "Content-type: text/html\n\n";
    open FILE, "</srv/www/cgi-bin/jadrn007/manage_inventory.txt" 
        or die "Cannot open file file";
    @lines = <FILE>;
    foreach $line (@lines) {
        print $line;
        }
    #exit;
}

else
{
print <<END;    
Content-type:  text/html

<!DOCTYPE html>
<html>
    <head>
      <title>Login Error</title>
      <meta http-equiv="refresh" 
         content="0; url=http://jadran.sdsu.edu/~jadrn007/proj1/error.html" />
   </head>
   <body></body>
</html>

END



}

###########################################################################

