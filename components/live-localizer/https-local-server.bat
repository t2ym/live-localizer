@echo off
if "%1"=="" echo Please specify the path to the root folder containing the target XLIFF file
if "%1"=="" echo %0 C:\Path\To\XLIFF\Folder
if "%1"=="" goto :end
if exist C:\OpenSSL-Win64 set OPENSSL_CONF=C:\OpenSSL-Win64\bin\openssl.cfg
if exist C:\OpenSSL-Win64 set PATH=%PATH%;C:\OpenSSL-Win64\bin
if exist C:\OpenSSL-Win32 set OPENSSL_CONF=C:\OpenSSL-Win32\bin\openssl.cfg
if exist C:\OpenSSL-Win32 set PATH=%PATH%;C:\OpenSSL-Win32\bin
if "%OPENSSL_CONF%"=="" echo Please install OpenSSL package for Windows from https://slproweb.com/products/Win32OpenSSL.html linked from https://wiki.openssl.org/index.php/Binaries
if "%OPENSSL_CONF%"=="" goto :end
if not exist demoCA mkdir demoCA
cd demoCA
if not exist newcerts mkdir newcerts
type nul >index.txt
echo 01 >serial
if not exist localhostCA.key openssl genrsa 2048 >localhostCA.key
if not exist localhostCA.csr openssl req -new -key localhostCA.key -subj "/C=JP/ST=Tokyo/O=i18n-behavior/OU=Live Localizer/CN=Live Localizer Localhost CA" -out localhostCA.csr
del /Q CAcreation
if not exist localhostCA.crt type nul >CAcreation
if not exist localhostCA.crt openssl x509 -days 3650 -sha256 -req -signkey localhostCA.key -in localhostCA.csr -out localhostCA.crt
if not exist localhost.key openssl genrsa 2048 >localhost.key
if exist localhost_csr.txt goto :csr
echo [req] >localhost_csr.txt
echo default_bits = 2048 >>localhost_csr.txt
echo prompt = no >>localhost_csr.txt
echo default_md = sha256 >>localhost_csr.txt
echo req_extensions = SAN >>localhost_csr.txt
echo distinguished_name = dn >>localhost_csr.txt
echo [dn] >>localhost_csr.txt
echo C=JP >>localhost_csr.txt
echo ST=Tokyo >>localhost_csr.txt
echo O=i18n-behavior >>localhost_csr.txt
echo OU=Live Localizer >>localhost_csr.txt
echo CN=localhost >>localhost_csr.txt
echo [SAN] >>localhost_csr.txt
echo subjectAltName=DNS:localhost >>localhost_csr.txt
:csr
if not exist localhost.csr openssl req -config localhost_csr.txt -new -sha256 -key localhost.key -out localhost.csr
openssl req -text -noout -in localhost.csr
cd ..
if not exist demoCA\localhost.crt openssl x509 -req -CA demoCA\localhostCA.crt -CAkey demoCA\localhostCA.key -CAcreateserial -out demoCA\localhost.crt -in demoCA\localhost.csr -sha256 -days 3650 -extfile demoCA\localhost_csr.txt -extensions SAN
if exist demoCA\CAcreation echo Please install the generated Localhost CA certificate as "Trusted Root Certification Authorities"
if exist demoCA\CAcreation demoCA\localhostCA.crt
echo http-server "%1" -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since --ssl --cert demoCA\localhost.crt --key demoCA\localhost.key
http-server "%1" -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since --ssl --cert demoCA\localhost.crt --key demoCA\localhost.key
:end
