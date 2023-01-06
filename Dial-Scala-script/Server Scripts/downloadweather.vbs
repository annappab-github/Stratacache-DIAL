Const SXH_SERVER_CERT_IGNORE_ALL_SERVER_ERRORS = 13056
status = "Download is incomplete"
URL = "https://59.179.31.233/fog/nitc15.php?param=" & Timer
'Path = "\\10.68.229.20\FeedManagement\T3WeatherOnlineOrig\weatheronline.xml"
Path = "\\prodnas\Common\Manish Kumar\weatheronline.xml"

sHTML = Get_HTML (URL)
Set FSO = CreateObject("Scripting.FileSystemObject")
Set dFile = FSO.CreateTextFile(Path, True)

dFile.Write UniToAsc(sHTML)
dFile.Close

Set dFile = Nothing
Set FSO = Nothing
status = "Weather Data Downloaded Successfully!!"
Wscript.Echo status



Private Function Get_HTML (up_http)
	Set oHTML = Nothing
	Set oHTML = CreateObject("MSXML2.ServerXMLHTTP")
	oHTML.open "get", up_http, False
	oHTML.setOption(2) = SXH_SERVER_CERT_IGNORE_ALL_SERVER_ERRORS
	oHTML.send
	Get_HTML = oHTML.responsetext

	set oHTML = Nothing
End Function



Private Function UniToAsc(sString)
 Dim nLen, nPTR, sAsc
 nLen = Len(sString)

 For nPTR = 1 To nLen
  sAsc = sAsc & Chr(Asc(Mid(sString, nPTR, 1)))
 Next

 UniToAsc = sAsc
End Function

