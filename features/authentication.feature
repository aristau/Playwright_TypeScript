Feature: Authentication

Scenario: Login page Shows Correct Title
    Then login page shows the correct title

Scenario: A standard user logs in with valid credentials
   When user logs in with valid credentials
   Then user lands on the products page
   And user sees the products list

Scenario: A locked out user attempts login
   When a locked out user attempts to login
   Then an error message appears saying "Epic sadface: Sorry, this user has been locked out."

Scenario Outline: A user attempts login with invalid credentials
    When user attempts login with invalid "<username>" or "<password>"
    Then an error message appears saying "<error_message>"

    Examples:
    |username            | password             | error_message                                                              |
    | INVALID_USERNAME   | STANDARD_PASSWORD    | Epic sadface: Username and password do not match any user in this service   |
    | STANDARD_USERNAME  | INVALID_PASSWORD     | Epic sadface: Username and password do not match any user in this service   |
    | EMPTY_USERNAME     | STANDARD_PASSWORD    | Epic sadface: Username is required                                          |
    | STANDARD_USERNAME  | EMPTY_PASSWORD       | Epic sadface: Password is required                                          |
    | EMPTY_USERNAME     | EMPTY_PASSWORD       | Epic sadface: Username is required                                          |

Scenario: A user logs out
    Given user is logged in with valid credentials
    When user logs out
    Then user is redirected to the login page