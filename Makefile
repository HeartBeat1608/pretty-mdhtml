clean:
	rm -rf lib

build: clean
	npx tsc

serve: build
	node lib/index.js

dev:
	npx ts-node src --watch src --ext "ts,js,json"

devtest:
	npx ts-mocha test/**/*.spec.ts