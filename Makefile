.SILENT:
.DEFAULT_GOAL := help

COLOR_RESET = \033[0m
COLOR_COMMAND = \033[36m
COLOR_YELLOW = \033[33m
COLOR_GREEN = \033[32m
COLOR_RED = \033[31m

PROJECT := huskyCI-dashboard

## Installs locally using install command.
install:
	yarn install

## Builds static files from react app.
build:
	yarn build

## Runs locally using start command.
run:
	yarn start
	
## Checks for vulnerabilities using audit command.
check-sec:
	yarn audit

## Runs a full test into project.
test: 
	yarn test

## Creates a container image based on most recent dashboard code
build-container: 
	docker build . -t huskyci/dashboard

## Starts huskyci/dashboard container
start-container: 
	docker run -p 8080:80 huskyci/dashboard

## Builds and starts dashboard add using huskyci/dashboard container
run-container: build-container start-container

## Shows this help message.
help:
	printf "\n${COLOR_YELLOW}${PROJECT}\n------\n${COLOR_RESET}"
	awk '/^[a-zA-Z\-\_0-9\.%]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "${COLOR_COMMAND}$$ make %s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST) | sort
	printf "\n"
