# **UBC Opti Schedule: Build your personalized schedule

A modern web application for generating **UBC course schedules**.
Users can search courses, select them, and instantly preview schedules displayed in a clean weekly timetable.
It displayes 20 possible schedules for user to pick, by entering all courses, a customized schedule will be created with no conflict in time.

## 🚀 **Getting Started**

### **1. Clone the repository**

```bash
git clone https://github.com/<your-repo>/ubc_schedule_optimizer.git
cd ubc_schedule_optimizer
```

Replace `<your-repo>` with your actual GitHub username.

---

### **2. Install dependencies**

```bash
npm install
```

---

### **3. Start the dev server**

```bash
npm run dev
```

You will see:

```
VITE v7.x.x  ready in 600 ms
➜  Local:   http://localhost:5173/
```

Open your browser:

👉 [http://localhost:5173](http://localhost:5173)

---

## 📁 **Project Structure**

```
ubc_schedule_optimizer/
│
├── App.jsx                # Root application logic
├── main.jsx               # React entry point
│
├── CourseSearch.jsx       # UI for searching and selecting courses
├── ScheduleGrid.jsx       # Displays the weekly calendar and course blocks
│
├── buildSchedules.js      # Generates all conflict-free schedules
├── checkConflictFn.js     # Time/day conflict detection helpers
│
├── coursedata.js          # Course + section dataset
│
├── TopBar.jsx             # Navigation/header bar
│
├── index.html             # Vite HTML entry
├── package.json
└── README.md
```

---

## 🛠️ Technologies

* **React 18**
* **JavaScript**
* Inline CSS styling (easy to modify)
* Custom schedule conflict engine

