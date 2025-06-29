
# Universal Translator & Cultural Mediator AI 🌍🤖

This web application goes beyond simple language translation. It leverages a powerful large language model (LLM) to not only translate text but also **mediate cultural nuances and social cues**, fostering deeper cross-cultural understanding.

Built with **React**, **Vite**, and **Vercel serverless functions**, and integrated with the **Gemini API**, this project enables intelligent translation enriched with cultural insight.

## ✨ Features

- **Intelligent Translation**: Translate between multiple languages.
- **Cultural Mediation**: Understand cultural context and social cues tied to the original message.
- **Suggested Phrasing**: Receive recommendations for culturally appropriate alternatives.
- **Secure API Handling**: API key is stored securely as an environment variable on the serverless backend.
- **Fast Development**: Powered by Vite for rapid local development.
- **Authentication**: Firebase-based authentication (Canvas environment managed).

---

## 🧩 Project Structure

```
universal-translator-ai/
├── api/
│   └── translate.js               # Vercel Serverless Function (Node.js)
├── src/
│   ├── components/                # Reusable React components
│   │   ├── ErrorMessage.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── TranslatorForm.jsx
│   │   └── TranslationResults.jsx
│   ├── App.jsx                    # Main React container component
│   └── index.jsx                  # React entry point
├── .gitignore                     # Git ignore rules
├── .env                           # Environment variables (excluded from Git)
├── index.html                     # Vite entry HTML
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
└── eslint.config.js               # Linting rules
```

---

## 🛠 Technologies Used

- **Frontend**: React, Vite, Tailwind CSS  
- **Backend**: Node.js, Vercel API Routes  
- **AI Model**: Google Gemini (gemini-2.0-flash)  
- **Authentication**: Firebase (Canvas environment)  
- **Code Quality**: ESLint  

---

## ⚙️ Setup & Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/universal-translator-ai.git
cd universal-translator-ai
```

> Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/).
2. Create a `.env` file in the project root:

```
GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY_HERE
```

### 4. Install Vercel CLI

```bash
npm install -g vercel
```

### 5. Log In to Vercel

```bash
vercel login
```

Follow the prompts to authenticate your account.

### 6. Run Locally

```bash
vercel dev
```

Your application will typically be available at: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploying to Vercel via GitHub

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import to Vercel

- Go to [Vercel.com](https://vercel.com/) and log in.
- Click **"Add New" → "Project"**, then **"Continue with GitHub"**.
- Select your `universal-translator-ai` repo.
- Click **"Deploy"**.

### 3. Add GEMINI_API_KEY on Vercel

After deployment:

1. Go to your Vercel project dashboard.
2. Navigate to **Settings → Environment Variables**.
3. Add:

```
Name: GEMINI_API_KEY
Value: YOUR_ACTUAL_GEMINI_API_KEY_HERE
Environment: All (Production, Preview, Development)
```

4. Save, and Vercel will redeploy your app automatically.

---

## 🤝 Contributing

Pull requests are welcome! Fork the repo, make improvements, and submit a PR.

---

## 📄 License

Specify your license here. (e.g., MIT License)

---

## 🧠 Credits

Developed using Google Gemini API, Vite, React, and Vercel Serverless Functions.
