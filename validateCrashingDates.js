


/**
 * @description This code checks if the current unavailabilities dates colide with other previous unavailabilities.
 * 
 * @param {string} obj.relatedId id the id of the related object
 * @param {Date} obj.startDate
 * @param {Date} obj.endDate
 * @param {string} obj.objName is the name of the unavailability Object
 * @param {string | number} obj.id is the id of the current unavailability
 * @example
 *  var relatedId = "{!R1342084#id}";
    var startDate  = new Date('{!Start_Date}');
    var endDate  = new Date('{!End_Date}');
    var objName = "Unavailability_Personnel";
    var relationshipName = "R1342084"
 */
var validateCrashingDates = function (obj) {
    var relatedId = obj.relatedId
        , startDate = obj.startDate
        , endDate = obj.endDate
        , objName = obj.objName
        , relationshipName = obj.relationshipName
        , id = obj.id;

    /**
     * Helper Functions for Functional Programmin
     */

    /**
     * Logs the string in the rollbase debug console
     * @param str {string} is the string to print on the console
     * @return {string} the same string passed in the param.
     */
    var log = function (str) {
        rbv_api.println(str);
        return str;
    };

    /**
     * compose :: (a, b) -> c -> d
     * @param fn {function} is the first function which will take as param the returned value of the fn2
     * @param fn2 {function} is the second function wich will take the param of the returned function
     * @return {function} a function that needs the data to pass it to the second function
     */
    var compose = function (fn, fn2) {
        return function (param) {
            return fn(fn2(param));
        };
    };

    /**
     * toInt :: String -> Integer
     * @param num {string} is the string to parse into an int
     * @return {integer} is a decimal integer or NaN
     */
    var toInt = function (num) {
        return parseInt(num, 10);
    };


    var customLiftA3Conditional = function (fn1, fn2, fn3) {
        return function (data) {
            return fn1(data) || fn2(data) || fn3(data);
        };
    };

    /**
     * End of Helper Functions
     */



    var unavailabilitiesQuery = rbv_api.selectQuery("SELECT Start_Date, End_Date, id FROM " + objName + " WHERE " + relationshipName + "=" + relatedId, 999);

    /**
     * Checks if the current date is between the start and end date
     * @param {integer} start date of the unavailability as a integer with getTime()
     * @param {integer} end date of the as a integer with getTime()
     * @return {boolean}
     */
    var isDateBetweenDates = function (date) {
        return function (obj) {
            //log("Date > obj.start: "+ date > obj.start);
            //log("Date < obj.end: "+ date < obj.end);
            return date.getTime() >= obj.startDate.getTime() && date <= obj.endDate.getTime();
        };
    };

    var isAroundDates = function (startDate, endDate) {
        return function (obj) {
            return startDate.getTime() <= obj.startDate.getTime() && endDate.getTime() >= obj.endDate.getTime();
        };
    };

    var filterCrashDates = customLiftA3Conditional(
        isDateBetweenDates(startDate)
        , isDateBetweenDates(endDate)
        , isAroundDates(startDate, endDate)
    );

    var filterRemoveCurrentUnavailability = function (id) {
        return function (data) {
            return data.id+"" !== id+"";
        };
    };

    var mapToUsabeDates = function (a) {
        return {
            startDate: new Date(a[0])
            , endDate: new Date(a[1])
            , id: a[2]
        };
    };

    var logDates = function (a, b) {
        log("StartDate: " + a.startDate + " EndDate: " + a.endDate);
        return a;
    };

    var result = unavailabilitiesQuery
        .map(compose(
            logDates
            , mapToUsabeDates
        ))
        .filter(filterRemoveCurrentUnavailability(id))
        //TODO: remove the current unavailability to permit edit
        .filter(filterCrashDates)
        .map(function (a) {
            log("colliding dates: ");
            return logDates(a);
        });

    return result.length > 0 ? "This dates collide with a previous unavailability, please check" : null;


};