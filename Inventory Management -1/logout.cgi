use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn007_SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
my $cookie = $q->cookie(jadrn007_SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser
########################################################################
# SOLUTION TO THE REFRESH PROBLEM
# After authenticating the user I’m redirecting the user to ogin_redirect.cgi in which
# i’m displaying add,edit,delete tabs. This way form data(username and password) will 
# not be transmitted again. If the user clicks refresh button since he is only refreshing
# the redirected page, a new session will not be created.


print <<END;    
    
<!DOCTYPE html>
<html>
    <head>

      <meta http-equiv="refresh" 
         content="0; url=http://jadran.sdsu.edu/~jadrn007/proj1/index.html" />
   </head>
   <body></body>
</html>

END




