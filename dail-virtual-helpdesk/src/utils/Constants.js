let callnumber = {
    callnumber1Eng: (() => {
        try {
            return window.ScalaGetVariable("sos_medical")
        } catch (error) {
            return `080-23456789`
        }
    }),
    callnumber2Eng: (() => {
        try {
            return window.ScalaGetVariable("sos_firefighter")
        } catch (error) {
            return `080-68951137`
        }
    }),
    callnumber3Eng: (() => {
        try {
            return window.ScalaGetVariable("sos_security")
        } catch (error) {
            return `080-789325632`
        }
    })
};

function kioskid() {
    try {
        return window.ScalaGetVariable("kioskId")
    } catch (error) {
        return 114
    }
}

export default {
    isScanQr: false,
    isBoarding: false,
    hideCrossBar: false,
    kioskid: kioskid(),
    // kioskid: window.ScalaGetVariable("kioskId"),
    videoCallUrl: (() => {
        try {
            return window.ScalaGetVariable("videoCallURL")
        } catch (error) {
            return 'https://10.10.2.61:3000/main'
        }
    }),
    gateCatId: 122,
    mapMobileUrl: (() => {
        try {
            return `${window.ScalaGetVariable("MobilePath_URL")}/index.html`
        } catch (error) {
            return 'http://10.10.2.73:8081'
        }
    }),
    timeOutInMinForAllPages: (() => {
        try {
            return window.ScalaGetVariable("pageTimeoutInMin")
        } catch (error) {
            return 1
        }
    }),
    timeOutInMinForTalktoUs: (() => {
        try {
            return window.ScalaGetVariable("videoCallPageTimeoutInMin")
        } catch (error) {
            return 2
        }
    }),
    weatherXMLUrl: (() => {
        try {
            return window.ScalaGetVariable("weatherXMLUrl")
        } catch (error) {
            return 'assets/testabc_3.xml'
        }
    }),
    flightXmL: (() => {
        try {
            return window.ScalaGetVariable("xmlURL")
        } catch (error) {
            return `assets/DIAL_Flightfeed.xml`
        }
    }),
    getVideoCallUrl: (() => {
        try {
            let url = window.ScalaGetVariable("videoCallURL");
            let reason = 'OTHERS', kioskName= 'Airport';
            return (`${url}/${kioskName}/${reason.replace(/ /g, "")}`);
        } catch (error) {
            return `https://172.16.1.3:3000/main/precheckin/OTHERS`
        }
    }),
    statusData: [
        { status: "AIB", value: "Scheduled" },
        { status: "DEP", value: "Departed" },
        { status: "COP", value: "Check In Open" },
        { status: "COC", value: "Check In Closed" },
        { status: "GCL", value: "Gate Closed" },
        { status: "GTO", value: "Gate Open" },
        { status: "LCL", value: "lcl" },
        { status: "DLY", value: "Delayed" },
        { status: "BRD", value: "Boarding" },
        { status: "NOP", value: "No Operation" },
        { status: "ARR", value: "Arrival" },
        { status: "ETA", value: "ETA" },
        { status: "LAN", value: "Landed" },
    ],
    engValues: {
        or: "OR",
        yes: "YES",
        no: "NO",
        aminity: "AMENITIES",
        timeout: "TIMEOUT INITIATED",
        wantToContinue: "DO YOU WANT TO CONTINUE?",
        talkToUsPageLeaveMessage: "CALL WILL BE DISCONNECTED",
        findway: "FIND WAY",
        enterFlightNo: "PLEASE ENTER FLIGHT NUMBER",
        notFound: "FLIGHT NUMBER NOT FOUND",
        domesticZoneText: "DOMESTIC DEPARTURE",
        selectDept: "PLEASE SELECT DEPARTURE",
        internationalZoonText: "INTERNATIONAL DEPARTURE",
        homeBtnText1: "BOARDING INFORMATION",
        homeBtnText2: "EXPLORE THE AIRPORT",
        homeBtnText3: "TALK TO US",
        homeBtnText4: "EMERGENCY ASSISTANCE",
        homeBtnText5: "FEEDBACK",
        homeBtnText6: "SCAN QR",
        langBtn: "हिन्दी",
        langText: "CHANGE LANGUAGE",
        virtualText: "VIRTUAL HELP DESK",
        namste: "HAPPY TO HELP YOU",
        dialText: " DIAL TO CONNECT",
        dialBtn1: "BUGGY",
        dialBtn2: "WHEELCHAIR SERVICES",
        dialBtn3: "LOST PROPERTY",
        dialBtn4: "OTHERS",
        cat: "CATEGORY",
        sosBtn1: "MEDICAL SERVICES",
        sosBtn2: "FIREFIGHTING & RESCUE",
        sosBtn3: "SECURITY ASSISTANCE",
        sosBtn: "ONE TOUCH CONNECT",
        scanQR: "PLEASE SCAN FOR FOOD APP",
        quitBtn: "QUIT",
        rateUs: "PLEASE RATE YOUR EXPERIENCE",
        thankYou: "THANK YOU FOR YOUR FEEDBACK",
        scanDirection: " SCAN TO GET DIRECTIONS ON YOUR MOBILE PHONE",
        alertText: "ALERT HAS BEEN INITIATED",
        feedbackqtn1: "HOW SATISFIED WERE YOU WITH SECURITY SCREENING PROCESS?",
        feedbackqtn2: "HOW SATISFIED WERE YOU WITH CHECK-IN PROCESS?",
        feedbackqtn3: "HOW SATISFIED WERE YOU WITH OVERALL CLEANLINESS OF THE TERMINAL BUILDING?",
        feedbackqtn4: "HOW SATISFIED WERE YOU WITH THE FOOD AND BEVERAGE SERVICES?",
        feedbackqtn5: "HOW SATISFIED WERE YOU WITH SHOPPING EXPERIENCE AT THE AIRPORT DUTY FREE?",
        feedbackqtn6: "HOW SATISFIED WERE YOU WITH THE STAFF FRIENDLINESS?",
        feedbackqtn7: "HOW SATISFIED WERE YOU WITH THE SERVICES AND FACILITIES AT AIRPORT?",
        Abrre1: "SECURITY SCREENING",
        Abrre2: "CHECK-IN PROCESS",
        Abrre3: "CLEANLINESS",
        Abrre4: "FOOD AND BEVERAGE SERVICES",
        Abrre5: "SHOPPING EXPERIENCE",
        Abrre6: "STAFF FRIENDLINESS",
        Abrre7: "SERVICES AND FACILITIES",
        opts1: "VERY SATISFIED",
        opts2: "SATISFIED",
        opts3: "NEUTRAL",
        opts4: "NOT SATISFIED",
        name: "NAME",
        email: "EMAIL",
        telno: "TEL NO",
        nationality: "NATIONALITY",
        date: "DATE",
        time: "TIME",
        flightno: "FLIGHT NO.",
        comments: "WHAT MORE SERVICE WOULD YOU LIKE TO SEE ON THIS KIOSK?",
        submitBtn: "SUBMIT",
        scanPass: "PLEASE SCAN YOUR BOARDING PASS",
        callEmergency1: "FOR EMERGENCY CALL  ",
        callEmergency2: "FOR EMERGENCY CALL  ",
        callEmergency3: "FOR EMERGENCY CALL  ",
        callnumber1: callnumber.callnumber1Eng(),
        callnumber2: callnumber.callnumber2Eng(),
        callnumber3: callnumber.callnumber3Eng(),
        getAnotherPass: "GET ANOTHER BOARDING DETAILS",
        boarding: "BOARDING",
        sucessMessage: "FORM SUBMITTED SUCCESSFULLY",
        scanForOffer: "SCAN TO GET YOUR REWARDS",
        flight: "FLIGHT",
        boardtime: "BOARD TIME",
        departure: "DEPARTURE",
        gateno: "GATE NO",
        status: "STATUS",
        gate: "GATE",
        timePlanner: "Time Planner",
        walkingTime: "Security check time + Approximately Distance Time to gate",
        within: 'Within ',
        mins: ' Mins',
        switchDept: 'SWITCH DEPARTURE',
        pnrnum: 'PNR NO.',
        kindly: 'Kindly Enter Email (or) Tel No'

    },
    hindiValues: {
        or: "या",
        yes: "हां",
        no: "नहीं",
        findway: "रास्ता खोजें",
        aminity: "सुविधाएं",
        timeout: "समय समाप्त हो गया",
        enterFlightNo: "कृपया उड़ान संख्या दर्ज करें",
        notFound: "उड़ान संख्या नहीं मिली",
        wantToContinue: "क्या आप जारी रखना चाहते हैं?",
        talkToUsPageLeaveMessage: "कॉल कट जाएगी",
        domesticZoneText: "घरेलू प्रस्थान",
        selectDept: "कृपया प्रस्थान का चयन करें",
        internationalZoonText: "अंतरराष्ट्रीय प्रस्थान",
        homeBtnText1: "बोर्डिंग सूचना",
        homeBtnText2: "हवाई अड्डे का अन्वेषण करें",
        homeBtnText3: "ग्राहक देखभाल",
        homeBtnText4: "आपातकालीन सहायता",
        homeBtnText5: "प्रतिक्रिया",
        homeBtnText6: "क्यूआर स्कैन करें",
        langBtn: "ENGLISH",
        langText: "भाषा बदलें",
        virtualText: "वर्चुअल हेल्प डेस्क",
        namste: "नमस्ते",
        dialText: "कनेक्ट करने के लिए डायल करें",
        dialBtn1: "छोटी गाड़ी सेवा",
        dialBtn2: "व्हील चेयर सहायता",
        dialBtn3: "खोया हुआ सामान",
        dialBtn4: "अन्य",
        cat: "श्रेणी",
        sosBtn1: "चिकित्सा सेवाएं",
        sosBtn2: "अग्निशमन और बचाव",
        sosBtn3: "सुरक्षा सहायता",
        sosBtn: "एक स्पर्श कनेक्ट",
        scanQR: "कृपया ऐप के लिए स्कैन करें",
        quitBtn: "क्निस्तार",
        rateUs: "कृपया अपने अनुभव का मूल्यांकन करें",
        thankYou: "आपकी प्रतिक्रिया के लिए आपका धन्यवाद",
        scanDirection: " अपने मोबाइल फोन पर दिशा-निर्देश प्राप्त करने के लिए स्कैन करें",
        alertText: "अलर्ट शुरू कर दिया गया है",
        feedbackqtn1: "आप स्क्रीनिंग प्रक्रिया से कितने संतुष्ट हैं?",
        feedbackqtn2: "आप चेक-इन प्रक्रिया से कितने संतुष्ट थे?",
        feedbackqtn3: "आप टर्मिनल भवन की समग्र सफाई से कितने संतुष्ट थे?",
        feedbackqtn4: "आप खाद्य और पेय सेवाओं से कितने संतुष्ट थे?",
        feedbackqtn5: "हवाई अड्डे पर शुल्क मुक्त खरीदारी के अनुभव से आप कितने संतुष्ट थे?",
        feedbackqtn6: "आप कर्मचारियों के साहचर्य से कितने संतुष्ट हैं?",
        feedbackqtn7: "आप हवाई अड्डे की सेवाओं और सुविधाओं से कितने संतुष्ट थे?",
        Abrre1: "SECURITY SCREENING",
        Abrre2: "CHECK-IN PROCESS",
        Abrre3: "CLEANLINESS",
        Abrre4: "FOOD AND BEVERAGE SERVICES",
        Abrre5: "SHOPPING EXPERIENCE",
        Abrre6: "STAFF FRIENDLINESS",
        Abrre7: "SERVICES AND FACILITIES",
        opts1: "बहुत संतुष्ट",
        opts2: "संतुष्ट",
        opts3: "निष्पक्ष",
        opts4: "संतुष्ट नहीं",
        name: "नाम",
        email: "ईमेल",
        telno: "टेलीफोन नंबर",
        nationality: "राष्ट्रीयता",
        date: "दिनांक",
        time: "समय",
        flightno: "उड़ान संख्या.",
        comments: "आप कियोस्क पर और क्या सेवा पसंद करेंगे?",
        submitBtn: "प्रस्तुत",
        scanPass: "कृपया अपना बोर्डिंग पास स्कैन करें",
        callEmergency1: "आपातकालीन  ",
        callEmergency2: "आपातकालीन ",
        callEmergency3: "आपातकालीन  ",
        callnumber1: callnumber.callnumber1Eng(),
        callnumber2: callnumber.callnumber2Eng(),
        callnumber3: callnumber.callnumber3Eng(),
        getAnotherPass: "एक और बोर्डिंग विवरण प्राप्त करें",
        boarding: "बोर्डिंग",
        sucessMessage: "फॉर्म सफलतापूर्वक जमा किया गया",
        scanForOffer: "अपने पुरस्कार प्राप्त करने के लिए स्कैन करें",
        flight: "उड़ान",
        boardtime: "बोर्ड का समय",
        departure: "प्रस्थान",
        gateno: "गेट नं",
        status: "स्थिति",
        gate: "गेट",
        timePlanner: "टाइम प्लानर",
        walkingTime: "सुरक्षा जांच समय + गेट से लगभग दूरी का समय",
        within: 'लगभाग ',
        mins: ' मिनट',
        switchDept: 'प्रस्थान बदलें',
        pnrnum: 'पीएनआर संख्या.',
        kindly: 'कृपया ईमेल दर्ज करें (या) दूरभाष नं'
    }
}