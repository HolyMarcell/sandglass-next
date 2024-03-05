cp .env.app.prod .env
docker compose -f docker-compose-prod.yml up -d --build
rm .env
