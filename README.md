# RD FileBot Manager

A self-hosted Node.js + React app to classify and process Real-Debrid media folders using FileBot, with PostgreSQL tracking and Docker-based deployment.

---

## 📦 Features

- 🔍 Scans mounted Real-Debrid directory for new folders
- ✅ Classifies each as a Movie or TV Series
- 🎞️ Uses FileBot to rename and copy files to your NAS
- 🧠 Tracks processed folders and logs status in PostgreSQL
- 🌐 Clean, modern React frontend (served via NGINX)

---

## 🗂 Project Structure

```
/apps/rd-filebot-dev/
├── data/
│   ├── .env                    # Environment variables
│   ├── backend/                # Express + Sequelize + FileBot
│   ├── frontend/               # React frontend
│   ├── db/                     # PostgreSQL volume (bind mounted)
│   └── license.psm             # FileBot license file
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/rd-filebot.git
cd rd-filebot
```

### 2. Set Up Your `.env`

Edit `data/.env`:
```env
POSTGRES_DB=rdfilebot
POSTGRES_USER=rdadmin
POSTGRES_PASSWORD=supersecret
PORT_BACKEND=3001
PORT_FRONTEND=3000
```

### 3. Add FileBot License

Place your `license.psm` in:
```
/apps/rd-filebot-dev/data/license.psm
```

---

## 🐳 Deployment with Docker

From the root of the project:

```bash
docker-compose up -d
```

Or use Portainer: paste the contents of `docker-compose.yml` as a new stack.

---

## 🔧 Required Host Mounts (Customize for Your System)

The app expects these folders to exist inside the containers:

| Container Path | Purpose                          | Host Folder (you must set this)           |
|----------------|----------------------------------|-------------------------------------------|
| `/rd`          | Real-Debrid mounted folder       | e.g., `/mnt/realdebrid` (read-only mount) |
| `/movies`      | Destination for Movie files      | e.g., `/mnt/nas/movies`                   |
| `/series`      | Destination for TV Series files  | e.g., `/mnt/nas/series`                   |

In your `docker-compose.yml`, **you must map these yourself**:

```yaml
    volumes:
      - /mnt/realdebrid:/rd:ro       # <-- change this to match your RD mount
      - /mnt/nas/movies:/movies      # <-- change this to your movies destination
      - /mnt/nas/series:/series      # <-- change this to your series destination
```

📌 These container paths are fixed and expected by the app logic.

If you're running on a different system, adjust the **left side of the volume mapping only** to match your server's real folder paths.


- `/rd` → Real-Debrid mount (read-only)
- `/movies` → Your NAS movie library
- `/series` → Your NAS TV series library

Set these in `docker-compose.yml` to point to your actual mounted folders.

---

## 📋 Example Use

---

## 🔐 Default Login (Basic Auth)

Access to the web app is protected using basic authentication.

| Username | Password  |
|----------|-----------|
| admin    | changeme  |

🚨 **Important:** You should change these credentials immediately after first run.  
This can be done by modifying the backend logic in `server.mjs`.

---

1. Visit `http://localhost:3000`
2. See list of unprocessed folders
3. Select **Movie** or **Series** from dropdown
4. Click **Process** – FileBot renames and copies files
5. Result is logged in the database

---

## 📘 License

This tool requires a valid FileBot license (~$6/year):  
🔗 https://www.filebot.net/purchase.html

---

## 🤝 Contributing

Pull requests welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## ✨ Credits

- [FileBot](https://www.filebot.net)
- [React](https://reactjs.org)
- [Express](https://expressjs.com)
- [Sequelize](https://sequelize.org)
- [PostgreSQL](https://www.postgresql.org)
