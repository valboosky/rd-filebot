# RD FileBot Manager – Project Overview

## 🔧 Purpose
A Dockerized full-stack application to rename and organize media files from a Real-Debrid mount, using FileBot. The app classifies folders as either movies or series, then processes them into the proper NAS directory with user input via a web interface.

---

## 🧱 Tech Stack
- **Frontend:** React (dark mode, logo branding, simple UI)
- **Backend:** Node.js (Express-style), handles folder listing and FileBot execution
- **Database:** PostgreSQL (tracks processed folders + success/failure)
- **Auth:** Basic Auth with default credentials (change required on first run)
- **Deployment:** Portainer Stack using Docker Compose v3.8

---

## 🗂 Folder Structure

**Host Paths:**
- Project root: `/apps/rd-filebot` (recommended, but customizable)
- Mounts required (you must replace these with your own media paths):
  - Your Real-Debrid mount → `/rd:ro`
  - Your Movies folder → `/movies`
  - Your Series folder → `/series`

**In Container (hardcoded mount points):**
- `/rd` = read-only RD mount
- `/movies` = movies output
- `/series` = series output
- `/app/data` = config, license, .env, DB volume

---

## ⚙️ Key Features
- Browse root of `/rd` for unprocessed folders
- Tag folder as "movie" or "series"
- Trigger FileBot via backend
- Tracks success/failure in PostgreSQL
- Prompts for FileBot license upload (initial + replace)
- Auth via Basic Auth — supports multiple users, stored in `.env`
- First-run setup wizard for DB credentials
- Reset App feature with confirmation prompt and optional backup/export

---

## 📦 Docker Stack (3 containers)
- **`rd-filebot-db`** (PostgreSQL)
- **`rd-filebot-backend`** (Node.js + FileBot)
- **`rd-filebot-frontend`** (React app on port 3011)

---

## 🔐 Auth Defaults
- Default username/password stored in `.env`
- User is required to change password on first login via frontend
- Additional users can be added via UI

---

## 📝 Environment Variables (.env)
```
POSTGRES_DB=rdfilebot
POSTGRES_USER=rduser
POSTGRES_PASSWORD=rdpass
PORT_BACKEND=3010
PORT_FRONTEND=3011
PUID=1000
PGID=1000
TZ=America/New_York
UMASK=002
```

---

## 📄 FileBot License Setup
To use FileBot Core, you must purchase a license at [filebot.net](https://www.filebot.net/purchase.html).

Once you receive the email with your license, follow these steps:

1. Copy the entire license block (from `-----BEGIN PGP SIGNED MESSAGE-----` to `-----END PGP SIGNATURE-----`).
2. Save it in a plain text file as:
   ```
   filebot.license
   ```
3. Place this file in your **host-side data directory** mapped to the container's `/app/data` folder. For example:
   ```
   /your/custom/path/to/rd-filebot/data/filebot.license
   ```
4. Alternatively, upload it via the RD FileBot Manager web interface.

> ✅ The app also detects expired/missing licenses and will prompt you to upload a new one.

---

## 📅 Planned for v2
- Conflict detection (e.g., folder already exists)
- UI-based conflict resolution (skip, overwrite, keep both, cancel)
- Support for webhook notifications
- Git integration for versioning config/DB backups

---

## 🐳 GitHub Repo
- https://github.com/valboosky/rd-filebot
- You can clone the repo using SSH into any folder (e.g., `/apps/rd-filebot` or another of your choice)

---

## 🧠 Notes
- Use `sudo` if writing into protected directories like `/apps/`
- FileBot license is required and handled via upload or direct file placement
- You use Warp on Mac (sometimes requires `kill` to stop Docker builds)
- You plan to push final containers to Docker Hub or GHCR
