# StudyPulse - Smart Study & Govt Exam Prep Application

> **आर्किटेक्चर**: Full-Stack Architecture (Frontend + Python REST API Backend + MongoDB Atlas Cloud Database)

---

## 🏗️ नया प्रोजेक्ट स्ट्रक्चर (Project Architecture)

प्रोजेक्ट को पूर्णतः स्वच्छ एवं मॉड्यूलर **Frontend/Backend** संरचना में व्यवस्थित किया गया है:

```
d:\study-app\
├── backend/                         # 🐍 Python WSGI Backend & REST APIs
│   ├── config/
│   │   ├── __init__.py
│   │   └── db.py                    # MongoDB Atlas कनेक्शन, पिंग एवं डेटा सीरियलाइज़र
│   ├── data/                        # MongoDB की प्रारंभिक JSON स्कीमा व डेटा
│   │   ├── users.json               # छात्र खाते, रेफरल कॉइन्स व स्ट्रीक
│   │   ├── notes.json               # RS अग्रवाल फॉर्मूला नोट्स व ट्रिक्स
│   │   ├── tests.json               # प्रतियोगी मॉक टेस्ट (SSC, Railway, GS)
│   │   ├── jobs.json                # सरकारी नौकरी भर्तियां व पात्रता
│   │   ├── syllabus.json            # सिलेबस विषय व टॉपिक चेकलिस्ट
│   │   ├── exams.json               # आगामी परीक्षा अनुसूची
│   │   ├── tasks.json               # दैनिक स्टडी लक्ष्य
│   │   └── test_history.json        # छात्र मॉक टेस्ट स्कोरकार्ड
│   ├── routes/                      # मॉड्यूलर REST API एंडपॉइंट्स
│   │   ├── auth_routes.py           # /api/users (Login, Signup, Profile, Streak)
│   │   ├── notes_routes.py          # /api/notes (RS Aggarwal & Custom Notes CRUD)
│   │   ├── tests_routes.py          # /api/tests (Mock Tests & History CRUD)
│   │   ├── jobs_routes.py           # /api/jobs (Govt Jobs Alerts & Filters)
│   │   ├── syllabus_routes.py       # /api/syllabus (Topic Completion & Chapter CRUD)
│   │   ├── exams_routes.py          # /api/exams (Exam Schedule CRUD)
│   │   ├── tasks_routes.py          # /api/tasks (Daily Targets CRUD)
│   │   └── dashboard_routes.py      # /api/dashboard (Real-time Aggregated Stats)
│   ├── seeder.py                    # MongoDB Atlas ऑटो-सीडर व डेटा सिंक
│   └── server.py                    # एकीकृत Bottle सर्वर (APIs + Static Frontend)
│
├── frontend/                        # 🎨 क्लाइंट वेब एप्लीकेशन
│   ├── index.html                   # मुख्य UI (डैशबोर्ड, टेस्ट रनर, नोट्स, जॉब्स, टाइमर)
│   ├── styles.css                   # मॉडर्न डार्क/लाइट थीम, ग्लासमोर्फिज़्म, एनिमेशन
│   └── js/
│       ├── api.js                   # MongoDB REST API Client (Fetch/Async/Await)
│       └── app.js                   # एप्लीकेशन स्टेट मैनेजर और इंटरैक्टिव लॉजिक
│
├── .env                             # MongoDB Atlas Connection URI
├── run.bat                          # 1-क्लिक विंडोज स्टार्टर
├── run_server.py                    # सर्वर लॉन्चर एवं ऑटोमैटिक ब्राउज़र ओपनर
├── desktop_app.py                   # नेटिव डेस्कटॉप विंडो मोड (PyWebView)
├── Launch_Desktop_App.bat           # डेस्कटॉप ऐप शॉर्टकट लॉन्चर
└── README.md                        # विस्तृत डॉक्यूमेंटेशन
```

---

## 🍃 MongoDB Atlas क्लाउड डेटाबेस (Cloud Database)

सभी फीचर्स का संपूर्ण डेटा सीधे **MongoDB Atlas** क्लाउड क्लस्टर (`studypulse_db`) से जुड़ा हुआ है:

| कलेक्शन का नाम | विवरण | MongoDB ऑपरेशन्स |
|-----------------|-------|-------------------|
| `users` | छात्र प्रोफ़ाइल, यूज़रनेम, पासवर्ड, अवतार, स्ट्रीक, रेफरल कॉइन्स | `find_one`, `insert_one`, `update_one` |
| `notes` | RS अग्रवाल अंकगणित फॉर्मूला नोट्स, शॉर्टकट ट्रिक्स व छात्र नोट्स | `find`, `insert_one`, `update_one`, `delete_one` |
| `tests` | SSC CGL, Railway NTPC, GS स्तरीय 10-10 प्रश्नों के मॉक टेस्ट | `find`, `find_one` |
| `test_results` | छात्रों द्वारा दिए गए टेस्ट के स्कोर, प्रतिशत, समय व तारीख | `find`, `insert_one` |
| `jobs` | SSC CGL, RRB NTPC, SBI PO, Police SI आदि की भर्ती सूचनाएं | `find`, `find_one` |
| `syllabus` | गणित, रीजनिंग, GK के अध्याय एवं टॉपिक्स की पूर्णता स्थिति | `find`, `insert_one`, `update_one`, `delete_one` |
| `exams` | आगामी परीक्षाओं की तिथियां, समय व निर्देश | `find`, `insert_one`, `delete_one` |
| `tasks` | दैनिक स्टडी लक्ष्य (Target Checklist) | `find`, `insert_one`, `update_one`, `delete_one` |

---

## 🚀 एप्लिकेशन कैसे चलाएं (How to Run)

### तरीका 1: डेस्कटॉप शॉर्टकट (सबसे आसान - बिना किसी कमांड लाइन के)
* आपके डेस्कटॉप पर मौजूद **`StudyPulse`** शॉर्टकट पर डबल-क्लिक करें।
* ऐप सीधे नेटिव विंडो में बिना किसी कमांड प्रॉम्प्ट या टर्मिनल के खुल जाएगा!

### तरीका 2: 1-क्लिक साइलेंट स्टार्ट
* प्रोजेक्ट फोल्डर में मौजूद **`start.bat`** या **`Launch_Silent.vbs`** फाइल पर डबल-क्लिक करें।

### तरीका 3: डीबग मोड (टर्मिनल लॉग्स के साथ)
* यदि आप बैकएंड लॉग्स देखना चाहते हैं, तो **`run.bat`** चलाएं।

---

## 🔑 डेमो लॉगिन क्रेडेंशियल्स (Demo Login)

बिना कुछ टाइप किए टेस्ट करने के लिए लॉगिन स्क्रीन पर मौजूद **"1-क्लिक डेमो लॉगिन"** बटन दबाएं:
* **यूज़रनेम**: `student`
* **पासवर्ड**: `123`
*(या आप नया यूज़रनेम और पासवर्ड डालकर कुछ ही सेकंड में नया खाता बना सकते हैं - ईमेल की कोई आवश्यकता नहीं है!)*

---

## 🛡️ सुपर एडमिन पोर्टल (Admin Portal - Content & Exam Management)

एप्लीकेशन में एक पूर्णतः समर्पित **Admin Panel** तैयार किया गया है जो सीधे **MongoDB Atlas** से जुड़ा हुआ है। 
> 💡 **सिस्टम नीति**: सामान्य छात्र केवल पढ़ाई करेंगे (अध्याय पढ़ेंगे, PDF डाउनलोड करेंगे, मॉक टेस्ट देंगे)। सभी नए अध्याय (Chapters), PDF बुक्स, फॉर्मूले, मॉक टेस्ट व जॉब नोटिफिकेशन केवल एडमिन पैनल से ही जोड़े जाएंगे।

### एडमिन पैनल का एक्सेस:
* **एडमिन URL**: [`http://127.0.0.1:5000/admin`](http://127.0.0.1:5000/admin)
* **एडमिन यूज़रनेम**: `admin`
* **एडमिन पासवर्ड**: `admin123`

### एडमिन पैनल के मुख्य फीचर्स:
1. **लाइव मेट्रिक्स डैशबोर्ड (Overview)**: कुल छात्र, कुल अध्याय, कुल PDF स्टडी मटेरियल, एक्टिव टेस्ट व कुल टेस्ट सबमिशन की रीयल-टाइम संख्या।
2. **सिलेबस एवं अध्याय प्रबंधन (Syllabus Management)**: किसी भी विषय (गणित, रीजनिंग, GK, विज्ञान) में नए अध्याय और उनके टॉपिक जोड़ना व हटाना।
3. **PDF स्टडी मटेरियल एवं ई-बुक्स (PDF & Study Materials)**: RS अग्रवाल गणित फॉर्मूला बुक्स, GS हैंडराइटिंग नोट्स व NCERT समरी की PDF अपलोड/लिंक करना।
4. **RS अग्रवाल फॉर्मूला व नोट्स (Formula Notes)**: शॉर्ट ट्रिक्स, महत्वपूर्ण सूत्र एवं टिप्स जोड़ना व पिन करना।
5. **मॉक टेस्ट क्रिएटर (Mock Test Builder)**: समय सीमा, पासिंग मार्क्स, बहुविकल्पीय प्रश्न (MCQ) एवं सही उत्तर व व्याख्या के साथ नए टेस्ट बनाना।
6. **सरकारी नौकरी अलर्ट (Job Vacancy Manager)**: नई भर्ती का शीर्षक, पद संख्या, योग्यता, अंतिम तिथि व अप्लाई लिंक दर्ज करना।
7. **छात्र प्रबंधन (Student & Role Manager)**: छात्रों की सूची देखना, रोल बदलना (Student/Admin) व पासवर्ड रीसेट करना।
8. **टेस्ट सबमिशन लॉग (Submissions Tracker)**: छात्रों के टेस्ट स्कोर, प्रतिशत एवं परीक्षा तारीख की लाइव मॉनिटरिंग।

---

## 📡 REST API एंडपॉइंट्स संदर्भ (API Endpoints Reference)

### 1. ऑथेंटिकेशन एवं यूज़र मैनेजमेंट (`/api/users`)
* `POST /api/users/login` - यूज़रनेम व पासवर्ड से लॉगिन (स्ट्रीक ऑटो-कैलकुलेट होती है)
* `POST /api/users/signup` - बिना ईमेल नया खाता बनाएं (+100 वेलकम कॉइन्स, रेफरल कोड)
* `GET  /api/users/profile?userId=...` - छात्र प्रोफ़ाइल विवरण प्राप्त करें
* `PUT  /api/users/profile` - अवतार, फोटो, लक्ष्य परीक्षा अपडेट करें
* `GET  /api/users/leaderboard` - टॉप 10 मेधावी छात्रों की सूची

### 2. PDF बुक्स एवं स्टडी मटेरियल (`/api/materials`)
* `GET  /api/materials` - छात्रों के लिए सभी अध्ययन PDF एवं ई-बुक्स प्राप्त करें (`?category=formulas/math/gk/science`)
* `GET  /api/materials/<id>` - विशिष्ट PDF सामग्री का विवरण प्राप्त करें

### 3. आर एस अग्रवाल व स्टडी नोट्स (`/api/notes`)
* `GET    /api/notes?userId=...` - सभी RS अग्रवाल एवं छात्र नोट्स प्राप्त करें
* `POST   /api/notes` - नया नोट जोड़ें
* `PUT    /api/notes/<id>/pin` - नोट को पिन/अनपिन करें
* `DELETE /api/notes/<id>` - नोट हटाएं

### 4. मॉक टेस्ट व रिजल्ट्स (`/api/tests`)
* `GET  /api/tests` - सभी उपलब्ध मॉक टेस्ट प्राप्त करें
* `GET  /api/tests/<id>` - प्रश्न, विकल्प और व्याख्या सहित टेस्ट प्राप्त करें
* `GET  /api/tests/history?userId=...` - छात्र का टेस्ट इतिहास
* `POST /api/tests/history` - पूर्ण किए गए टेस्ट का परिणाम सुरक्षित करें (+50 बोनस कॉइन्स)

### 5. सरकारी नौकरियां (`/api/jobs`)
* `GET /api/jobs` - सभी सरकारी भर्तियां प्राप्त करें (`?category=ssc/railway/banking/police`)
* `GET /api/jobs/<id>` - भर्ती की विस्तृत जानकारी व परीक्षा पैटर्न

### 6. सिलेबस ट्रैकर (`/api/syllabus`)
* `GET    /api/syllabus?userId=...` - प्रमाणित अध्याय व टॉपिक प्रगति सूची
* `PUT    /api/syllabus/<chId>/topics/<topId>` - टॉपिक पूरा होने पर टिक/अनटिक करें (प्रगति ट्रैकिंग)

### 7. एडमिन मैनेजमेंट एंडपॉइंट्स (`/api/admin`)
* `POST   /api/admin/login` - एडमिन प्रमाणीकरण एवं सेशन टोकन
* `GET    /api/admin/overview` - सभी डेटाबेस कलेक्शन्स के लाइव आँकड़े
* `GET    /api/admin/syllabus` - संपूर्ण सिलेबस सूची
* `POST   /api/admin/syllabus` - नया अध्याय जोड़ें
* `DELETE /api/admin/syllabus/<chId>` - अध्याय हटाएं
* `GET    /api/admin/materials` - सभी PDF मटेरियल्स
* `POST   /api/admin/materials` - नई PDF / बुक जोड़ें
* `DELETE /api/admin/materials/<id>` - PDF सामग्री हटाएं
* `POST   /api/admin/tests` - नया मॉक टेस्ट निर्मित करें
* `DELETE /api/admin/tests/<id>` - टेस्ट हटाएं
* `POST   /api/admin/jobs` - नई भर्ती वैकेंसी जोड़ें
* `DELETE /api/admin/jobs/<id>` - भर्ती हटाएं
* `GET    /api/admin/users` - सभी रजिस्टर्ड यूज़र्स की सूची
* `PUT    /api/admin/users/<id>/role` - यूज़र रोल अपडेट करें
* `GET    /api/admin/results` - छात्रों के सभी टेस्ट सबमिशन एवं स्कोर

### 8. डैशबोर्ड एनालिटिक्स (`/api/dashboard`)
* `GET /api/dashboard/stats?userId=...` - सिलेबस प्रगति %, टेस्ट औसत, स्ट्रीक व कॉइन्स की रीयल-टाइम गणना
* `GET /api/health` - MongoDB Atlas कनेक्शन स्थिति व सभी कलेक्शन्स की लाइव काउंट

