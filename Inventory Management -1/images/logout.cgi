use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn007_SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
my $cookie = $q->cookie(jadrn007SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  



