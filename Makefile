NODE_MODULES_BIN := node_modules/.bin
SUPERVISOR := $(NODE_MODULES_BIN)/supervisor
GULP := $(NODE_MODULES_BIN)/gulp

all: npm build

npm:
	npm install

build:
	echo build

dev:
	@$(SUPERVISOR) -w server,configs,api -p server/app.js

clean:
	echo clean

.PHONY: all npm build dev clean
