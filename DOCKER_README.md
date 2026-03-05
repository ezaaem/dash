Docker usage
============

Production build
----------------
- Build image:
  - docker build -t dash:prod .
- Run container:
  - docker run -p 3000:3000 --name dash dash:prod
- Open http://localhost:3000

Local development (hot reload)
------------------------------
- Start dev services:
  - docker compose up
- Open http://localhost:3000
- Stop:
  - docker compose down

Notes
-----
- Next.js telemetry disabled in containers.
- Adjust port mapping if 3000 is busy.
