# 📝 Basic Notes API — Node.js (No Framework)

This is a simple Notes API built using **vanilla Node.js** — no Express, no frameworks. It's designed to help solidify core Node.js skills by building a working HTTP server, handling routes, and performing basic CRUD operations with the file system.

## 🚀 Features

- 📄 **GET /notes** — Returns a list of all notes
- 🆕 **POST /notes** — Adds a new note (expects JSON in body)
- 🔍 **GET /notes/:id** — Returns a specific note by ID
- 🗑️ **DELETE /notes/:id** - Deletes a specific note by ID

> Notes are stored in a local `data.json` file on the filesystem.

---

## 📂 Project Structure

├── index.js # Main file<br>
├── public/<br>
│ └── notes.json # Stores notes as JSON

---

## 📦 Requirements

- Node.js (v18 or higher recommended)

---

## 🛠️ Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/impappdavid/notes.git
cd .\notes\ 
```

2. **Add your .env**
```env
PORT=8000
```

3. **Run the server**
```bash
npm start
```

4. **Use a tool like Postman or cURL to test endpoints**
