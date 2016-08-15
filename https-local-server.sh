#!/bin/sh

if [ "$1" = "" ]; then
  echo Please specify the path to the root folder containing the target XLIFF file
  echo $0 /Path/To/XLIFF/Folder
  exit 1
fi
which openssl
if [ "$?" = "1" ]; then
  echo Please install openssl command
  exit 1
fi
mkdir -p demoCA
cd demoCA
mkdir -p newcerts
rm -f index.txt
touch index.txt
echo 01 >serial
echo y >yy
echo y >>yy
if [ ! -e localhostCA.key ]; then
  openssl genrsa 2048 >localhostCA.key
fi
if [ ! -e localhostCA.csr ]; then
  openssl req -new -key localhostCA.key -subj "/C=JP/ST=Tokyo/O=i18n-behavior/OU=Live Localizer/CN=Live Localizer Localhost CA" -out localhostCA.csr
fi
rm -f CAcreation
if [ ! -e localhostCA.crt ]; then
  touch CAcreation
  openssl x509 -days 3650 -sha256 -req -signkey localhostCA.key -in localhostCA.csr -out localhostCA.crt
fi
if [ ! -e localhost.key ]; then
  openssl genrsa 2048 >localhost.key
fi
if [ ! -e localhost.csr ]; then
  openssl req -new -key localhost.key -subj "/C=JP/ST=Tokyo/O=i18n-behavior/OU=Live Localizer/CN=localhost" -out localhost.csr
fi
cd ..
if [ ! -e demoCA/localhost.crt ]; then
  openssl ca -md sha256 -days 3650 -cert demoCA/localhostCA.crt -keyfile demoCA/localhostCA.key -in demoCA/localhost.csr -out demoCA/localhost.crt <demoCA/yy
fi
if [ -e demoCA/CAcreation ]; then
  echo Please install the generated Localhost CA certificate demoCA/localhostCA.crt as Trusted Certificate for SSL
  if [ "`uname`" = "Darwin" ]; then
    open demoCA/localhostCA.crt
  fi
fi
http-server "$1" -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since --ssl --cert demoCA/localhost.crt --key demoCA/localhost.key
