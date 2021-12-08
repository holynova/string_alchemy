rm -rf docs/ 
mkdir docs 
npm run build 
cp dist/* docs
git add .
git commit -m 'rebuild to publish'
git push