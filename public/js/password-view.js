
/*
 * jQuery validate.password plug-in 1.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validate.password/
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * appIdapp
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html --
 */
var passwordView;

passwordView = (function(app) {
  var DIGIT, DIGITS, LOWER, SAME, SPECIAL, UPPER, rating, uncapitalize;
  LOWER = /[a-z]/;
  UPPER = /[A-Z]/;
  DIGIT = /[0-9]/;
  DIGITS = /[0-9].*[0-9]/;
  SPECIAL = /[^a-zA-Z0-9]/;
  SAME = /^(.)\1+app/;
  rating = function(rate, message) {
    return {
      rate: rate,
      messageKey: message
    };
  };
  uncapitalize = function(str) {
    return str.substring(0, 1).toLowerCase() + str.substring(1);
  };
  app.passwordRating = function(password, username) {
    var digit, digits, lower, special, upper;
    if (!password || password.length < 8) {
      return rating(0, "too-short");
    }
    if (username && password.toLowerCase().match(username.toLowerCase())) {
      return rating(0, "similar-to-username");
    }
    if (SAME.test(password)) {
      return rating(1, "very-weak");
    }
    lower = LOWER.test(password);
    upper = UPPER.test(password);
    digit = DIGIT.test(password);
    digits = DIGITS.test(password);
    special = SPECIAL.test(password);
    if (lower && upper && digit && special) {
      return rating(4, "strong");
    }
    if (lower && upper && digit) {
      return rating(3, "good");
    }
    return rating(2, "weak");
  };
  app.messsages = function() {
    return {
      "similar-to-username": "Too similar to username",
      "too-short": "Too short",
      "very-weak": "Very weak",
      "weak": "Weak",
      "good": "Good",
      "strong": "Strong"
    };
  };
  app.checkPassword = function(password, usernameField) {
    var messages, ratingOutput, username;
    username = (usernameField != null) ? usernameField.value : null;
    messages = app.messsages();
    ratingOutput = app.passwordRating(password, username);
    ratingOutput.label = messages[ratingOutput.messageKey];
    return ratingOutput;
  };
  return app;
})(passwordView || {});

//# sourceMappingURL=password-view.js.map
