## code
```
git clone -b master git@github.com:SYaoJun/syaojun.github.io.git
git submodule update --init --recursive
npm install
npx hexo clean && npx hexo generate
npx hexo deploy
# run localhost
npx hexo server
hexo clean && hexo server
```