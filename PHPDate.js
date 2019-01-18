"use strict";
/*
 *
 * This class is made to work the same as php Date (http://php.net/manual/en/function.date.php)
 *
 * Include this class and use it like So: PHPDate.get(_formatString,_javascriptDateObject);
 *
 * Example: PHPDate.get("l jS F Y g:i:s A") will output the following format Sunday 15th September 2013 10:30:09 AM
 *
 *
 * v1.0.1
 */
exports.__esModule = true;
var PHPDate = /** @class */ (function () {
    function PHPDate() {
        this.daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        this.shortHandDaysOfWeek = [
            'Sun',
            'Mon',
            'Tues',
            'Wed',
            'Thurs',
            'Fri',
            'Sat'
        ];
        this.monthsOfYear = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        this.shortHandMonthsOfYear = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
    }
    PHPDate.prototype.getShorthandDaysOfWeek = function () {
        //return clone of the array, as we dont want direct manipulation of the array
        return this.shortHandDaysOfWeek.slice(0);
    };
    PHPDate.prototype.getMonthsOfYear = function () {
        //return clone of the array, as we dont want direct manipulation of the array
        return this.monthsOfYear.slice(0);
    };
    PHPDate.prototype.getShorthandMonthsOfYear = function () {
        //return clone of the array, as we dont want direct manipulation of the array
        return this.shortHandMonthsOfYear.slice(0);
    };
    PHPDate.prototype.get = function (_phpDateString, _dateObject, _timezoneString) {
        //_timezoneString
        //https://github.com/dmfilipenko/timezones.json/blob/master/timezones.json
        if (_dateObject === void 0) { _dateObject = new Date(); }
        if (_timezoneString === void 0) { _timezoneString = ""; }
        if (!_phpDateString) {
            return "";
        }
        if (_timezoneString) {
            //chrome only
            var localeString = _dateObject.toLocaleString("en-UK", { timeZone: _timezoneString });
            _dateObject = new Date(localeString);
            if (_dateObject.toString() === 'Invalid Date') {
                return '';
            }
        }
        var string = "";
        for (var i = 0; i < _phpDateString.length; i++) {
            string += String(this.parsePHPDateChar(_phpDateString[i], _dateObject));
        }
        ;
        return string;
    };
    PHPDate.prototype.isLeapYear = function (_dateObject) {
        var year = _dateObject.getFullYear();
        if (year % 400 == 0) {
            return true;
        }
        else if (year % 100 == 0) {
            return false;
        }
        else if (year % 4 == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    PHPDate.prototype.getDaysInMonth = function (_dateObject) {
        var indexMonth = _dateObject.getMonth();
        switch (this.monthsOfYear[indexMonth]) {
            case "February":
                {
                    var isLeapYear = this.isLeapYear(_dateObject);
                    return isLeapYear ? 29 : 28;
                }
            case "April":
            case "June":
            case "September":
            case "November":
                {
                    return 30;
                }
            case "January":
            case "March":
            case "May":
            case "July":
            case "August":
            case "October":
            case "December":
                {
                    return 31;
                }
        }
        return NaN;
    };
    PHPDate.prototype.getDayOfMonthOrdinalSuffix = function (_dateObject) {
        var dayOfMonth = _dateObject.getDate();
        if (dayOfMonth > 31 || dayOfMonth < 1) {
            return "";
        }
        if ((dayOfMonth >= 4 && dayOfMonth <= 20) || (dayOfMonth >= 24 && dayOfMonth <= 30)) {
            return "th";
        }
        if (dayOfMonth == 2 || dayOfMonth == 22) {
            return "nd";
        }
        if (dayOfMonth == 3 || dayOfMonth == 23) {
            return "rd";
        }
        if (dayOfMonth == 1 || dayOfMonth == 21 || dayOfMonth == 31) {
            return "st";
        }
        return "";
    };
    PHPDate.prototype.parsePHPDateChar = function (_char, _dateObject) {
        switch (_char) {
            case "d":
                {
                    var date = _dateObject.getDate().toString();
                    if (date.length == 1) {
                        date = "0" + date;
                    }
                    return date;
                }
            case "D":
                {
                    var dayOfWeek = _dateObject.getDay();
                    return this.shortHandDaysOfWeek[dayOfWeek];
                }
            case "j":
                {
                    return _dateObject.getDate();
                }
            case "l":
                {
                    var dayOfWeek = _dateObject.getDay();
                    return this.daysOfWeek[dayOfWeek];
                }
            case "N":
                {
                    return _dateObject.getDay() + 1;
                }
            case "S":
                {
                    return this.getDayOfMonthOrdinalSuffix(_dateObject);
                }
            case "w":
                {
                    return _dateObject.getDay();
                }
            //MONTH
            case "F":
                {
                    var monthIndex = _dateObject.getMonth();
                    return this.monthsOfYear[monthIndex];
                }
            case "m":
                {
                    var numericMonth = (_dateObject.getMonth() + 1).toString();
                    if (numericMonth.length == 1) {
                        numericMonth = "0" + numericMonth;
                    }
                    return numericMonth;
                }
            case "M":
                {
                    var indexMonth = _dateObject.getMonth();
                    return this.shortHandMonthsOfYear[indexMonth];
                }
            case "n":
                {
                    var indexMonth = _dateObject.getMonth();
                    return indexMonth + 1;
                }
            case "t":
                {
                    return this.getDaysInMonth(_dateObject);
                }
            //YEAR
            case "L":
                {
                    return this.isLeapYear(_dateObject);
                }
            case "o":
            case "Y":
                {
                    return _dateObject.getFullYear();
                }
            case "y":
                {
                    var fullYear = String(_dateObject.getFullYear());
                    return fullYear.substring(2) | 0; //convert back to number
                }
            //Time
            case "a":
                {
                    var hours = _dateObject.getHours();
                    return hours < 12 ? 'am' : 'pm';
                }
            case "A":
                {
                    var hours = _dateObject.getHours();
                    return hours < 12 ? 'AM' : 'PM';
                }
            case "g":
                {
                    var hours = _dateObject.getHours();
                    if (hours > 12) {
                        hours -= 12;
                    }
                    else if (hours == 0) {
                        hours = 12;
                    }
                    return hours;
                }
            case "G":
                {
                    return _dateObject.getHours();
                }
            case "h":
                {
                    var hours12 = this.parsePHPDateChar("g", _dateObject);
                    if (hours12.length < 2) {
                        hours12 = "0" + hours12;
                    }
                    return hours12;
                }
            case "H":
                {
                    var hours24 = _dateObject.getHours();
                    var strHours24 = String(hours24);
                    if (strHours24.length === 1) {
                        strHours24 = "0" + strHours24;
                    }
                    return strHours24;
                }
            case "i":
                {
                    var minutes = _dateObject.getMinutes();
                    var strMinutes = String(minutes);
                    if (strMinutes.length === 1) {
                        strMinutes = "0" + strMinutes;
                    }
                    return strMinutes;
                }
            case "s":
                {
                    var seconds = _dateObject.getSeconds();
                    var strSeconds = String(seconds);
                    if (strSeconds.length === 1) {
                        strSeconds = "0" + strSeconds;
                    }
                    return strSeconds;
                }
            case "U":
                {
                    return (_dateObject.getTime() * 0.001) | 0;
                }
            case "z":
            case "W":
                {
                    //fall through
                    break;
                }
        }
        return _char;
    };
    return PHPDate;
}());
exports["default"] = new PHPDate();
