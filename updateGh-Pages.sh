mv bower_components bower_components1
git checkout gh-pages
git pull origin master
git push origin gh-pages
git checkout master
mv bower_components1 bower_components
