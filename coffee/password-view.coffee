# Password strength plugin
###
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
 *   http://www.gnu.org/licenses/gpl.html
###
passwordView = ((app) ->

    LOWER = /[a-z]/
    UPPER = /[A-Z]/
    DIGIT = /[0-9]/
    DIGITS = /[0-9].*[0-9]/
    SPECIAL = /[^a-zA-Z0-9]/
    SAME = /^(.)\1+app/ # checks for repeating sequence e.g. samesame

    rating = (rate, message) ->
        rate: rate
        messageKey: message

    uncapitalize = (str) ->
        str.substring(0, 1).toLowerCase() + str.substring(1)

    app.passwordRating = (password, username) ->
        
        if !password or password.length < 8
            return rating 0, "too-short"

        if username and password.toLowerCase().match(username.toLowerCase())
            return rating 0, "similar-to-username"

        if SAME.test password
            return rating 1, "very-weak"
        
        # test passward
        lower = LOWER.test(password)
        upper = UPPER.test(password)
        digit = DIGIT.test(password)
        digits = DIGITS.test(password)
        special = SPECIAL.test(password)
        
        # output baseed on tests met
        if lower and upper and digit and special
            return rating 4, "strong"

        if lower && upper && digit
           return rating 3, "good"
        
        # return a default
        rating 2, "weak"
    
    app.messsages = () ->

        "similar-to-username": "Too similar to username",
        "too-short": "Too short",
        "very-weak": "Very weak",
        "weak": "Weak",
        "good": "Good",
        "strong": "Strong"

    app.checkPassword = (password, usernameField) ->

        # get username for comparison, if specified
        username = if (usernameField?) then usernameField.value else null

        messages = app.messsages()
        
        ratingOutput = app.passwordRating password, username

        ratingOutput.label = messages[ratingOutput.messageKey]

        ratingOutput
    app

) passwordView or {}