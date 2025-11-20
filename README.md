# DevNotes — Full-Stack Notes App (React + TypeScript + Node.js + MongoDB)

DevNotes is a full-stack, modern notes/snippet manager built with:

### **Frontend**
- React + TypeScript
- Vite
- Custom components (TSX)
- Local state management
- Code editor + syntax highlighting

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Notes + User CRUD APIs

---

# 📁 Project Structure

```
copy-of-devnotes/
│
├── models/
│   ├── Note.js
│   └── User.js
│
├── routes/
│   ├── auth.js
│   └── notes.js
│
├── services/
│   └── noteService.ts
│
├── pages/
│   ├── AuthPage.tsx
│   └── Login.tsx
│
├── App.tsx
├── index.tsx
├── index.html
├── server.js
├── tsconfig.json
├── types.ts
├── package.json
├── vite.config.ts
```

---

# 🚀 Getting Started

## 1️⃣ Install global dependencies

Ensure you have installed:

```
Node.js >= 16
MongoDB (local or Atlas)
```

---

# 🔧 Backend Setup (Node.js + Express)

### 1. Open a terminal inside the project root:

```
cd copy-of-devnotes
```

### 2. Install backend dependencies:

```
npm install
```

### 3. Create a `.env` file:

```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/devnotes
JWT_SECRET=your_secret_key
```

### 4. Start backend:

```
npm start
```

If successful:

```
Server running on port 5001
Connected to MongoDB
```

---

# 🎨 Frontend Setup (React + TypeScript + Vite)

### 1. Install dependencies

```
npm install
```

### 2. Start Vite dev server:

```
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

# 🔐 Authentication (JWT)

Backend features:

- `/api/auth/register` → Create account  
- `/api/auth/login` → Login  
- `/api/auth/logout` → Logout  
- Token is stored in HttpOnly cookies  
- Auto-login is checked via `/api/auth/me`

Frontend:

- React reads user session with `noteService.ts`
- If no session → shows login/signup page
- Uses `currentUser` state everywhere

---

# 📝 Notes Features

### ✔ Create Notes  
### ✔ Edit Notes  
### ✔ Delete Notes  
### ✔ Rich text + code snippets  
### ✔ Categories (folders)  
### ✔ Tags  
### ✔ Search  
### ✔ Sidebar navigation  
### ✔ Auto-select active note  
### ✔ Dark/Light Theme  
### ✔ Profile modal  

---

# 📌 API Endpoints

## Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new user |
| POST | `/api/auth/login` | Login user |
| GET  | `/api/auth/me` | Get logged-in user |
| POST | `/api/auth/logout` | Logout |

## Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Edit note |
| DELETE | `/api/notes/:id` | Delete note |

---

# 🖥 Build For Production

```
npm run build
```

Output will be in:

```
dist/
```
