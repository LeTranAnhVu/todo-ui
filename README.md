# Vue 3 + TypeScript + Vite

### How to install:

- Fontawesome: https://fontawesome.com/docs/web/use-with/vue/
- Vue Tailwind Datepicker: 
  - https://vue-tailwind-datepicker.com/installation.html
  - https://dev.to/elreco/add-a-tailwind-datepicker-to-your-vue-3-application-57j2
- Why use App component to watch route instead of `beforeRoute`?
  - Because the useAuth0 is data is not ready to read in beforeRoute, but in App component it is ready to read the correct state. 
### Run
- Copy the `example.env` file to env.<env> (e.g env.local)
- Dev `npm run dev`
- Build `npn run build -- --mode=<env>`
