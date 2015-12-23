

#!/usr/bin/perl
use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;
##---------------------------- MAIN ---------------------------------------
my $q;
if(authenticate_user()) {
send_to_main();   
}
else {
send_to_login_error();
}    

###########################################################################
###########################################################################
sub authenticate_user {
$q = new CGI;
my $user = $q->param("username");
my $password = $q->param("password");    
open DATA, "</srv/www/cgi-bin/jadrn007/passwords.dat" 
or die "Cannot open file.";
@file_lines = <DATA>;
close DATA;
$OK = 0; #not authorized
foreach $line (@file_lines) {
chomp $line;
($stored_user, $stored_pass) = split /=/, $line;    
if($stored_user eq $user && Crypt::SaltedHash->validate($stored_pass, $password)) {
$OK = 1;
last;
}
}
return $OK;
}
###########################################################################
###########################################################################
sub send_to_login_error {
print <<END;
Content-type:  text/html

<!DOCTYPE html>
<html>
   <head>
      <title>Login error</title>
      <meta http-equiv="refresh" 
         content="0; url=http://jadran.sdsu.edu/~jadrn007/proj1/error.html" />
   </head>
   <body></body>
</html>
END
}  
###########################################################################
# SOLUTION TO THE REFRESH PROBLEM
# After authenticating the user I’m redirecting the user to ogin_redirect.cgi in which
# i’m displaying add,edit,delete tabs. This way form data(username and password) will 
# not be transmitted again. If the user clicks refresh button since he is only refreshing
# the redirected page, a new session will not be created.
###########################################################################
sub send_to_main {
# args are DRIVER, CGI OBJECT, SESSION LOCATION
# default for undef is FILE, NEW SESSION, /TMP 
# for login.html, don't look for any existing session.
# Always start a new one.  Send a cookie to the browser.
# Default expiration is when the browser is closed.
# WATCH YOUR COOKIE NAMES! USE JADRNXXX_SID  
my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
$session->expires('+1d');
my $cookie = $q->cookie(jadrn007_SID => $session->id);
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser    
print <<END;

<!DOCTYPE html>
<html>
<head>
<title>Manage Inventory</title>
<meta http-equiv="refresh" 
         content="0; url=http://jadran.sdsu.edu/perl/jadrn007/login_redirect.cgi" />
   </head>
   <body></body>
</html>

END
}
