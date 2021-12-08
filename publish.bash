rm -rf docs/  
mkdir docs 
npm run build  
cp -R dist/* docs 
git add . 
git commit -m 'rebuild to publish' 
git push