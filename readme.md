# babel-test

# static

## 安装依赖

```
yarn install
```

## 本地开发
```
yarn start
```
访问 [http://127.0.0.1:8081](http://127.0.0.1:8081)

## 打包
```
yarn build
```
该操作会把静态资源打包到 static/build 目录下，需要将该目录的文件发布到 CDN，此外，还会将 index.html 打包到 server/view 
目录下，server 目录运行前，依赖 static 的打包。

# server

## 安装依赖

```
yarn install
```

## 本地开发
```
yarn start
```
访问 [http://127.0.0.1:8080](http://127.0.0.1:8080)

## Orange-ci

### 操作 git、织云

项目已经初始化好了 orange-ci 的相关配置，但依然需要手工操作一些步骤（每个项目只需要操作一次）

不用担心，这很简单，跟着动起来吧：

#### git 授权

1. 在 [git.code.oa.com](http://git.code.oa.com) 创建新仓库 `babel-test`
2. 根据 "Existing folder or Git repository" 提示用 git remote add 关联本地仓库（注意不需要执行 git init，webo cli 已经执行过）
3. 在远程 git 仓库的左侧导航栏中，点击 Settings -> Members -> Add members，将 "orange-ci" 添加为 Master 成员
4. 在远程 git 仓库的左侧导航栏中，点击 Settings -> Advanced Settings -> Web Hooks，url 填写 `http://orange-ci.oa.com`，勾选所有 Trigger，点击 Add Web Hook 保存

#### BabelTestCDN-WEBO 织云包创建

1. 访问 [http://yun.isd.com/index.php/package/create/](http://yun.isd.com/index.php/package/create/)
2. 勾选 "普通文件包"
3. 所属业务选择 "广点通"（大概在 select 的第 25 个）
4. 包名输入 "BabelTestCDN-WEBO" 注意不带双引号
5. 程序用户选择 root
6. 版本说明如实填写，比如填 "init"
7. 点击开始创建，注意，如果提示 "指定的包名已存在，xxx..."（如果没有这个提示，请继续第 8 步），说明已经有人提交了相同名称的项目，建议你用 webo cli 重新创建一个，使用其它名称，千万别创建新版本，因为那不是你创建的项目
8. 此时界面跳转到了 "文件管理" 这个 tab，不需理会，点击 "安装相关" 这个 tab
9. 在 "安装完成后执行" 和 "升级完成后执行" 这两个输入框中填写 "$install_path/deploy/cdn-deploy.sh"（注意不要带引号）
10. 点 "完成/提交版本"

#### BabelTestNODE-WEBO 织云包创建

1. 访问 [http://yun.isd.com/index.php/package/create/](http://yun.isd.com/index.php/package/create/)
2. 勾选 "普通文件包"
3. 所属业务选择 "广点通"（大概在 select 的第 25 个）
4. 包名输入 "BabelTestNODE-WEBO" 注意不带双引号
5. 程序用户选择 root
6. 版本说明如实填写，比如填 "init"
7. 点击开始创建，注意，如果提示 "指定的包名已存在，xxx..."（如果没有这个提示，请继续第 8 步），说明已经有人提交了相同名称的项目，建议你用 webo cli 重新创建一个，使用其它名称，千万别创建新版本，因为那不是你创建的项目
8. 此时界面跳转到了 "文件管理" 这个 tab，不需理会，点击 "安装相关" 这个 tab
9. 在 "安装完成后执行" 和 "升级完成后执行" 这两个输入框中填写 "$install_path/deploy/node-deploy.sh"（注意不要带引号）
10. 点 "完成/提交版本"

到这里，webo-cli 已经指引你完成了 orange-ci 的相关配置，orange-ci 的具体流程请往下看。

### Orange-ci 的流程

* 往 master 分支发起 Merge Request，会触发 yarn lint 和 yarn test，lint 或 单元测试未通过，会阻塞 Merge Request 的通过
* 在 master 分支 push 代码，或者往 master 分支发起的 Merge Request 被 Accept，会自动执行 CI 构建、测试环境发布
* 测试环境 host 如下：
```
10.241.87.150 i.gtimg.cn
9.64.94.100:8080 xxx.xxx.xxx // 你的业务域名，whistle 支持直接配置端口
```
* 打 tag 会根据提交信息生成 changeLog，并往 master 发起一个 Merge Request，记得 accept

### CDN 目录

[http://i.gtimg.cn/ams-web/babel-test](http://i.gtimg.cn/ams-web/babel-test)
