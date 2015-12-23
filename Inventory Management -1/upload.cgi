#!/usr/bin/perl 

#   file upload script.  
#   Remember that you MUST use enctype="mulitpart/form-data"
#   in the web page that invokes this script, and the destination 
#   directory for the uploaded file must have permissions set to 777.  
#   Do NOT set 777 permission on any other directory in your account!
#   
#   CS645, Spring 2015
#   Alan Riggins

use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use CGI::Session;
####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn007/public_html/proj1/up_imgs';
my $safe_filename_chars = "a-zA-Z0-9_.-";
####################################################################

my $q = new CGI;
my $sid=$q->cookie('jadrn007_SID') || undef;
my $session=new CGI::Session(undef,$sid, {Directory=>'/tmp'});
my $cookie_id=$q->cookie('jadrn007_SID');
my $session_id=$session->id;
if($cookie_id eq $session_id)
{

my $filename = $q->param("photo");
my $sku=$q->param("sku");
unless($filename) {
    die "There was a problem uploading the image; ".
        "it's probably too big.";
    }
    
my $mimetype = $q->uploadInfo($filename)->{'Content-Type'};

# check the mime type and if it is not an image, reject it.
if($mimetype !~ /image/) {
    die "Invalid mime type, $mimetype";
    }    
    
my ($name, $path, $extension) = fileparse($filename, '/..*/');
my $pos=index $name,'.';
my $ext=substr $name,$pos;
$filename=$sku.$ext;
$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    }   

$filename = untaint($filename);
$filename = lc($filename);
# get a handle on the uploaded image     
my $filehandle = $q->upload("photo"); 

unless($filehandle) { die "Invalid handle"; }

# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    if($_ =~ /\<\?php/) {
        die "Invalid file, php tag found!";
        }
    print UPLOADFILE $_;
    }
close UPLOADFILE;


print <<EOF;
Content-type:  text/html

<h2>Success, the file $filename has been uploaded</h2>
EOF

# this is needed because mod_perl runs with -T (taint mode), and thus the
# filename is insecure and disallowed unless untainted. Return values
# from a regular expression match are untainted.
sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }
}
else
{
	 print "Content-type: text/html\n\n";
	 print "LOGOUT";
}
