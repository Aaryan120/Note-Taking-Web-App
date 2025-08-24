# Note-Taking Web App

A full-stack Note-Taking Web App built using **React.js, Node.js, Express.js, and MongoDB**. This app allows users to create, manage, and search notes efficiently. It supports **text, URLs, and audio input**, with audio being transcribed into text using the **Browser Web Speech API**. The app also integrates **Cloudinary** for media storage and **JWT authentication** for secure access.

## 🚀 Features

- **User Authentication:** Sign-up and login using JWT authentication.
- **Create Notes:** Add notes using text input or by recording audio (transcribed to text).
- **Manage Notes:** Edit, delete, rename, and favorite notes.
- **Search Notes:** Search across all notes in real-time.
- **Audio Transcription:** Converts recorded speech into text.
- **Image Uploads:** Attach images to notes using Cloudinary.
- **Clipboard Support:** Easily copy notes with one click.
- **Sorting & Filtering:** View notes from oldest to newest.
- **Responsive UI:** Built with **Next.js/React**, styled with **Tailwind CSS & ShadCN**.

## 🛠️ Tech Stack

- **Frontend:** React.js, Next.js, Tailwind CSS, ShadCN
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Media Storage:** Cloudinary
- **Speech Recognition:** Web Speech API


## 📦 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/note-taking-app.git
cd note-taking-app
2️⃣ Install dependencies
Backend
sh
Copy
Edit
cd server
npm install
Frontend
sh
Copy
Edit
cd client
npm install
3️⃣ Set up environment variables
Create a .env file in both server and client directories.

Backend .env file:
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Frontend .env file:
REACT_APP_API_URL=http://localhost:3000
4️⃣ Start the development server
Backend
sh
Copy
Edit
cd server
npm start
Frontend
sh
Copy
Edit
cd client
npm start
```
## 🚀 Usage
- Sign up / Log in using your credentials.
- Create a note using text or the record button.
- Manage notes by editing, deleting, and favoriting them.
- Search for notes using the search bar.
- Upload images and attach them to notes.
- Copy notes to the clipboard with one click.
## 📝 License
- This project is licensed under the MIT License. Feel free to modify and use it as needed.

## 🤝 Contributing
Contributions are welcome! If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## 🌟 Acknowledgments
MongoDB for database management.
Cloudinary for image hosting.
Web Speech API for speech-to-text transcription.
Tailwind CSS for styling.
✨ Made with ❤️ by Raj Aryan ✨
