@echo off
npm i
echo installed w succes, starting bot in 4 seconds
timeout /t 4 >null
npm start >null

exit 
