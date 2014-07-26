NODE_MODULES_BIN := node_modules/.bin
SUPERVISOR := $(NODE_MODULES_BIN)/supervisor
GULP := $(NODE_MODULES_BIN)/gulp

all: npm validate build

npm:
	npm install

validate: lint test

# Lint js files
lint:
	@$(NODE) $(NODE_MODULES_BIN)/jshint-groups
	@$(NODE) $(NODE_MODULES_BIN)/jscs .
	@$(NODE) $(NODE_MODULES_BIN)/analyze report -r errors -v return-type:param-type

test:
	@echo test

build:
	@echo build

dev:
	@$(SUPERVISOR) -w server,configs,api -p server/app.js

clean:
	echo clean

.PHONY: all npm validate lint test build dev clean
