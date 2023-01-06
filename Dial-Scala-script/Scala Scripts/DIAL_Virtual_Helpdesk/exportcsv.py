import scalalib
import scala5
import csv
import os
from datetime import datetime
import json
import os

mylog = scalalib.get_logger(level='error', scala=True)
scalavars = scalalib.sharedvars()

now = datetime.now()
mylog.error("data loaded")

formsFolder = 'C:\\ProgramData\\Scala\\DIAL\\FormsData'
#fileName = now.strftime("%d%m%Y%H%M%S")+".csv"
fileName = now.strftime("%d%m%Y")+".csv"
folderName =  now.strftime("%d-%m-%Y")
formData = scalavars.formDataToSave
print('data', formData)
mylog.error(formData)

# dt = now.strftime("%d/%m/%Y %H:%M:%S")
fieldnames = []
rows = []
saveFolder = ''
fileExists = False

def checkFileSizeAndBackUp(filepath):
    global fileExists
    if os.path.exists(filepath):
        sizeInBytes = os.path.getsize(filepath)
        if(sizeInBytes > 800):
            today = datetime.now()
            currenttime = today.strftime("%H%M%S")
            os.rename(filepath, filepath.split(".")[0]+'_'+currenttime+'.csv')
            fileExists = True
        #return True
    #return False


if(formData != "" and formData is not None):
    formJson = json.loads(formData)
    print('data2')
    try:
        if formJson["userInfo"][0]["formName"] == "feedbackForm":
            saveFolder = "Feedback_Form\\" + folderName
            # csv header
            fieldnames = ['PNRNO','EMAIL', 'TELNO', 'DATE', 'TIME', 'FLIGHTNO', 'COMMENTS', 'SECURITY SCREENING', 'CHECK-IN PROCESS', 'CLEANLINESS', 'FOOD AND BEVERAGE SERVICES', 'SHOPPING EXPERIENCE', 'STAFF FRIENDLINESS', 'SERVICES AND FACILITIES']

            # csv data
            rows = [
                {
                'PNRNO': formJson["userInfo"][0]["pnrno"],   
                'EMAIL': formJson["userInfo"][0]["email"],
                'TELNO': formJson["userInfo"][0]["telno"],
                'DATE': formJson["userInfo"][0]["date"],
                'TIME': formJson["userInfo"][0]["time"],
                'FLIGHTNO': formJson["userInfo"][0]["flightno"],
                'COMMENTS': formJson["userInfo"][0]["comments"],
                }
            ]

            if len(formJson["feedback"]) > 0:
                for x in formJson["feedback"]:
                    #fieldnames.append(x['Abrrevation'])
                    rows[0][x['Abrrevation']] = x['userSelectedAnswer']
    except:
        if(formJson["formName"] == "ratingForm"):
            saveFolder = "Rating_Form\\" + folderName
            # csv header
            fieldnames = ['RATING(Out Of 5)', 'DATE', 'TIME']
            # csv data
            rows = [
                {
                'RATING(Out Of 5)': formJson["ratingStar"],
                'DATE': now.strftime("%d-%m-%Y"),
                'TIME': now.strftime("%H:%M %p")
                }
            ]

    formsFolder += ("\\"+saveFolder)
    if not os.path.exists(formsFolder):
        os.makedirs(formsFolder)

    formsfileabspath = formsFolder + "\\" + fileName

    if not os.path.exists(formsfileabspath):
        fileExists = True

   
    checkFileSizeAndBackUp(formsfileabspath)    
    
    with open(formsfileabspath, 'a') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if(fileExists):
            writer.writeheader()
        writer.writerows(rows)
        scalavars.formDataToSave = ""
