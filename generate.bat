@echo OFF

touch index.html
DEL index.html
cat pages\header.html pages\index.html pages\footer.html >> index.html

touch programming.html
DEL programming.html
cat pages\header.html pages\programming.html pages\footer.html >> programming.html

touch blender.html
DEL blender.html
cat pages\header.html pages\blender.html pages\footer.html >> blender.html

touch frame.html
DEL frame.html
cat pages\header.html pages\frame.html pages\footer.html >> frame.html

touch image.html
DEL image.html
cat pages\header.html pages\image.html pages\footer.html >> image.html

