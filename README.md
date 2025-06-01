# 🎬 RD FileBot Manager

An automated system for renaming and organizing content from your Real-Debrid mount using FileBot, with a web UI, PostgreSQL tracking, and Docker-based deployment.

---

## 📦 Features

- Rename + copy content from a Real-Debrid read-only mount
- Classify content as movie or series before processing
- FileBot renaming engine integration
- Tracks processed folders with PostgreSQL
- Upload and manage your FileBot license
- Web-based UI with login & dark mode
- First-run setup prompts for database credentials and license

---

## 🚀 Deployment

This app runs via Docker Compose. First, configure your media mount paths.

### 🔧 Required Bind Mounts

| Container Path | Description                     | Example (replace with your own)     |
|----------------|----------------------------------|--------------------------------------|
| `/rd`          | Real-Debrid mount (read-only)    | `/mnt/my_rd_mount`                  |
| `/movies`      | Destination folder for movies    | `/media/my_storage/Movies`          |
| `/series`      | Destination folder for series    | `/media/my_storage/TV_Shows`        |

Edit `docker-compose.yml` to update these paths to match your host environment.

---

## 🛠 Environment Variables

These are stored in a `.env` file in the root folder:

```env
POSTGRES_DB=rdfilebot
POSTGRES_USER=rdadmin
POSTGRES_PASSWORD=changeme
PORT_BACKEND=3001
PORT_FRONTEND=3000
PUID=1000
PGID=1000
TZ=America/New_York
UMASK=002
