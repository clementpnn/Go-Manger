up: clean
	docker-compose up -d

down:
	docker-compose down --rmi all --volumes

stop:
	docker-compose stop

start:
	docker-compose start

rebuild:
	docker-compose up -d --build

clean: down
	docker volume prune -f
	docker system prune -af

ps:
	docker-compose ps

upsafe:
	docker-compose down
	docker volume prune -f
	docker-compose up