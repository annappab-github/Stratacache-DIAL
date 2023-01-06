import paramiko
import os


hostipaddress="test.rebex.net"
hostusername = "demo"
hostpassword ="password"
pnumber = 22
fileModifiedTime =0
latestfile = ""
destination = '\\\\prodnas\\Common\\Manish Kumar'
logfile = 'C:\\ProgramData\\Scala\\DIAL\\Sftplog'
if not os.path.exists(logfile):
   os.mkdir(logfile)
log = paramiko.util.log_to_file(logfile+'\Sftp.log')
host = hostipaddress
port = pnumber
transport = paramiko.Transport((host, port))
username = hostusername
password = hostpassword
try:
  transport.connect(username = username, password = password)
  sftp = paramiko.SFTPClient.from_transport(transport)
  for filenamefltr in sftp.listdir_attr():
            if filenamefltr.filename.endswith('.xml') and filenamefltr.st_mtime > fileModifiedTime:
               fileModifiedTime = filenamefltr.st_mtime
               latestfile = filenamefltr.filename
  if latestfile is not None:
     flightxmlfilename='flight.xml'
     destinationPath=os.path.join(destination, flightxmlfilename)
     sftp.get(latestfile,destinationPath)
  for oldfile in sftp.listdir_attr():
      if oldfile.filename.endswith('.xml') and oldfile.filename != latestfile:
         #print "Old--> "+filenamefltr.filename
         sftp.remove(oldfile.filename)
  transport.close()
  print("flight.xml file downloaded successfully!!")
except Exception as e:
   print e
