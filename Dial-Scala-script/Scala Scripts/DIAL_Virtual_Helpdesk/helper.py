import scalalib
import scala5


scalavars = scalalib.sharedvars()
scalalog = scalalib.get_logger(level='debug', scala=True)

def getAbsPath(filename):
    absPath = ""
    try:
        # contentPath = r"Content:\{}".format(filename)
        contentPath = r"{}".format(filename)
        lock = scala5.FileLock(contentPath)
        absPath = lock.realpath
        del lock
    except:
        print("error")
    pass
    return absPath

scanQRImage = scalavars.scanQRImage
if scanQRImage.startswith('Content') :
    scalavars.scanQRImgABSPath = getAbsPath(scanQRImage)
else:
    scalavars.scanQRImgABSPath = scanQRImage