"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * From a previous array and an after array calculates which are the added and removed objects
 * @param previous {Array<T>} previous data
 * @param after {Array<T>} changes in the data
 * @returns {{added: Array<T>, removed: Array<T>}}
 */
var arrays_diff = function arrays_diff(previous, after) {
  var added = [];
  var removed = [];
  for (var i = 0; i < previous.length; i++) {
    if (after.indexOf(previous[i]) === -1) {
      removed = removed.concat(previous[i]);
    }
  }
  for (var _i = 0; _i < after.length; _i++) {
    if (previous.indexOf(after[_i]) === -1) {
      added = added.concat(after[_i]);
    }
  }
  return {
    added: added,
    removed: removed
  };
};

/**
 * Transforms an string separated by (,) to an
 * @param array {String} is a coma separated string or an empty string
 * @returns {Array<string>} an empty array if the string is empty, or the
 */
var string_to_array = function string_to_array(array) {
  if (array === "") {
    return [];
  }
  return array.split(",");
};

/**
 * Simply logs the data to the rollbase jobs logs
 * @param msg {String} is the message to log
 */
var sendDebugData = function sendDebugData(msg) {
  rbv_api.log("jobs", msg.message || msg);
  rbv_api.println(msg);
};

/**
 * Converts an array of Numbers into an array of strings
 * @param arr {Array<number>} array of numbers
 * @returns {Array<string>} array with the same values but as strings
 */
var mapArrayToString = function mapArrayToString(arr) {
  return arr.map(function (a) {
    return a + "";
  });
};

/**
 * Since rollbase doesn't seem to have a toString implementation for arrays
 * this is a simple implementation as a workaround
 * @param join {String} this is the string which will be between each element
 * @param arr {Array<T>} Array to join
 * @returns {string} (join) separated string
 */
var rollbaseJoinArray = function rollbaseJoinArray(join, arr) {
  var buffer = "";
  for (var i = 0; i < arr.length; i++) {
    buffer += arr[i];
    if (i !== arr.length - 1) {
      buffer += join;
    }
  }
  return buffer;
};

/**
 * filters the array by a function
 * @param fn (T -> Number -> Boolean) This function evaluates each element
 * of the array, takes 2 arguments, first the values of the array, then the index
 * and should return a Boolean, if the boolean is true then
 * the value is appended to the buffer which is returned
 * @param arr {Array<T>} this is an array of any type
 * @returns {Array<T>} The array filtered by the function
 */
var filter = function filter(fn, arr) {
  var buffer = [];
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      buffer = buffer.concat(arr[i]);
    }
  }
  return buffer;
};

/**
 * This is a function that should run inside an update trigger,
 * it gets the risk ids related to the object
 * it gets the data of those risks
 * then checks if the risk has the relationship to filter the one that is just been attached
 * clones all the risk fields into a variable
 * then creates a new risk from that variable.
 * @param obj {Object} this are the parameters that should be provided with the rollbase template helpers {!variable}
 * @param obj.relationshipName {String} is the relationship name between the risk and the object, e.g "R123456"
 * @param obj.relatedObjectName {String} is the name of the related object.
 * @param obj.name {String} this is the current object name trying to attach the risk
 * @param obj.id {String} this is the id of the current object
 * @param obj.previous {Array<string>} this is the previous values of the relation that should have changed
 * @param obj.after {Array<string>} this is the after values of the relation that should have changed.
 * @param obj.previousIntegrationName {String} custom integration name of the previous variable, defaults to Previous_${obj.relatedObjectName}s
 * @param obj.otherRelationships {Array<String>} these are the other relationships that
 * the object has, and should be cleared for clonation.
 */
var cloneAndAttachRisk = function cloneAndAttachRisk(obj) {

  sendDebugData("At:" + new Date() + " Entering the " + obj.name + "# " + obj.id + ", with data: " + JSON.stringify(obj));

  //Set Defaults
  obj["relatedObjectName"] = obj["relatedObjectName"] || "Risk";
  obj.previousIntegrationName = obj.previousIntegrationName || "Previous_" + obj.relatedObjectName + "s";
  obj.otherRelationships = obj.otherRelationships || ["R742877" // Asset
  , "R784933" // Contingency
  , "R126189" // Deliverables
  , "R124231" // Moc
  , "R134107" // Service
  , "R742882" // Service Line
  , "R106496" // Work Enviroments
  , "R122837" // Work Instruction
  ];

  var previous = string_to_array(obj.previous);
  /*let values = rbv_api.selectQuery(`SELECT id, ${obj.relationshipName} FROM ${obj.relatedObjectName} WHERE ${obj.relationshipName}=${obj.id}`, 500)
   let after = []
   for(let i = 0; i < values.length; i++){
   after = after.concat(values[i][0])
   }*/
  //const after = mapArrayToString(rbv_api.getRelatedIds(obj.relationshipName, obj.id))
  var after = string_to_array(obj.after);
  var debugString = {
    previous: rollbaseJoinArray(",", previous),
    after: rollbaseJoinArray(",", after)
  };
  sendDebugData("Previous: " + debugString.previous + " | After: " + debugString.after);
  var diff = arrays_diff(previous, after);
  sendDebugData("Diff: { added: " + rollbaseJoinArray(",", diff.added) + " | removed: " + rollbaseJoinArray(",", diff.removed) + "}");

  var new_previous_values = after;

  var _loop = function _loop(i) {
    //Most of the time, this only runs once, because most of the time the added is only one element
    // this is a loop bewaring for an exceptional case
    var added_id = diff.added[i];
    var query = "SELECT R1346699, Risk_Hazard, id, " + obj.relationshipName + " FROM " + obj.relatedObjectName + " WHERE id=" + added_id;
    sendDebugData("Debug query: " + query);
    var attached = rbv_api.selectQuery(query, 1); //newly attached object
    //sendDebugData(`Query successfull: ${JSON.stringify(attached)}`)

    if (!attached.length || !attached[0].length) {
      sendDebugData("No Risks then do nothing, printing attached_risk object: " + attached);
      sendDebugData("This is the query: " + query);
      return {
        v: void 0
      };
    }

    var risk = {
      id: attached[0][2],
      //R392036: attached[0][2],//Key_Word 
      Risk_Hazard: attached[0][1],
      status: "APPROVED",

       isLocked: false //UnLock the object
    };
    //sendDebugData(`This is the new risk to create: ${JSON.stringify(risk)}`)

    //add the risk relationship to this object and remove all other relationships
    for (var k = 0; k < obj.otherRelationships.length; k++) {
      if (obj.otherRelationships[k] === obj.relationshipName) {

        risk[obj.relationshipName] = attached[0][3]; //Assign the new relationship
      } else {
        risk[obj.otherRelationships[k]] = 0; //Reset the other relationships to null
      }
    }

    sendDebugData("The attached risk to be cloned: " + risk.id);

    var newRiskId = rbv_api.cloneRecord("Risk", risk.id, risk);

    //I Should set a custom field updatedAt here.
    sendDebugData("New Risk created with id: " + newRiskId);
    //Detach the previous risk, that belong to other object
    rbv_api.detach(obj.relationshipName, obj.name, obj.id, "Risk", risk.id);

    //Remove the attached object (the one cloned from)
    new_previous_values = filter(function (f) {
      return f !== risk.id + "";
    }, new_previous_values);

    //Add the new risk (The one cloned)
    new_previous_values = new_previous_values.concat(newRiskId + "");
  };

  for (var i = 0; i < diff.added.length; i++) {
    var _ret = _loop(i);

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  }

  //Finally set the Previous_Risk variable
  rbv_api.setFieldValue(obj.name, obj.id, obj.previousIntegrationName, rollbaseJoinArray(",", new_previous_values));
  sendDebugData("Crap saved in the Previous Risks Field: " + rollbaseJoinArray(",", new_previous_values));
};