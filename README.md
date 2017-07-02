[![Build Status](https://travis-ci.org/t2ym/live-localizer.svg?branch=master)](https://travis-ci.org/t2ym/live-localizer)
[![Coverage Status](https://coveralls.io/repos/github/t2ym/live-localizer/badge.svg?branch=master&_version=0.0.76)](https://coveralls.io/github/t2ym/live-localizer?branch=master)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/t2ym/live-localizer)
[![Bower](https://img.shields.io/bower/v/live-localizer.svg)](https://www.webcomponents.org/element/t2ym/live-localizer)
[![npm](https://img.shields.io/npm/v/live-localizer.svg)](https://www.npmjs.com/package/live-localizer)

# Live Localizer

Live Localizer widget for Polymer [i18n-behavior](https://www.webcomponents.org/element/t2ym/i18n-behavior)

[Live Demo](https://www.webcomponents.org/element/t2ym/live-localizer/demo/demo/index.html) on [webcomponents.org](https://www.webcomponents.org/element/t2ym/live-localizer)

## Live Localizer applied to [the Shop App](https://www.polymer-project.org/1.0/toolbox/case-study)

<img src="https://raw.githubusercontent.com/wiki/t2ym/live-localizer/live-localizer.gif" width="768px">

#### Sequential description of the animated screenshot above

- Browse the Shop App with Live Localizer widget at the bottom left corner as a fab icon
- Open the Live Localizer widget
- Switch to the Japanese locale with pseudo-L10N
- Save the working strings of the Shop App as a local XLIFF file `bundle.ja.xlf`
- Open the local XLIFF with XLIFF editor [Virtaal](https://github.com/translate/virtaal) 
- Translate the local XLIFF (Actually, open the translated XLIFF `shop-bundle.ja.xlf`)
- Drag and drop the translated XLIFF from Windows Explorer to Live Localizer widget
- Load the dropped XLIFF to the running Shop App
- Browse the localized Shop App
- Switch to the English locale

## Table of Contents

- [Use Cases](#use-cases)
- [Features](#features)
- [Supported Browsers](#supported-browsers)
- [Install](#install)
- [Import](#import)
- [Apply](#apply)
- [Firebase Setup (Optional)](#firebase-setup-optional)
- [Local XLIFF Watcher (Optional)](#local-xliff-watcher-optional)
- [Build](#build)
- [Plans](#plans)
- [License](#license)

## Use Cases

- Dispatch translation tasks via the running Web app itself
- Dispatch incremental translation tasks via the running Web app itself
- Check screenshots on the running Web app
- Check translation progress in statistics view
- Submit translations to Cloud (Firebase)
- Watch Cloud to update translations in real-time

## Features

- Export XLIFF from the running app to a local file
- Import XLIFF from a local file to the running app
- Save XLIFF to Browser Storage (IndexedDB)
- Load XLIFF from Browser Storage (IndexedDB)
- Upload XLIFF to Cloud Storate (Firebase)
- Download XLIFF from Cloud Storage (Firebase)
- Show translation statistics in list view
- Detect changes on Cloud Storage (Firebase) to trigger a new build
- Detect changes and load Local XLIFF 

## Supported Browsers

| Browsers | Supported Versions  | Platforms                                  |
|:--------:|:-------------------:|:------------------------------------------:|
| Chrome   | 59+                 | Windows 7+, macOS El Capitan 10.11+, Linux |
| Firefox  | 54+                 | Windows 7+, macOS El Capitan 10.11+, Linux |
| Safari   | 10.1.1 (12603.2.4)+ | macOS Sierra 10.12+                        |

## Install

```sh
  bower install --save live-localizer
```

## Import

### Static Loading
```html
  <link rel="import" href="path/to/bower_components/live-localizer.html">
```

### Lazy Loading
```html
  <link rel="import" href="path/to/bower_components/live-localizer-lazy.html">
```

## Apply

Attach at the end of the main body element.

### With Firebase Cloud Storage:

```html
<body>
  ...
  <live-localizer>
    <!--
      Firebase Cloud Storage configuration with the example parameters for Live Localizer demo app:
      For each target app, a dedicated Firebase project has to be configured.
    -->
    <live-localizer-firebase-storage id="firebase-storage" class="storage cloud"
      auth-provider="google"
      auth-domain="live-localizer-demo.firebaseapp.com"
      database-url="https://live-localizer-demo.firebaseio.com"
      api-key="AIzaSyCjrlPhl0cLSZVRsDvuajq16vkerhcu_UM">
    </live-localizer-firebase-storage>
  </live-localizer>
</body>
```

### Without Firebase Cloud Storage:

```html
<body>
  ...
  <live-localizer></live-localizer>
</body>
```

## Firebase Setup (Optional)

A dedicated Firebase project has to be set up for storing XLIFF files for the target application.

### Supported Authentication Methods

- Anonymous
- Google (OAuth)
- GitHub (OAuth)
- Twitter (OAuth)

### Firebase Security Rules

```javascript
{
  "rules": {
    "users": {
      ".read": "auth.uid === 'xliff-watcher'",
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### XLIFF Watcher (Optional)

XLIFF Watcher in the build system can detect XLIFF file changes in Firebase in realtime and trigger a new build.

See `gulp fetch-xliff` and `gulp watch-xliff` tasks in [`demo/gulpfile.js`](https://github.com/t2ym/live-localizer/blob/master/demo/gulpfile.js)

#### Start Watching:

```sh
  gulp watch-xliff --database https://live-localizer-demo.firebaseio.com \
    --service_account ../../live-localizer-demo-service-account.json \
    --on_xliff_change 'npm run demo' \
    >../../logfile.txt 2>&1 &
  tail -f ../../logfile.txt
```

Example XLIFF Watcher processes:
```sh
$ gulp watch-xliff --database https://live-localizer-demo.firebaseio.com \
>     --service_account ../../live-localizer-demo-service-account.json \
>     --on_xliff_change 'npm run demo'
[10:03:02] Using gulpfile ~/WebComponents/components/live-localizer/demo/gulpfile.js
[10:03:02] Starting 'watch-xliff'...
[10:03:02] watch-xliff: Watching changes on Firebase...
[10:03:02] watch-xliff: gulp unwatch-xliff to stop the task
The 'credential' property specified in the first argument to initializeApp() is deprecated and will be removed in the next major version. You should instead use the 'firebase-admin' package. See https://firebase.google.com/docs/admin/setup for details on how to get started.
[10:04:08] watch-xliff: Change detected on Firebase
[10:04:08] watch-xliff: Executing: npm run demo
[10:04:17] 
> live-localizer@0.0.79 demo /home/fedora/WebComponents/components/live-localizer
> cd demo && gulp

[10:04:09] Using gulpfile ~/WebComponents/components/live-localizer/demo/gulpfile.js
[10:04:09] Starting 'default'...
[10:04:09] Starting 'fetch-xliff'...
[10:04:16] By All Users:
[10:04:16] 01i7iz6EbGcYTWemYAHlgrIb7fl1.files.de date: 2017-06-13T12:11:10Z
...
[10:04:16] zsZzpSw2rNXV0YNfd0xo42L5kpL2.files.ja date: 2017-05-25T05:43:19Z
[10:04:16] By All Users in reverse chronological order:
[10:04:16] files[de][0] user: nU3pjXUSyMbn6hScNe7I2unkbOf1 date: 2017-06-22T11:32:17Z <= selected
...
[10:04:16] files[de][507] user: QFCCp3HqHCZjCaMldd95R3d5Ck12 date: 2017-02-11T15:37:19Z
[10:04:16] files[ja][0] user: YCogwiL4MKQ76fwcXXi6vlJljxG2 date: 2017-06-23T01:04:08Z <= selected
...
[10:04:16] files[ja][76] user: NUPdA2ijDFV3qSogo8VkTSfcFRx2 date: 2016-08-03T09:06:59Z
[10:04:16] files[zh-Hans][0] user: fPgOtPel47c4yjM35roNoGqw1vE2 date: 2016-08-03T09:48:28Z <= selected
[10:04:16] files[fr][0] user: v8Ny5UnVZpQw3aGcoKpNq3kkVv22 date: 2017-06-07T07:44:05Z <= selected
[10:04:16] Finished 'fetch-xliff' after 6.77 s
[10:04:16] Starting 'i18n'...
[10:04:16] I18N transform index.html
...
[10:04:16] I18N transform locales/bundle.de.json
[10:04:16] I18N transform bundle.json
[10:04:16] I18N transform locales/bundle.es.json
[10:04:16] I18N transform locales/bundle.fr.json
[10:04:16] I18N transform locales/bundle.ja.json
[10:04:16] I18N transform locales/bundle.zh-Hans.json
[10:04:16] I18N transform xliff/bundle.de.xlf
[10:04:16] I18N transform xliff/bundle.es.xlf
[10:04:16] I18N transform xliff/bundle.fr.xlf
[10:04:16] I18N transform xliff/bundle.ja.xlf
[10:04:16] I18N transform xliff/bundle.zh-Hans.xlf
[10:04:16] I18N transform 40 items
[10:04:16] Finished 'i18n' after 375 ms
[10:04:16] Finished 'default' after 7.15 s

[10:04:17] watch-xliff: The task on the XLIFF changes has finished. Continuing to watch changes on Firebase...
[10:04:48] Finished 'watch-xliff' after 1.75 min
[10:04:48] watch-xliff: stop watching xliff
```

#### Stop Watching:

```sh
  gulp unwatch-xliff
```

#### Notes on XLIFF Watcher:

- Service account credentials' JSON is required for `gulp watch-xliff` task
- `--token=notoken` option to use the same service account credentials for `gulp fetch-xliff` task as `gulp watch-xliff` task
  - `demo/getUsers.js` script, which uses `firebase-admin` SDK, is required to use the credentials
- Otherwise, `firebase login:ci` token from `firebase-tools` is required for `gulp fetch-xliff` task

## Local XLIFF Watcher (Optional)

Local XLIFF file changes can be watched real-time via local HTTP server at http://localhost:8887/UPLOADED_XLIFF_FILE

Check "Watch and Load XLIFF" in the local file storage control panel to start watching the local XLIFF file

The following table shows triggered operations whenever the translator saves (overwrites) the local XLIFF file

| Components | Operations |
|:-----------|:-----------|
| XLIFF Editor | Save (overwrite) the uploaded XLIFF file |
| `http-server` | Provide Local XLIFF Watcher with the XLIFF file status |
| Local XLIFF Watcher in Live Localizer | Periodically check the XLIFF file status and fetch it on its updates |
| `xliff-conv` in Live Localizer | Merge the XLIFF updates into the JSON data for running UI strings |
| Target Application | Show UI with the updated strings |
| Browser Storage | Automatically save the XLIFF file if "Automatic Save" is checked |
| Firebase Storage | Automatically upload the XLIFF file if "Automatic Save" is checked |
| Firebase | Notify XLIFF Watcher of a `child_changed` event for the XLIFF file updates |
| XLIFF Watcher (`watch-xliff` gulp task) in the build system | Detect the `child_changed` event and trigger a new build |
| Build system | Start a new build process including `fetch-xliff` gulp task and I18N, and deploy a new build on the development HTTP server |
| Development HTTP server | Provide browsers for translators with the new build |
| Reload button in Live Localizer | Detect the new build in 60 seconds and show the tooltip "App Updated" |

### HTTP Server for Local XLIFF Watcher Setup

- Install [NodeJS](https://nodejs.org/) on the local host of the translator
- Install [the local HTTP server npm package](https://www.npmjs.com/package/http-server)
```sh
npm install -g http-server
```
- For HTTP sites, start local HTTP server at http://localhost:8887 with the root folder containing the XLIFF file
```sh
http-server FOLDER_TO_CONTAIN_XLIFF -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since
```
- For HTTPS sites, start local HTTPS server at https://localhost:8887 with the root folder containing the XLIFF file

Batch File to Launch local HTTPS server on Windows from Node.js command prompt: [`https-local-server.bat`](https://github.com/t2ym/live-localizer/blob/master/http-local-server.zip?raw=true) FOLDER_TO_CONTAIN_XLIFF
```
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
```

Script to Launch local HTTPS server on Mac: [`https-local-server.sh`](https://gist.githubusercontent.com/t2ym/b633f6a92e72e64e03ab8ad53e14e912/raw/096fda8f229b64f5b6c9dfde64bd9ca1870d6608/https-local-server.sh) FOLDER_TO_CONTAIN_XLIFF
```sh
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
```

#### Notes on Local XLIFF Watcher:
- The XLIFF folder should contain only the target XLIFF file(s) for the project for security.
- The HTTP server is accessible only from the localhost and disallows directory listing.
- If the XLIFF file name is prefixed with an unpredictable string, it can serve as a kind of "password" to block malicious access from other local HTTP clients.
- `https-local-server` script has to be executed in the same folder as its first execution so that it can find the generated certificates in `./demoCA` folder.
- To work around [Issue #76](https://github.com/t2ym/live-localizer/issues/76), `https-local-server` script is required even for HTTP web applications.

## Build

### Bundle dependent components with `polymer-build` bundler

With lazy loader `live-localizer-lazy.html`, `live-localizer-main.html` and its dependencies are lazily loaded.
The dependent components except for region flag images can be bundled with `polymer-build` bundler as follows.

#### `polymer.json` with bundled `live-localizer` dependencies: applied to [`polymer init i18n-starter-kit`](https://github.com/t2ym/generator-polymer-init-i18n-starter-kit)
```javascript
{
  "entrypoint": "index.html",
  "shell": "src/my-app.html",
  "fragments": [
    "src/my-view1.html",
    "src/my-view2.html",
    "src/my-view3.html",
    "src/my-view404.html",
    "bower_components/live-localizer/live-localizer-main.html"
  ],
  "sourceGlobs": [
    "src/**/*",
    "images/**/*",
    "locales/*",
    "xliff/*",
    "bundle.json",
    "bower.json"
  ],
  "includeDependencies": [
    "manifest.json",
    "bower_components/webcomponentsjs/webcomponents-lite.min.js",
    "bower_components/intl/**/*",
    "bower_components/region-flags/**/*"
  ]
}
```

## Plans

TBD

## License

[BSD-2-Clause](https://github.com/t2ym/live-localizer/blob/master/LICENSE.md)
