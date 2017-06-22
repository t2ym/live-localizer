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
cat > localhost_csr.txt <<-EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = SAN
distinguished_name = dn

[dn]
C=JP
ST=Tokyo
O=i18n-behavior
OU=Live Localizer
CN=localhost

[SAN]
subjectAltName=DNS:localhost
EOF
  openssl req -config localhost_csr.txt -new -sha256 -key localhost.key -out localhost.csr
  openssl req -text -noout -in localhost.csr
fi
cd ..
if [ ! -e demoCA/localhost.crt ]; then
  openssl x509 -req -CA demoCA/localhostCA.crt -CAkey demoCA/localhostCA.key -CAcreateserial -out demoCA/localhost.crt -in demoCA/localhost.csr -sha256 -days 3650 \
  -extfile demoCA/localhost_csr.txt -extensions SAN
fi
if [ -e demoCA/CAcreation ]; then
  echo Please install the generated Localhost CA certificate demoCA/localhostCA.crt as Trusted Certificate for SSL
  if [ "`uname`" = "Darwin" ]; then
    open demoCA/localhostCA.crt
  fi
fi
echo http-server "$1" -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since --ssl --cert demoCA/localhost.crt --key demoCA/localhost.key
http-server "$1" -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since --ssl --cert demoCA/localhost.crt --key demoCA/localhost.key
