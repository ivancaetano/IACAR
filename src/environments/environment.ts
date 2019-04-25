// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpointGoogle:"https://cors-anywhere.herokuapp.com/https://maps.googleapis.com",
  endpointDialog: "https://cors-anywhere.herokuapp.com/https://api.dialogflow.com/v1/query?v=20150910",
  tokenDialog: "f83d3787d5ce4fde9c98089a292bee81"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
