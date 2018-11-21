# Web & Speck - PWA Test App
Test application and presentation for progressive web apps (PWA)

## Presentation
The presentation for Web & Speck on the 22nd of November 2018 in Innsbruck (Austria) can be found here. 
- https://github.com/chenoekl/web-and-speck-pwa/blob/master/Web%26Speck%20PWA%20Presentation.pdf
The PDF includes all the slides and notes which have been used at the event.

## Test Application
This test application was built with Angular 6, Angular Material, ServiceWorker and Bootstrap. The main purpose for this app is to illustrate how a Progressive Web App can be built with Angular by using the ServiceWorker module. Therefor, a limited use case has been implemented which is just to add documents to the local storage and to load the content from the RIS (Rechtsinformationssystem Österreich), when network is available. However, the CORS issue has not been addressed for this development so you will encounter an error when you start the app locally or with https://spielwiese.jusline.at. In order to use the app you need to install https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi and turn it on in order to switch of CORS in your chrome browser. 

# Information to the Angular project
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
