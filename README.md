# Angular Resume (Clean, Multi-Page)

Angular 18, standalone components, multi-page routing.

## Dev
```bash
npm i
ng serve
```

## Build
```bash
ng build
```

## Deploy (GitHub Pages)
```bash
# replace <repo> with your repository name
npm run build -- --base-href "/<repo>/"
npx angular-cli-ghpages --dir=dist/angular-resume-clean/browser
```