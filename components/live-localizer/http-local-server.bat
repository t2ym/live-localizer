@echo off
if "%1"=="" echo Please specify the path to the root folder containing the target XLIFF file
if "%1"=="" echo %0 C:\Path\To\XLIFF\Folder
if "%1"=="" goto :end
http-server "%1" -d false -c-1 -r -a localhost -p 8887 --cors=If-Modified-Since 
:end
