cp .env.app.prod .env
docker build . -t local/sandglass
rm .env
docker compose -f docker-compose-prod.yml up -d --build
