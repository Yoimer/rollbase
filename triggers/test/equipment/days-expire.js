"use strict";

var _slicedToArray = function() {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    return function(arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
}();

var parseDate = function parseDate(date) {
    return new Date(date);
};

var rollbaseJoin = function rollbaseJoin(token) {
    return function (arr) {
        return arr.reduce(function (acc, a) {
            return acc + token + a;
        }, "");
    };
};

var log = function log(str) {
    rbv_api.println(str);
    return str;
};

var logTimed = function logTimed(tag) {
    return function (t) {
        log("-------> " + tag);
        log("id: " + t.id);
        log("Start Date: " + t.startDate);
        log("Validity Time: " + t.validityTime);
        log("Validity Time Unit: " + t.validityTimeUnit);
        log("Expiration Date: " + t.expirationDate);
        return t;
    };
};

var getcertificationsFromIds = function getcertificationsFromIds(certificationIds) {
    if (!certificationIds.length) {
        return [];
    }
    var fields = ["id", "start_date", "validity_time", "validity_time_unit#code"];
    var query = "SELECT " + fields.join(",") + " FROM Certification WHERE id IN (" + certificationIds.join(",") + ")";
    rbv_api.println("Debug query: " + query);
    var certificationSql = rbv_api.selectQuery(query, 999);
    rbv_api.println("certifications SQL found: " + certificationSql.length);
    return certificationSql.map(function (c) {
        return {
            id: c[0],
            startDate: new Date(c[1]),
            validityTime: c[2],
            validityTimeUnit: c[3],
            expirationDate: null
        };
    }).map(logTimed("certificationSQL")).map(addExpirationDate).map(logTimed("After Addign expirations")).sort(sortTimedDescend).map(logTimed("Sorted"));
};

var addExpirationDate = function addExpirationDate(timed) {
    var expirationDate = getExpirationDate(timed);
    timed["expirationDate"] = expirationDate;
    return timed;
};

var sortTimedDescend = function sortTimedDescend(a, b) {
    return b.expirationDate.getTime() - a.expirationDate.getTime();
};

var getProductFromUnit = function getProductFromUnit(unit) {
    var seg = 1000,
        min = seg * 60,
        hr = min * 60,
        day = hr * 24,
        month = day * 30,
        year = day * 365;
    if (unit.match("D")) {
        return day;
    } else if (unit.match("M")) {
        return month;
    } else if (unit.match("Y")) {
        return year;
    } else {
        return 1;
    }
};

var getValidityTime = function getValidityTime(_ref) {
    var _ref$validityTime = _ref.validityTime,
        validityTime = _ref$validityTime === undefined ? 0 : _ref$validityTime,
        _ref$validityTimeUnit = _ref.validityTimeUnit,
        validityTimeUnit = _ref$validityTimeUnit === undefined ? "D" : _ref$validityTimeUnit;

    log("getValidity Time: " + validityTime + "/" + validityTimeUnit);
    var product = getProductFromUnit(validityTimeUnit);
    log("Product: " + product);
    return validityTime * product;
};

var getExpirationDate = function getExpirationDate(timed) {
    logTimed("getExpirationDate: ")(timed);
    var result = new Date(timed.startDate.getTime() + getValidityTime(timed));
    log("expiration date result: " + result);
    return result;
};

var isExpired = function isExpired(date) {
    var today = new Date();
    return date.getTime() <= today.getTime();
};

var getTimeDelta = function getTimeDelta(start, end) {
    return end.getTime() - start.getTime();
};

var humanTimeDelta = function humanTimeDelta(start, end) {
    var seg = 1000,
        min = seg * 60,
        hr = min * 60,
        day = hr * 24,
        month = day * 30,
        year = day * 365;
    var delta = getTimeDelta(start, end);

    var _map = [delta / day, delta / month, delta / year].map(Math.round),
        _map2 = _slicedToArray(_map, 3),
        days = _map2[0],
        months = _map2[1],
        years = _map2[2];

    if (days <= 31) {
        return {
            time: days,
            unit: "D"
        };
    } else if (months <= 12) {
        return {
            time: months,
            unit: "M"
        };
    } else {
        return {
            time: years,
            unit: "Y"
        };
    }
};

var safeHead = function safeHead() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (!arr.length) {
        return null;
    }
    if (!arr[0]) {
        return null;
    }
    return arr[0];
};

var unitToString = function unitToString(unit) {
    switch (unit) {
        case "D":
            return "day";
        case "M":
            return "month";
        case "Y":
            return "year";
        default:
            return "";
    }
};

var humanTime = function humanTime(_ref2) {
    var unit = _ref2.unit,
        time = _ref2.time;

    var plural = Math.abs(time) > 1;
    var humanUnit = unitToString(unit);
    humanUnit += plural ? "s" : "";
    return Math.abs(time);
};

var getExpiredClassName = function getExpiredClassName(status) {
    switch (status) {
        case "TO_EXPIRE":
            return "to-be-expired";
        case "EXPIRED":
            return "expired";
        case "VALID":
            return "valid";
        default:
            return "";
    }
};

var getHtml = function getHtml(data) {
    var className = getExpiredClassName(data.status);
    return  data.message;
};

var getData = function getData(timed) {
    var delta = humanTimeDelta(new Date(), timed.expirationDate);
     if (delta.time <= 0) {
        return {
            status: "EXPIRED",
            message: humanTime(delta)
        };
    } else{
      return {
            status:"Valid",
            message:0
        };
    }
};

//Real logic
var certificationComponent = function certificationComponent(id) {
    var certificationIds = rbv_api.getRelatedIds("R2814431", id);

    certificationIds.map(function (a) {
        return rbv_api.println(a);
    });
    if (!certificationIds.length) {
        return null;
    }

    var certifications = getcertificationsFromIds(certificationIds);

    certifications.map(function (c) {
        return rbv_api.println(c.expirationDate);
    });

    var lastcertification = safeHead(certifications);

    rbv_api.println("Last certification: " + lastcertification.expirationDate);

    var data = getData(lastcertification);

    log("Resulting Message: " + data.message);

    return getHtml(data);
};

certificationComponent("{!id}");