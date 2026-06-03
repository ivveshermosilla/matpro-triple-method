# 👑 Matpro: The Triple Method Learning System

### 🎮 [Play Matpro Live Here](https://ivveshermosilla.github.io/matpro-triple-method/)

**Matpro** is a human-centered, ADHD-friendly learning system and web application designed to help children memorize multiplication tables through a structured methodology combining visual, auditory, kinesthetic, and interactive reinforcement.

## 👨‍👩‍👦 The Inspiration Behind the Project
This project is deeply personal. It was born out of a father's desire to help his 10-year-old son, "Momo", overcome his struggles and frustrations with mathematics. Living in Utah while Momo lives in Chile, our window for direct, hands-on tutoring was limited to his summer vacation visit. 

Guided by the academic expertise of a Doctor of Occupational Therapy (my wife), we developed a custom approach tailored for neurodivergent learning (ADHD). Instead of forcing traditional calculation, we focused on building a rock-solid foundation of **memorization** to reduce cognitive load and build confidence. 

Once Momo mastered his tables using this system, he was ready for the next level. Matpro is the direct prequel to ➗ [**DivisionPro**](https://github.com/ivveshermosilla/DivisionPro), where he applied these foundational skills to master long division.

## 🚀 Key Features (The Web App)
The digital component of this project evolved across 51+ iterations into a robust educational tool:
* **⚙️ Custom Practice Modes**: Interactive grids to practice specific tables based on the student's current level of progression.
* **🧠 Smart Distractors**: Dynamically generates logical incorrect options (e.g., adjacent table values or reversed digits) instead of random numbers to truly challenge memory.
* **📊 Dual Grading System**: Performance evaluation tailored for both **USA (A-F)** and **Chile (1.0-7.0)** standards.
* **🌎 Multilingual Support**: Full UI internationalization (i18n) to switch seamlessly between English and Spanish.
* **📈 Historical Error Review**: Filters and exclusively displays mistakes and skipped questions for clean, focused learning reinforcement.
* **✍️ Active Practice Warmup**: A quick untimed written-recall card asks a random multiplication before the timed game.
* **📱 Responsive Modern UI**: Built to remain usable on desktop, iPad/tablets, iPhone, and Android phones.

## 🧠 The Triple Method (Overview)
*Note: For a detailed breakdown of the complete physical and digital learning process, including downloadable templates, please refer to our full methodology guide.*
1. **Grid Method (Visual/Auditory/Mechanical)**: Completing a physical 12x12 multiplication grid while reading operations aloud, utilizing a fidget tool in the non-dominant hand.
2. **Object Toss Method (Kinesthetic)**: Active memory recall while throwing and catching a soft object (like a NeeDoh Fuzz Ball).
3. **Matpro Web App (Interactive)**: Gamified digital reinforcement to transform repetition into play.

## 🛠️ Technical Overview
* **Logic**: Modular vanilla JavaScript with custom arrays and algorithms for smart distractors and scoring.
* **Persistence**: LocalStorage using the universal records key from the later archived versions.
* **Structure**: The official app is now separated into `index.html`, `assets/css/styles.css`, and JavaScript family files under `assets/js/`.
* **Evolution**: Documented a 51+ iteration journey (archived in the `Versions/` directory) from a static prototype to a modern dynamic application.
* **Technical Spec**: See [`docs/TECHNICAL_SPEC.md`](docs/TECHNICAL_SPEC.md) for the full file map, data model, and maintenance notes.

## ⚠️ Disclaimer & Acknowledgements
This project is not a medical or official therapeutic tool. It represents a personal, parent-led learning system inspired by OT principles. 

Special thanks to my son Momo for his effort and curiosity, my wife for her invaluable academic guidance, and AI assistants for coding and structural support.

---
*Developed with ❤️ for my son and students everywhere.*
