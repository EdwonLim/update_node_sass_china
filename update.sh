echo "--> 启动 node—sass-china 升级程序:"
read -p "--> 输入版本号（例: 3.7.0): " version

if [ ! -d "source" ]; then
  mkdir source
fi

cd source

if [ -d "$version" ]; then
  rm -rf $version
fi

echo "--> 开始 clone node-sass 工程......"

git clone git@github.com:sass/node-sass.git $version

cd $version

echo "--> 切换版本至"$version"......"

git checkout tags/v$version

git checkout -b v$version-china

echo "--> 开始修改工程......"

node ../../update.js

rm -rf vendor

echo "--> 更改详情如下:"

git status

git diff

read -p "--> 是否要自动commit/push? (y/n) " -n 1 -r

echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add --all

    git commit -a -m "update to v$version"

    git remote add china git@github.com:EdwonLim/node-sass-china.git

    git push china
fi

read -p "--> 是否要自动 npm publish? (y/n) " -n 1 -r

echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm publish
    cnpm sync node-sass-china
    qnpm sync node-sass-china
fi
