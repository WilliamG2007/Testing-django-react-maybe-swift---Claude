# ── Stage 1: Build React ──────────────────────────────────────────────────────
FROM node:22-alpine AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ── Stage 2: Django ───────────────────────────────────────────────────────────
FROM python:3.11-slim
WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/

# Place the React build where WhiteNoise expects it (relative to BASE_DIR.parent)
COPY --from=frontend /frontend/dist ./frontend/dist

# Collect Django's own static files (admin CSS etc.)
# SECRET_KEY/ALLOWED_HOSTS only needed for this build step
WORKDIR /app/backend
ENV SECRET_KEY=build-only-dummy DEBUG=False ALLOWED_HOSTS=*
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 2"]
