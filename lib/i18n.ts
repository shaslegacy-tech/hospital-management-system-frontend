export type Locale = "en" | "hi" | "mr";

export const locales: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
];


export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.search": "Search",
    "common.loading": "Loading...",
    "common.logout": "Log out",
    "common.myProfile": "My profile",
    "common.changePassword": "Change password",
    "common.viewAll": "View all",
    "common.bookNew": "Book new",
    "common.pending": "Pending",
    "common.confirmed": "Confirmed",
    "common.completed": "Completed",
    "common.cancelled": "Cancelled",
    "common.paid": "Paid",
 
    // Auth
    "auth.welcomeBack": "Welcome back",
    "auth.signInSubtitle": "Sign in to manage your appointments and records.",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.signIn": "Sign in",
    "auth.newHere": "New here?",
    "auth.createAccount": "Create a patient account",
    "auth.createAccountTitle": "Create your account",
    "auth.createAccountSubtitle": "Takes less than a minute. No paperwork.",
    "auth.fullName": "Full name",
    "auth.phone": "Phone number",
    "auth.confirmPassword": "Confirm",
    "auth.alreadyRegistered": "Already registered?",
 
    // Sidebar / navigation
    "nav.dashboard": "Dashboard",
    "nav.findDoctors": "Find Doctors",
    "nav.appointments": "Appointments",
    "nav.medicalRecords": "Medical Records",
    "nav.bills": "Bills",
    "nav.profile": "Profile",
 
    // Dashboard
    "dashboard.goodToSeeYou": "Good to see you",
    "dashboard.subtitle": "Here's what's happening with your care",
    "dashboard.upcomingAppointments": "Upcoming appointments",
    "dashboard.pendingBills": "Pending bills",
    "dashboard.totalVisits": "Total visits",
    "dashboard.lastCheckup": "Last checkup",
    "dashboard.noAppointments": "No upcoming appointments",
    "dashboard.noAppointmentsDesc":
      "Find a doctor and book your next visit — it only takes a minute.",
    "dashboard.findADoctor": "Find a doctor",
    "dashboard.recentBills": "Recent bills",
 
    // Doctors
    "doctors.title": "Find a doctor",
    "doctors.subtitle": "Search by name, department or specialization",
    "doctors.bookVisit": "Book visit",
    "doctors.available": "Available",
    "doctors.unavailable": "Unavailable",
    "doctors.yearsExp": "yrs exp",
 
    // Appointments
    "appointments.title": "Appointments",
    "appointments.upcoming": "Upcoming",
    "appointments.past": "Past visits",
    "appointments.cancelAppointment": "Cancel appointment",
 
    // Bills
    "bills.title": "Bills",
    "bills.totalPaid": "Total paid",
    "bills.payNow": "Pay now",
  },
 
  hi: {
    // Common
    "common.save": "सहेजें",
    "common.cancel": "रद्द करें",
    "common.confirm": "पुष्टि करें",
    "common.back": "वापस",
    "common.search": "खोजें",
    "common.loading": "लोड हो रहा है...",
    "common.logout": "लॉग आउट",
    "common.myProfile": "मेरी प्रोफ़ाइल",
    "common.changePassword": "पासवर्ड बदलें",
    "common.viewAll": "सभी देखें",
    "common.bookNew": "नई बुकिंग",
    "common.pending": "लंबित",
    "common.confirmed": "पुष्टि हो गई",
    "common.completed": "पूर्ण",
    "common.cancelled": "रद्द",
    "common.paid": "भुगतान हो गया",

    // Auth
    "auth.welcomeBack": "वापसी पर स्वागत है",
    "auth.signInSubtitle": "अपनी अपॉइंटमेंट और रिकॉर्ड प्रबंधित करने के लिए साइन इन करें।",
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.signIn": "साइन इन करें",
    "auth.newHere": "नए हैं?",
    "auth.createAccount": "मरीज़ खाता बनाएं",
    "auth.createAccountTitle": "अपना खाता बनाएं",
    "auth.createAccountSubtitle": "एक मिनट से भी कम समय लगता है। कोई कागज़ी कार्रवाई नहीं।",
    "auth.fullName": "पूरा नाम",
    "auth.phone": "फ़ोन नंबर",
    "auth.confirmPassword": "पुष्टि करें",
    "auth.alreadyRegistered": "पहले से पंजीकृत हैं?",

    // Sidebar / navigation
    "nav.dashboard": "डैशबोर्ड",
    "nav.findDoctors": "डॉक्टर खोजें",
    "nav.appointments": "अपॉइंटमेंट",
    "nav.medicalRecords": "मेडिकल रिकॉर्ड",
    "nav.bills": "बिल",
    "nav.profile": "प्रोफ़ाइल",

    // Dashboard
    "dashboard.goodToSeeYou": "आपका स्वागत है",
    "dashboard.subtitle": "आपकी सेहत से जुड़ी जानकारी यहाँ है",
    "dashboard.upcomingAppointments": "आगामी अपॉइंटमेंट",
    "dashboard.pendingBills": "लंबित बिल",
    "dashboard.totalVisits": "कुल विज़िट",
    "dashboard.lastCheckup": "पिछली जांच",
    "dashboard.noAppointments": "कोई आगामी अपॉइंटमेंट नहीं",
    "dashboard.noAppointmentsDesc":
      "डॉक्टर खोजें और अपनी अगली विज़िट बुक करें — सिर्फ एक मिनट लगेगा।",
    "dashboard.findADoctor": "डॉक्टर खोजें",
    "dashboard.recentBills": "हाल के बिल",

    // Doctors
    "doctors.title": "डॉक्टर खोजें",
    "doctors.subtitle": "नाम, विभाग या विशेषज्ञता से खोजें",
    "doctors.bookVisit": "अपॉइंटमेंट बुक करें",
    "doctors.available": "उपलब्ध",
    "doctors.unavailable": "अनुपलब्ध",
    "doctors.yearsExp": "वर्ष अनुभव",

    // Appointments
    "appointments.title": "अपॉइंटमेंट",
    "appointments.upcoming": "आगामी",
    "appointments.past": "पिछली विज़िट",
    "appointments.cancelAppointment": "अपॉइंटमेंट रद्द करें",

    // Bills
    "bills.title": "बिल",
    "bills.totalPaid": "कुल भुगतान",
    "bills.payNow": "अभी भुगतान करें",
  },

  mr: {
    // Common
    "common.save": "जतन करा",
    "common.cancel": "रद्द करा",
    "common.confirm": "पुष्टी करा",
    "common.back": "मागे",
    "common.search": "शोधा",
    "common.loading": "लोड होत आहे...",
    "common.logout": "लॉग आउट",
    "common.myProfile": "माझे प्रोफाइल",
    "common.changePassword": "पासवर्ड बदला",
    "common.viewAll": "सर्व पहा",
    "common.bookNew": "नवीन बुक करा",
    "common.pending": "प्रलंबित",
    "common.confirmed": "पुष्टी केले",
    "common.completed": "पूर्ण",
    "common.cancelled": "रद्द",
    "common.paid": "दिलेला",

    // Auth
    "auth.welcomeBack": "परत स्वागत आहे",
    "auth.signInSubtitle": "तुमची अपॉइंटमेंट आणि नोंदी व्यवस्थापित करण्यासाठी साइन इन करा.",
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.signIn": "साइन इन करा",
    "auth.newHere": "नवे आहात?",
    "auth.createAccount": "रुग्ण खाते तयार करा",
    "auth.createAccountTitle": "तुमचे खाते तयार करा",
    "auth.createAccountSubtitle": "फक्त काही सेकंद लागतात. कोणतीही कागदपत्रे नाहीत.",
    "auth.fullName": "पूर्ण नाव",
    "auth.phone": "फोन नंबर",
    "auth.confirmPassword": "पुष्टी करा",
    "auth.alreadyRegistered": "आधीपासून नोंदणीकृत आहात?",

    // Sidebar / navigation
    "nav.dashboard": "डॅशबोर्ड",
    "nav.findDoctors": " डॉक्टर शोधा",
    "nav.appointments": "अपॉइंटमेंट",
    "nav.medicalRecords": "मेडिकल रेकॉर्ड",
    "nav.bills": "बील",
    "nav.profile": "प्रोफाइल",

    // Dashboard
    "dashboard.goodToSeeYou": "तुमचं भेट दिल्यास आनंद झाला",
    "dashboard.subtitle": "तुमच्या आरोग्याबद्दल येथे माहिती आहे",
    "dashboard.upcomingAppointments": "येत असलेली अपॉइंटमेंट",
    "dashboard.pendingBills": "प्रलंबित बील",
    "dashboard.totalVisits": "एकूण भेट",
    "dashboard.lastCheckup": "शेवटची तपासणी",
    "dashboard.noAppointments": "कोणतीही Upcoming अपॉइंटमेंट नाही",
    "dashboard.noAppointmentsDesc":
      "डॉक्टर शोधा आणि तुमची पुढील भेट बुक करा — फक्त एक मिनिट लागेल.",
    "dashboard.findADoctor": "डॉक्टर शोधा",
    "dashboard.recentBills": "अलीकडील बील",

    // Doctors
    "doctors.title": "डॉक्टर शोधा",
    "doctors.subtitle": "नाव, विभाग किंवा तज्ञता वाचून शोधा",
    "doctors.bookVisit": "भेट बुक करा",
    "doctors.available": "उपलब्ध",
    "doctors.unavailable": "उपलब्ध नाही",
    "doctors.yearsExp": "वर्ष अनुभव",

    // Appointments
    "appointments.title": "अपॉइंटमेंट",
    "appointments.upcoming": "येत असलेले",
    "appointments.past": "मागील भेट",
    "appointments.cancelAppointment": "अपॉइंटमेंट रद्द करा",

    // Bills
    "bills.title": "बील",
    "bills.totalPaid": "एकूण भरले",
    "bills.payNow": "आता पैसे भरा",
  },
};
 