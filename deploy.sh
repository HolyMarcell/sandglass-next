cp .env.prod .env
docker build . -t local/sandglass
rm .env
docker compose -f docker-compose-prod.yml up -d
docker compose -f docker-compose-prod.yml restart sandglass_app
