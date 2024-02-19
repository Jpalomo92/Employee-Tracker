# Employee-Tracker
  ## Badges
  [![Apache license](https://img.shields.io/badge/License-Apache-brightgreen.svg)](http://www.apache.org/licenses/LICENSE-2.0)

  ## Table of Contents
  * [License](#license)
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions?](#questions)

  ## Description
  This application is an employee tracker that allows the user to view all employees, departments, roles, and even make necessary updates. The user is able to easily follow the prompts to select the appropriate action, updating the respective employee, role, and department. 
  
  Please see the Usage section as a guide on how to use the Employee Tracker application.

  ## Installation
  To install this application, please copy the ssh link from the repo, and paste it using git clone.

  ## Usage
  To use this application, be sure that you are in the correct file path in your command-line/terminal. 

  ### Sourcing The Databases
  1. Once you are in the correct file path of the cloned files, you will need to first source the databases. This will tell the application where to source the data from. To source the data,type 'mysql -u root -p'. You will be prompted to enter in a password.
  2. When the user has entered in their password, first source the schema database by typing 'source db/schema.sql' and hit enter.
  3. After sourcing the schema database, type 'source db/seeds.sql' and hit enter. From here, you are done sourcing the databases. 
  4. Type 'quit' and hit enter to exit out of mysql. 
  5. You are then brought back to the file path. 

  ### Running And Using The Application
  1. After sourcing the databases, you are now free to run the application. 
  2. Type 'node index.js' in your command-line and hit enter.
  3. The application is now running, and you will be presented with a list of prompts.
  4. To scroll through the list of prompts, use the up and down arrow keys to scroll through the options. The current option that are you are "hovering" over will be highlighted a different color.
  5. Once you have decided on an option, highlight it with your arrow key and hit enter. 
  6. If you have selected a 'View all' option, you will be presented with a table displaying the data that you chose.
  7. If you have selected a 'Add' or 'Update' option, you will be prompted to enter in additional information. 
  8. After you have made all of your necessary changes, and would like to stop using the application, simply highlight the 'Exit' option and hit enter. You will then be directed back to the file path.
  
 Use the up and down arrow keys to scroll through the options and hit enter once you have highlighted the action that you would like to take.

 ### Please click on the link below to see how to use this application.

 [Video on how to use this application](https://drive.google.com/file/d/1JCSYCaeKqsDwg8FOrJNncBQlwzjKYOhA/view)  

  ## License
  
    This project is covered under the Apache license. To learn more about what this means, click the license button at the top.
  http://www.apache.org/licenses/LICENSE-2.0

  ## Contributing
  [Contributor Covenant](https://www.contributor-covenant.org/)  
  To contribute to this project, clone the repo, and then create a new branch. Once you have made your necessary edits, then push to submit a pull request. The contribution will be merged to the main branch after being tested and approved

  ## Tests
  You may test this application using your own information. 

  ## Questions?
  ### Please reach me here: 
  [My GitHub: Jpalomo92](https://github.com/Jpalomo92)  
  Jpalomo92@gmail.com