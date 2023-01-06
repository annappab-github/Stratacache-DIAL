import smtplib
from email.mime.text import MIMEText
import ssl
import scalalib

scalavars = scalalib.sharedvars()
scalalog = scalalib.get_logger(level='debug', scala=True)

smtp_host = scalavars.smtpHost
port = scalavars.smtpPort
sender = scalavars.senderEmail
username = scalavars.username
password = scalavars.password
medical_receivers_To = scalavars.medical_recepients_To
medical_receivers_Cc = scalavars.medical_recepients_Cc
medical_receivers_Bcc = scalavars.medical_recepients_Bcc
firefighter_receivers_To = scalavars.firefighter_recepients_To
firefighter_receivers_Cc = scalavars.firefighter_recepients_Cc
firefighter_receivers_Bcc = scalavars.firefighter_recepients_Bcc
security_receivers_To = scalavars.security_recepients_To
security_receivers_Cc = scalavars.security_recepients_Cc
security_receivers_Bcc = scalavars.security_recepients_Bcc
kioskId = scalavars.kioskId
serviceType = scalavars.serviceType


def getToList(recepients):
    finalList = ''
    counter = 0
    for email in recepients:
        counter = counter + 1
        finalList = finalList + email.strip()
        if(counter < len(recepients)):
            finalList = finalList+','

    return finalList


def getKioskName(id):
    switcher={
                114:'Pre Checkin',
                115:'Domestic Terminal',
             }
    return switcher.get(id,"Invalid kiosk id")


def getServiceType(id):
    switcher={
                0:'Medical Services',
                1:'Firefighting & Rescue',
                2:'Security Assistance'
             }
    return switcher.get(id,"Invalid service type")


def getReceiversByServiceType(id):
    global medical_receivers_To
    global medical_receivers_Cc
    global medical_receivers_Bcc
    global firefighter_receivers_To
    global firefighter_receivers_Cc
    global firefighter_receivers_Bcc
    global security_receivers_To
    global security_receivers_Cc
    global security_receivers_Bcc

    if(id == 0):
        return medical_receivers_To, medical_receivers_Cc, medical_receivers_Bcc
    
    elif(id == 1):
        return firefighter_receivers_To, firefighter_receivers_Cc, firefighter_receivers_Bcc

    elif(id == 2):
        return security_receivers_To, security_receivers_Cc, security_receivers_Bcc

    
def getEmailBody(serviceName,kName):
    
    body = """
Dear Team,

We have received a request for """+serviceName+""" from """+kName+""" Kiosk. Kindly check.

Thanks,
Stratacache Team
"""

    return body


def sendEmail(receivers_To, receivers_Cc, receivers_Bcc):
    serviceName = getServiceType(serviceType)
    kioskName = getKioskName(kioskId)
    emailBody = getEmailBody(serviceName,kioskName)
    msg = MIMEText(emailBody)
    msg['Subject'] = 'Alert - '+serviceName+' Requested'
    msg['From'] = sender
    msg['To'] = receivers_To
    msg['Cc'] = receivers_Cc

    # uncomment below two lines for testing in Stratacache network
    # server = smtplib.SMTP_SSL(smtp_host, port)
    # server.login(username, password)

    # uncomment below line for DIAL network
    server = smtplib.SMTP(smtp_host, port)
    
    text = msg.as_string()
    recepient_email = receivers_To.split(",") + receivers_Cc.split(",") + receivers_Bcc.split(",")
    server.sendmail(sender, recepient_email, text)
    server.quit()


try:
    to, cc, bcc = getReceiversByServiceType(serviceType)
    sendEmail(to, cc, bcc)
    scalalog.info('Email sent successfully')
except Exception as e:
    scalalog.error('Email send error>> '+ str(e))

