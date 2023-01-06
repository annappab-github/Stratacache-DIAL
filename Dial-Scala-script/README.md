# dial-virtual-helpdesk-scripts

# python 2.7 should be insatlled on the server and path should be added to the environment variables
pip install paramiko
 
# flightinfodownloader.py and downloadweather.vbs location
C:\ProgramData\Scala\DIAL

# Put script_executor.bat in Windows Startup

# flightinfodownloader.py
Update below fields to latest before deployement  
hostipaddress - SFTP host  
hostusername - SFTP username  
hostpassword - SFTP password  
pnumber - SFTP port  
destination - flight.xml download location  

# downloadweather.vbs
Update below fields to latest before deployement  
URL - Weather download url  
Path - weatheronline.xml download location  