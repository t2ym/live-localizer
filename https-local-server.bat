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
echo y >yy
echo y >>yy
if not exist localhostCA.key openssl genrsa 2048 >localhostCA.key
if not exist localhostCA.csr openssl req -new -key localhostCA.key -subj "/C=JP/ST=Tokyo/O=i18n-behavior/OU=Live Localizer/CN=Live Localizer Localhost CA" -out localhostCA.csr
del /Q CAcreation
if not exist localhostCA.crt type nul >CAcreation
if not exist localhostCA.crt openssl x509 -days 3650 -sha256 -req -signkey localhostCA.key -in localhostCA.csr -out localhostCA.crt
if not exist localhost.key openssl genrsa 2048 >localhost.key
if not exist localhost.csr openssl req -new -key localhost.key -subj "/C=JP/ST=Tokyo/O=i18n-behavior/OU=Live Localizer/CN=localhost" -out localhost.csr
cd ..
if not exist demoCA\localhost.crt openssl ca -md sha256 -days 3650 -cert demoCA\localhostCA.crt -keyfile demoCA\localhostCA.key -in demoCA\localhost.csr -out demoCA\localhost.crt <demoCA\yy
if exist demoCA\CAcreation echo Please install the generated Localhost CA certificate as "Trusted Root Certification Authorities"
if exist demoCA\CAcreation demoCA\localhostCA.crt
http-server "%1" -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since --ssl --cert demoCA\localhost.crt --key demoCA\localhost.key
:end
