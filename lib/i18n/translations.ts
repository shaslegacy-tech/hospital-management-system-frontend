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
    "dashboard.noBills": "No bills yet",
    "dashboard.noBillsDesc": "Bills from your completed visits will show up here.",
 
    // Doctors
    "doctors.title": "Find a doctor",
    "doctors.subtitle": "Search by name, department or specialization",
    "doctors.bookVisit": "Book visit",
    "doctors.available": "Available",
    "doctors.unavailable": "Unavailable",
    "doctors.yearsExp": "yrs exp",
    "doctors.searchPlaceholder": "Doctor name or specialization",
    "doctors.allDepartments": "All departments",
    "doctors.availableNow": "Available now",
    "doctors.search": "Search",
    "doctors.noDoctorsFound": "No doctors found",
    "doctors.noDoctorsDescription":
    "Try a different search term or clear your filters.",
    "doctors.previous": "Prev",
    "doctors.next": "Next",
    "doctors.page": "Page",
    "doctors.of": "of",
    "doctors.appointmentBooked":
    "Appointment booked! Check your dashboard for details.",
 
    // Appointments
    "appointments.title": "Appointments",
    "appointments.subtitle": "All your visits, in one place",
    "appointments.upcoming": "Upcoming",
    "appointments.past": "Past visits",
    "appointments.cancelled": "Cancelled",
    "appointments.cancelAppointment": "Cancel appointment",
    "appointments.cancelledSuccess": "Appointment cancelled.",
    "appointments.cancelError": "Couldn't cancel this appointment. Try again.",
    "appointments.emptyUpcoming": "No upcoming appointments",
    "appointments.emptyUpcomingDesc":
    "You don't have anything scheduled. Book a visit whenever you're ready.",
    "appointments.emptyTab": "Your appointments will appear here.",
    "appointments.rateVisit": "Rate this visit",
    "appointments.cancelConfirmTitle": "Cancel appointment?",
    "appointments.cancelConfirmDescription":
    "This will free up the slot and notify your doctor. You can always book a new one.",
    "appointments.confirmCancel": "Yes, cancel it",
    "appointments.feedbackThanks": "Thanks for your feedback!",
 
    // Bills
    "bills.title": "Bills",
    "bills.subtitle": "Charges from your appointments",
    "bills.totalPaid": "Total paid",
    "bills.pendingPayment": "Pending — pay online below",
    "bills.noBills": "No bills yet",
    "bills.noBillsDescription":
    "Bills are generated automatically after a completed visit.",
    "bills.doctor": "Doctor",
    "bills.date": "Date",
    "bills.total": "Total",
    "bills.status": "Status",
    "bills.action": "Action",
    "bills.payNow": "Pay now",
    "bills.emptyTab": "Your bills will appear here.",

    // Profile
    "profile.title": "My profile",
    "profile.subtitle": "Your personal and medical details",
    "profile.patient": "Patient",
    "profile.editProfile": "Edit profile",
    "profile.personalDetails": "Personal details",
    "profile.email": "Email",
    "profile.phone": "Phone",
    "profile.dateOfBirth": "Date of birth",
    "profile.bloodGroup": "Blood group",
    "profile.address": "Address",
    "profile.emergencyContact": "Emergency contact",
    "profile.medicalHistory": "Medical history",
    "profile.editProfileTitle": "Edit profile",
    "profile.selectBloodGroup": "Select blood group",
    "profile.emergencyContactName": "Emergency contact name",
    "profile.emergencyContactNumber": "Emergency contact number",
    "profile.optional": "optional",
    "profile.cancel": "Cancel",
    "profile.saveChanges": "Save changes",
    "profile.updatedSuccessfully": "Profile updated successfully.",
    "profile.updateError": "Couldn't update profile. Please try again.",

    // Medical Records
    "records.title": "Medical records",
    "records.subtitle":
    "Diagnoses, treatments and prescriptions from your visits",
    "records.noRecords": "No medical records yet",
    "records.noRecordsDescription":
    "Once a doctor completes your visit, the diagnosis and treatment notes will appear here.",
    "records.treatment": "Treatment",
    "records.notes": "Notes",
    "records.prescriptions": "Prescriptions",
    "records.emptyTab": "Your medical records will appear here.",

    // AI / Symptom Checker
    "ai.notSureWhoToSee": "Not sure who to see?",
    "ai.describeSymptoms":
    "Describe your symptoms and we'll suggest a department",
    "ai.getSuggestion": "Get a suggestion",
    "ai.emergencyCare":
    "Please seek emergency care immediately rather than booking online.",
    "ai.suggested": "Suggested",
    "ai.urgency": "urgency",
    "ai.viewDoctors": "View {department} doctors",
    "ai.symptoms": "Symptoms",
    "ai.symptomPlaceholder":
  "e.g. I've had a persistent cough and mild fever for 3 days...",
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
    "dashboard.noBills": "कोई बिल नहीं",
    "dashboard.noBillsDesc":
      "अपने पूर्ण विज़िट के बिल यहाँ दिखाई जाएँगे।",

    // Doctors
    "doctors.title": "डॉक्टर खोजें",
    "doctors.subtitle": "नाम, विभाग या विशेषज्ञता से खोजें",
    "doctors.bookVisit": "अपॉइंटमेंट बुक करें",
    "doctors.available": "उपलब्ध",
    "doctors.unavailable": "अनुपलब्ध",
    "doctors.yearsExp": "वर्ष अनुभव",
    "doctors.searchPlaceholder": "डॉक्टर का नाम या विशेषज्ञता",
    "doctors.allDepartments": "सभी विभाग",
    "doctors.availableNow": "अभी उपलब्ध",
    "doctors.search": "खोजें",
    "doctors.noDoctorsFound": "कोई डॉक्टर नहीं मिला",
    "doctors.noDoctorsDescription":
    "कोई दूसरा खोज शब्द आज़माएं या फ़िल्टर हटा दें।",
    "doctors.previous": "पिछला",
    "doctors.next": "अगला",
    "doctors.page": "पेज",
    "doctors.of": "में से",
    "doctors.appointmentBooked":
    "अपॉइंटमेंट बुक हो गई है! विवरण के लिए अपना डैशबोर्ड देखें।",

    // Appointments
    "appointments.title": "अपॉइंटमेंट",
    "appointments.subtitle": "आपकी सभी विज़िट, एक ही जगह",
    "appointments.upcoming": "आगामी",
    "appointments.past": "पिछली विज़िट",
    "appointments.cancelled": "रद्द की गई",
    "appointments.cancelAppointment": "अपॉइंटमेंट रद्द करें",
    "appointments.cancelledSuccess": "अपॉइंटमेंट रद्द कर दी गई।",
    "appointments.cancelError": "अपॉइंटमेंट रद्द नहीं की जा सकी। कृपया पुनः प्रयास करें।",
    "appointments.emptyUpcoming": "कोई आगामी अपॉइंटमेंट नहीं",
    "appointments.emptyUpcomingDesc":
    "आपकी कोई अपॉइंटमेंट निर्धारित नहीं है। जब चाहें अपनी विज़िट बुक करें।",
    "appointments.emptyTab": "आपकी अपॉइंटमेंट यहाँ दिखाई देंगी।",
    "appointments.rateVisit": "इस विज़िट को रेट करें",
    "appointments.cancelConfirmTitle": "अपॉइंटमेंट रद्द करें?",
    "appointments.cancelConfirmDescription":
    "इससे स्लॉट खाली हो जाएगा और आपके डॉक्टर को सूचना मिल जाएगी। आप बाद में नई अपॉइंटमेंट बुक कर सकते हैं।",
    "appointments.confirmCancel": "हाँ, रद्द करें",
    "appointments.feedbackThanks": "आपकी प्रतिक्रिया के लिए धन्यवाद!",

    // Bills
    "bills.title": "बिल",
    "bills.subtitle": "आपकी अपॉइंटमेंट के शुल्क",
    "bills.totalPaid": "कुल भुगतान",
    "bills.pendingPayment": "लंबित — नीचे ऑनलाइन भुगतान करें",
    "bills.noBills": "अभी कोई बिल नहीं है",
    "bills.noBillsDescription":
    "पूरी हुई विज़िट के बाद बिल अपने आप जनरेट हो जाते हैं।",
    "bills.doctor": "डॉक्टर",
    "bills.date": "तारीख",
    "bills.total": "कुल",
    "bills.status": "स्थिति",
    "bills.action": "कार्रवाई",
    "bills.payNow": "अभी भुगतान करें",
    "bills.emptyTab": "आपकी बिल यहाँ दिखाई देंगी।",

    // Profile
    "profile.title": "मेरी प्रोफ़ाइल",
    "profile.subtitle": "आपकी व्यक्तिगत और स्वास्थ्य संबंधी जानकारी",
    "profile.patient": "मरीज़",
    "profile.editProfile": "प्रोफ़ाइल संपादित करें",
    "profile.personalDetails": "व्यक्तिगत जानकारी",
    "profile.email": "ईमेल",
    "profile.phone": "फ़ोन",
    "profile.dateOfBirth": "जन्म तिथि",
    "profile.bloodGroup": "ब्लड ग्रुप",
    "profile.address": "पता",
    "profile.emergencyContact": "आपातकालीन संपर्क",
    "profile.medicalHistory": "मेडिकल इतिहास",
    "profile.editProfileTitle": "प्रोफ़ाइल संपादित करें",
    "profile.selectBloodGroup": "ब्लड ग्रुप चुनें",
    "profile.emergencyContactName": "आपातकालीन संपर्क का नाम",
    "profile.emergencyContactNumber": "आपातकालीन संपर्क नंबर",
    "profile.optional": "वैकल्पिक",
    "profile.cancel": "रद्द करें",
    "profile.saveChanges": "परिवर्तन सहेजें",
    "profile.updatedSuccessfully": "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई।",
    "profile.updateError": "प्रोफ़ाइल अपडेट नहीं हो सकी। कृपया पुनः प्रयास करें।",

    // Medical Records
    "records.title": "मेडिकल रिकॉर्ड",
    "records.subtitle":
    "आपकी विज़िट से जुड़े निदान, उपचार और प्रिस्क्रिप्शन",
    "records.noRecords": "अभी कोई मेडिकल रिकॉर्ड नहीं है",
    "records.noRecordsDescription":
    "डॉक्टर द्वारा आपकी विज़िट पूरी करने के बाद निदान और उपचार की जानकारी यहाँ दिखाई देगी।",
    "records.treatment": "उपचार",
    "records.notes": "नोट्स",
    "records.prescriptions": "प्रिस्क्रिप्शन",
    "records.emptyTab": "आपके मेडिकल रिकॉर्ड यहाँ दिखाई देंगे।",

    // AI / Symptom Checker
    "ai.notSureWhoToSee": "समझ नहीं आ रहा किस डॉक्टर से मिलें?",
    "ai.describeSymptoms":
    "अपने लक्षण बताएं और हम आपके लिए उपयुक्त विभाग सुझाएंगे",
    "ai.getSuggestion": "सुझाव पाएं",
    "ai.emergencyCare":
    "ऑनलाइन अपॉइंटमेंट बुक करने के बजाय तुरंत आपातकालीन चिकित्सा सहायता लें।",
    "ai.suggested": "सुझाव",
    "ai.urgency": "तत्कालता",
    "ai.viewDoctors": "{department} के डॉक्टर देखें",
    "ai.symptoms": "लक्षण",
    "ai.symptomPlaceholder":
  "जैसे, मुझे 3 दिनों से लगातार खांसी और हल्का बुखार है...",
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
    "dashboard.noBills": "कोणतीही बील नाही",
    "dashboard.noBillsDesc":
      "डॉक्टर शोधा आणि तुमची पुढील भेट बुक करा — फक्त एक मिनिट लागेल.",

    // Doctors
    "doctors.title": "डॉक्टर शोधा",
    "doctors.subtitle": "नाव, विभाग किंवा तज्ञतेनुसार शोधा",
    "doctors.bookVisit": "अपॉइंटमेंट बुक करा",
    "doctors.available": "उपलब्ध",
    "doctors.unavailable": "उपलब्ध नाही",
    "doctors.yearsExp": "वर्षांचा अनुभव",
    "doctors.searchPlaceholder": "डॉक्टरचे नाव किंवा तज्ञता",
    "doctors.allDepartments": "सर्व विभाग",
    "doctors.availableNow": "आत्ता उपलब्ध",
    "doctors.search": "शोधा",
    "doctors.noDoctorsFound": "कोणताही डॉक्टर सापडला नाही",
    "doctors.noDoctorsDescription":
    "वेगळा शोध शब्द वापरून पहा किंवा फिल्टर काढून टाका.",
    "doctors.previous": "मागील",
    "doctors.next": "पुढील",
    "doctors.page": "पृष्ठ",
    "doctors.of": "पैकी",
    "doctors.appointmentBooked": "अपॉइंटमेंट बुक झाली आहे! तपशीलासाठी तुमचा डॅशबोर्ड पहा.",

    // Appointments
    "appointments.title": "अपॉइंटमेंट",
    "appointments.subtitle": "तुमच्या सर्व भेटी, एकाच ठिकाणी",
    "appointments.upcoming": "येत असलेल्या",
    "appointments.past": "मागील भेटी",
    "appointments.cancelled": "रद्द केलेल्या",
    "appointments.cancelAppointment": "अपॉइंटमेंट रद्द करा",
    "appointments.cancelledSuccess": "अपॉइंटमेंट रद्द केली आहे.",
    "appointments.cancelError": "अपॉइंटमेंट रद्द करता आली नाही. कृपया पुन्हा प्रयत्न करा.",
    "appointments.emptyUpcoming": "कोणतीही आगामी अपॉइंटमेंट नाही",
    "appointments.emptyUpcomingDesc":
    "तुमची कोणतीही अपॉइंटमेंट निश्चित केलेली नाही. तुम्ही तयार असाल तेव्हा भेट बुक करा.",
    "appointments.emptyTab": "तुमच्या अपॉइंटमेंट येथे दिसतील.",
    "appointments.rateVisit": "या भेटीला रेट करा",
    "appointments.cancelConfirmTitle": "अपॉइंटमेंट रद्द करायची आहे?",
    "appointments.cancelConfirmDescription":
    "यामुळे स्लॉट मोकळा होईल आणि तुमच्या डॉक्टरांना सूचना मिळेल. तुम्ही नंतर नवीन अपॉइंटमेंट बुक करू शकता.",
    "appointments.confirmCancel": "होय, रद्द करा",
    "appointments.feedbackThanks": "तुमच्या अभिप्रायाबद्दल धन्यवाद!",

    // Bills
    "bills.title": "बिले",
    "bills.subtitle": "तुमच्या अपॉइंटमेंटचे शुल्क",
    "bills.totalPaid": "एकूण भरलेले",
    "bills.pendingPayment": "प्रलंबित — खाली ऑनलाइन पेमेंट करा",
    "bills.noBills": "अद्याप कोणतेही बिल नाही",
    "bills.noBillsDescription":
    "भेट पूर्ण झाल्यानंतर बिले आपोआप तयार होतात.",
    "bills.doctor": "डॉक्टर",
    "bills.date": "तारीख",
    "bills.total": "एकूण",
    "bills.status": "स्थिती",
    "bills.action": "कृती",
    "bills.payNow": "आता पेमेंट करा",
    "bills.emptyTab": "तुमची बिल येथे दिसतील.",

    // Profile
    "profile.title": "माझे प्रोफाइल",
    "profile.subtitle": "तुमची वैयक्तिक आणि वैद्यकीय माहिती",
    "profile.patient": "रुग्ण",
    "profile.editProfile": "प्रोफाइल संपादित करा",
    "profile.personalDetails": "वैयक्तिक माहिती",
    "profile.email": "ईमेल",
    "profile.phone": "फोन",
    "profile.dateOfBirth": "जन्मतारीख",
    "profile.bloodGroup": "रक्तगट",
    "profile.address": "पत्ता",
    "profile.emergencyContact": "आपत्कालीन संपर्क",
    "profile.medicalHistory": "वैद्यकीय इतिहास",
    "profile.editProfileTitle": "प्रोफाइल संपादित करा",
    "profile.selectBloodGroup": "रक्तगट निवडा",
    "profile.emergencyContactName": "आपत्कालीन संपर्काचे नाव",
    "profile.emergencyContactNumber": "आपत्कालीन संपर्क क्रमांक",
    "profile.optional": "ऐच्छिक",
    "profile.cancel": "रद्द करा",
    "profile.saveChanges": "बदल जतन करा",
    "profile.updatedSuccessfully": "प्रोफाइल यशस्वीरित्या अपडेट झाले.",
    "profile.updateError": "प्रोफाइल अपडेट करता आले नाही. कृपया पुन्हा प्रयत्न करा.",

    // Medical Records
    "records.title": "वैद्यकीय नोंदी",
    "records.subtitle":
    "तुमच्या भेटींमधील निदान, उपचार आणि प्रिस्क्रिप्शन",
    "records.noRecords": "अद्याप कोणत्याही वैद्यकीय नोंदी नाहीत",
    "records.noRecordsDescription":
    "डॉक्टरांनी तुमची भेट पूर्ण केल्यानंतर निदान आणि उपचाराची माहिती येथे दिसेल.",
    "records.treatment": "उपचार",
    "records.notes": "नोंदी",
    "records.prescriptions": "प्रिस्क्रिप्शन",
    "records.emptyTab": "तुमच्या वैद्यकीय नोंदी येथे दिसतील.",

    // AI / Symptom Checker
    "ai.notSureWhoToSee": "कोणत्या डॉक्टरांना भेटावे हे समजत नाही?",
    "ai.describeSymptoms":
    "तुमची लक्षणे सांगा आणि आम्ही योग्य विभाग सुचवू",
    "ai.getSuggestion": "सूचना मिळवा",
    "ai.emergencyCare":
    "ऑनलाइन अपॉइंटमेंट बुक करण्याऐवजी त्वरित आपत्कालीन वैद्यकीय मदत घ्या.",
    "ai.suggested": "सूचित विभाग",
    "ai.urgency": "तातडी",
    "ai.viewDoctors": "{department} डॉक्टर पहा",
    "ai.symptoms": "लक्षणे",
    "ai.symptomPlaceholder":
  "उदा., मला 3 दिवसांपासून सतत खोकला आणि सौम्य ताप आहे...",
  },
};
