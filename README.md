# Interview Scheduler

Interview Scheduler is a single page React application allowing users to book, edit and cancel interviews. The implimentation of websockets enables a cross-browser, real-time experience. Data is persisted in a PostgreSQL databased and accessed via axios. A TDD approached was used in conjunction with Storybook, Jest and Cypress.

Project by Casey Sokach, while enrolled with Lighthouse Labs Web Development September 2019

## Final Product

!["Scheduler Layout"](https://github.com/kacsokz/scheduler/blob/master/public/docs/scheduler_home.png)
!["Edit Appointment"](https://github.com/kacsokz/scheduler/blob/master/public/docs/scheduler_edit.png)
!["Confirm Delete Appointment"](https://github.com/kacsokz/scheduler/blob/master/public/docs/scheduler_confirm_delete.png)
!["Empty Appointment"](https://github.com/kacsokz/scheduler/blob/master/public/docs/scheduler_empty_appointment.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

* Node.js
* React
* axios
* @testing-library/react-hooks
* react-test-renderer
* PostgreSQL database
* Jest
* Storybook
* Cypress