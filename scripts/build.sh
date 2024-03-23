ENV=$1
COMMENT=$2

git add .
git commit -m "local"
git pull

npm run $ENV

git add .
git commit -m "$COMMENT"
git push
