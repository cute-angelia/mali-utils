define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef

PROJECT      := $(call GetFromPkg,name)
LAST_VERSION := $(call GetFromPkg,version)


.PHONY: test
test:
	@echo ${PROJECT}
	@echo v${LAST_VERSION}

.PHONY: up
up:
	git add .
	@read -p "Commit message: " msg; \
	msg=$${msg:-"update"}; \
	git commit -m "$$msg"
	git pull origin master
	git push origin master
	@echo "\n 代码提交发布..."
	

.PHONY: tag
tag:
	git pull origin master
	git add .
	# 先把当前已有的改动提交了（如果工作区本来就是干净的，这行会跳过）
	-git commit -m "chore: pre-release stash" 
	# 此时工作区干净了，npm version 可以正常工作
	npm version patch -m "release: ${PROJECT} v%s"
	git push origin master
	git push --tags