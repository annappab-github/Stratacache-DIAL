:RUNSCRIPTS
"C:\Program Files (x86)\WinSCP\WinSCP.com" ^
  /log="C:\ProgramData\Scala\WinSCP.log" /ini=nul ^
  /command ^
    "open sftp://wayfinder:Wayfinder@123@10.248.16.68 -hostkey=*" ^
    "get /home/FTP_locations/community-app/DIAL_Flightfeed.xml ""D:\Scala Share\""" ^
    "exit"
	
cscript "C:/ProgramData/Scala/DIAL/downloadweather.vbs"
timeout/t 30 /nobreak
goto RUNSCRIPTS

RUNSCRIPTS