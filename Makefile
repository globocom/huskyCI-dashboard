.SILENT:
.DEFAULT_GOAL := help

NPM ?= $(shell which npm)
YARN ?= $(shell which yarn)
PKG_MANAGER ?= $(if $(YARN),$(YARN),$(NPM))

COLOR_RESET = \033[0m
COLOR_COMMAND = \033[36m
COLOR_YELLOW = \033[33m
COLOR_GREEN = \033[32m
COLOR_RED = \033[31m

PROJECT := huskyCI-dashboard

## Installs locally using install command.
install:
	@${PKG_MANAGER} install

## Runs locally using start command.
run:
	@${PKG_MANAGER} start
	
## Checks for vulnerabilities using audit command.
check-sec:
	@${PKG_MANAGER} audit

## Runs unit tests using test command.
unit:
	@${PKG_MANAGER} test 

## Runs a full test into project.
test: unit

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
