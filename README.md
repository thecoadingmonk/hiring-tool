# Hiring tool (Great Vibes - assesment)

Simple tool to manage job information (create, edit, delete the jobs)

## Objectives

- List all the available Jobs in grid auto fit format
- Provide an option to Create, Delete, and Edit jobs
- Use [mockapi.io](https://mockapi.io/) for all the APIs
- Styles should perfectly match the figma design

## Solution

### User flow
- When user lands on the page user will be able to see all the available jobs list, if all the jobs are deleted then it shows empty message `No jobs found!`, if any API fails while loading the data it will show default error message `Something went wrong, please try again`
- When user hit 'create a job` button it will open modal with form to enter job details
- When user tries to create a new job it will validate the form with [react-hook-form](https://react-hook-form.com/api/) for required and number fields
- Form has 2 steps and it will validate each step separately
- Required fileds are marked with `*` symbol
- Form has validation on min max values and number validation for inputs that accepts numbers
- Shows loading state while creating a new job and disables the save button
- Form doesn't have any back button to go to previous step
- Form will close and clear all the fileds if user click on outside the modal
- On any error while creating/editing the job it will be visible next to the save button
- Edit options will not be visible by default but when user clicks on `Enable edit` button at the top it will be visible
- On clicking on the `edit` option form will be filled with default available values
- On clicking on the `delete` option user will be able to see loading icon and button will be disabled
- On successful deletion of the job list will be updated automatically
- On any kind of error list will fetched again from the API

### Development

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!



