###################
## APP DEVELOPMENT
###################

NPM := @npm
FLAGS := run

install:
	${NPM} install && ${NPM} audit fix

dev:
	${NPM} ${FLAGS} dev

prod:
	${NPM} ${FLAGS} start

build:
	${NPM} ${FLAGS} build