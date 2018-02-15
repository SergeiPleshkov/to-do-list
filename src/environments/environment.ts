// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAepe_DgDXxrwMtiyhwpYxsKg34fx46Ufg",
    authDomain: "to-do-list-f8911.firebaseapp.com",
    databaseURL: "https://to-do-list-f8911.firebaseio.com",
    projectId: "to-do-list-f8911",
    storageBucket: "to-do-list-f8911.appspot.com",
    messagingSenderId: "258352773380"
  }
};
