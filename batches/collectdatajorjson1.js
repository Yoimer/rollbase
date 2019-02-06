/* ------------------------------------------------------- *
 * Description: Extract and store data for Charts 1 to 20. *
 * ------------------------------------------------------- */


var C = rbv_api.selectQuery("SELECT id,name FROM Service_Line", 999);
var D = rbv_api.selectQuery("SELECT id, name, status#value FROM Job WHERE id IS NOT NULL AND name IS NOT NULL AND status#value IS NOT NULL AND (status#value = 'Approved' OR status#value = 'Service Designed' OR status#value = 'Planned' OR status#value = 'Canceled' OR status#value = 'Contingency Planned' OR status#value = 'Information Set' OR status#value = 'Testing' ) ORDER BY name", 999);
var E = rbv_api.selectQuery("SELECT id,name FROM Asset_Type", 999);
var F = rbv_api.selectQuery("SELECT id, Days_Expired_INT, Calibration_Counter_Json FROM MDE WHERE (id IS NOT NULL AND Days_Expired_INT IS NOT NULL AND Calibration_Counter_Json IS NOT NULL)", 999);
var G = rbv_api.selectQuery("SELECT id,name, Type_of_NPT_Report, Type_READ_ONLY, Net_time, Event_start_date FROM NPT_Report WHERE (Type_of_NPT_Report IS NOT NULL AND Type_READ_ONLY IS NOT NULL AND Net_time IS NOT NULL AND Event_start_date IS NOT NULL) ORDER BY Type_of_NPT_Report", 999);
var H = rbv_api.selectQuery("SELECT id, name, Type_of_NPT_Report, Type_READ_ONLY, Net_time, Event_start_date FROM NPT_Report WHERE (Type_of_NPT_Report IS NOT NULL AND Type_READ_ONLY IS NOT NULL AND  Net_time IS NOT NULL AND Event_start_date IS NOT NULL)", 999);
var I = rbv_api.selectQuery("SELECT id, name, Event_start_date, createdAt, Job_Number_related, Job_ID_RF FROM name1 WHERE (Event_start_date IS NOT NULL AND createdAt IS NOT NULL AND Job_Number_related IS NOT NULL AND Job_ID_RF IS NOT NULL) ORDER BY Job_ID_RF", 999);
var J = rbv_api.selectQuery("SELECT id, name, R1665668#value, Location_Job, Field, createdAt FROM Job WHERE (R1665668#value IS NOT NULL AND Location_Job IS NOT NULL AND Field IS NOT NULL AND createdAt IS NOT NULL) ORDER BY  Location_Job", 999);
var M = rbv_api.selectQuery("SELECT id, name, MDEs_No_Hyperlink FROM Master_MDE1 WHERE MDEs_No_Hyperlink <> ''", 999);
var N = rbv_api.selectQuery("SELECT id, name, Service_Line_RF, End_Of_Job_options#value, Closure_Date, Job_Executed_Safely#value, Have_the_requirements_been_achieved#value, Reliability_of_the_Equipment#value, Achieved_performance_expectations#value, How_was_the_communication_#value, Competency_of_Field_Crew#value, Overall_Performance#value FROM Job WHERE id IS NOT NULL AND name IS NOT NULL AND Service_Line_RF IS NOT NULL AND End_Of_Job_options#value IS NOT NULL AND Closure_Date IS NOT NULL AND (Job_Executed_Safely#value IS NOT NULL OR Have_the_requirements_been_achieved#value IS NOT NULL OR Reliability_of_the_Equipment#value IS NOT NULL OR Achieved_performance_expectations#value IS NOT NULL OR How_was_the_communication_#value IS NOT NULL OR Competency_of_Field_Crew#value IS NOT NULL OR Overall_Performance#value IS NOT NULL) AND End_Of_Job_options#value = 'Close Job' ORDER BY Service_Line_RF", 999);
var O = rbv_api.selectQuery("SELECT COUNT(*) FROM Call_Out", 999);
var P = rbv_api.selectQuery("SELECT id, name, Date_of_Customer_Approval, status#value FROM Call_Out WHERE id IS NOT NULL AND name IS NOT NULL AND Date_of_Customer_Approval IS NOT NULL AND status#value IS NOT NULL AND status#value = 'Confirmed' ORDER BY name", 999);
var Q = rbv_api.selectQuery("SELECT COUNT(*) FROM Job", 999);
var R = rbv_api.selectQuery("SELECT id, name, Certification_Counter_Json FROM Equipment1 WHERE id IS NOT NULL AND name IS NOT NULL AND Certification_Counter_Json IS NOT NULL", 999);
var S = rbv_api.selectQuery("SELECT COUNT(*) FROM Moc", 999);
var T = rbv_api.selectQuery("SELECT COUNT(*) FROM Risk", 999);
var U = rbv_api.selectQuery("SELECT COUNT(*) FROM CAPA WHERE Action_Type_ = 'CAR'", 999);
var V = rbv_api.selectQuery("SELECT COUNT(*) FROM CAPA WHERE Action_Type_ = 'PAR'", 999);
var W = rbv_api.selectQuery("SELECT COUNT(*) FROM Audit WHERE status#code = 'Closed'", 999);




/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 1                          *
 * ------------------------------------------------------------------------------------- */
var jn1Crt1X = [];    // X axis
var jn1Crt1Y = [];    // Y axis

if (N.length > 0) {
    var currentSl           = N[0][2]; // Start with the first Job's Service Line (from the GROUP BY SELECT).
    var currentNm           = N[0][1]; // Start with the first Job's name (from the GROUP BY SELECT).

    var slJbCnt             = 0; // Store Service Line's total number of Jobs.
    var jbCustValCnt        = 0; // Store the sum of all seven questions values for current Service Line's Jobs.

    var SLexcExpCnt         = 0; // Service Line's "Exceeded Expectations" counter (this variable is re-started when a control break occurs in the GROUP BY SELECT).
    var SLmetExpCnt         = 0; // Service Line's "Met Expectations" counter (this variable is re-started when a control break occurs in the GROUP BY SELECT).
    var SLmissedCnt         = 0; // Service Line's "Missed Expectations" counter (this variable is re-started when a control break occurs in the GROUP BY SELECT).

    var one_day             = 1000 * 60 * 60 * 24; // One day in milliseconds.
    var var_today           = new Date().getTime(); // Today in milliseconds.

    var oneYearTillToday    = var_today - (one_day * 365);  // One full year until Today in milliseconds.

    // var curryear            = new Date().getFullYear(); // Current year.
    // var lastyear            = new Date().getFullYear() - 1; // Last year.
    // var lastYearJanuary     = new Date(lastyear, 0, 1).getTime(); // Last year's January 1st in milliseconds.
    // var lastYearDecember    = new Date(lastyear, 11, 31).getTime(); // Last year's December 31th in milliseconds.

    /* -------------- *
     * Read all Jobs. *
     * -------------- */
    for (var i_CustE = 0; i_CustE < N.length; i_CustE++) {
        var jobName = N[i_CustE][1];     // Get Job's name.
        var jobSrvL = N[i_CustE][2];     // Get Job's Service Line.
        var jobDtCl = N[i_CustE][4];     // Get Job's Closure date.
        var jobDtml = jobDtCl.getTime(); // Job's Closure Date in milliseconds.
        var exctSfl = N[i_CustE][5];     // Get Job's Executed Safely question.
        var beenAch = N[i_CustE][6];     // Get Job's Have the requirements been achieved question.
        var reliEqp = N[i_CustE][7];     // Get Job's Reliability of the Equipment question.
        var achPerf = N[i_CustE][8];     // Get Job's Achieved performance expectations question.
        var howComm = N[i_CustE][9];     // Get Job's How was the communication question.
        var fldComp = N[i_CustE][10];    // Get Job's Competency of field crew question.
        var ovrlPer = N[i_CustE][11];    // Get Job's Overal performance question.

/*
1.- Debo almacenar el numero de Jobs de la Service Line.
2.- Sumo (tal y como lo estoy haciendo en el programa) los valores de preguntas para cada Job.
3.- Cuando ocurra una ruptura de control de la Service Line, calculo

Total de la Service Line = Total Job1 + Total Job2 + ... + Total Job n
                           -------------------------------------------
                                              n

4.- IF  (0 <= Total de la Service Line < 7) {
        Sumo 1 al contador "Missed Expectation" (franja Roja) para esta Service Line
    } ELSE IF (7 <= Total de la Service Line < 14) {
        Sumo 1 al contador "Met Expectation" (franja Verde) para esta Service Line
    } ELSE IF (14 >= Total de la Service Line <= 21) {
        Sumo 1 al contador "Exceeded Expectations" (franja Azul) para esta Service Line
    }

5.- Al final, por cada Service Line, tendre tres contadores como se indica en el punto 4.
*/

        // Include only Jobs closed during one year (until Today) period.
        if (jobDtml > oneYearTillToday) {

            // Is current Job's Service Line same as last one, then analize its customer opinion (for each one of Job's seven questions).
            if (currentSl === jobSrvL) {

                ++slJbCnt;  // Increase Service Line's Jobs counter.

                // Survey Executed Safely question.
                if (exctSfl === 'Exceeded Expectations') { 
                    jbCustValCnt += 3;
                } else if (exctSfl === 'Met Expectations') {
                    jbCustValCnt += 2;
                } else if (exctSfl === 'Missed Expectations') {
                    jbCustValCnt += 1;
                }

                // Survey Have the requirements been achieved question.
                if (beenAch === 'Exceeded Expectations') { 
                    jbCustValCnt += 3;
                } else if (beenAch === 'Met Expectations') {
                    jbCustValCnt += 2;
                } else if (beenAch === 'Missed Expectations') {
                    jbCustValCnt += 1;
                }

                // Survey Reliability of the Equipment question.
                if (reliEqp === 'Exceeded Expectations') { 
                    jbCustValCnt += 3;
                } else if (reliEqp === 'Met Expectations') {
                    jbCustValCnt += 2;
                } else if (reliEqp === 'Missed Expectations') {
                    jbCustValCnt += 1;
                }

                // Survey Achieved performance expectations question.
                if (achPerf === 'Exceeded Expectations') { 
                    jbCustValCnt += 3;
                } else if (achPerf === 'Met Expectations') {
                    jbCustValCnt += 2;
                } else if (achPerf === 'Missed Expectations') {
                    jbCustValCnt += 1;
                }

                // Survey How was the communication question.
                if (howComm === 'Exceeded Expectations') { 
                    jbCustValCnt += 3;
                } else if (howComm === 'Met Expectations') {
                    jbCustValCnt += 2;
                } else if (howComm === 'Missed Expectations') {
                    jbCustValCnt += 1;
                }

                // Survey Competency of field crew question.
                if (fldComp === 'Exceeded Expectations') { 
                    jbCustValCnt += 3;
                } else if (fldComp === 'Met Expectations') {
                    jbCustValCnt += 2;
                } else if (fldComp === 'Missed Expectations') {
                    jbCustValCnt += 1;
                }

                // Survey Overal performance question.
                if (ovrlPer === 'Exceeded Expectations') { 
                    jbCustValCnt += 3;
                } else if (ovrlPer === 'Met Expectations') {
                    jbCustValCnt += 2;
                } else if (ovrlPer === 'Missed Expectations') {
                    jbCustValCnt += 1;
                }
            } else {
                // Calculate media of the sum.

                // Collect current Job's Service Line name for y axis.
                jn1Crt1Y.push('"' + jobSrvL.toString() + '"');

                // Store next Service Line (from the SELECT GROUP BY).
                currentSl = jobSrvL;

                slJbCnt = 0;  // Reset Service Line's Jobs counter.
            }
        }
    }
}


/* ------------------------------------------------------------------------------------- *
 *                        COLLECT DATA FOR JSON1 - Charts 2, 3 and 4                     *
 * ------------------------------------------------------------------------------------- */
var jn1Crt234X = [];    // X axis
var jn1Crt234Y = [];    // Y axis

var totCalbCnt = 0.0;   // Store the count of all Calibrations (used in calculations for chart 15).
var pctXpClCnt = 0.0;   // Store percent of Measurement Devices with expired Calibrations (as required in chart 15).
var pctVlClCnt = 0.0;   // Store percent of Measurement Devices with Valid Calibrations (as required in chart 15).
var pctAbClCnt = 0.0;   // Store percent of Measurement Devices with About to expire Calibrations (as required in chart 15).


// Add all labels for X axis.
jn1Crt234X.push('"' + "Valid" + '"', '"' + "15 days" + '"', '"' + "30 days" + '"', '"' + "45 days" + '"', '"' + "Expired" + '"', '"' + "Need Calibratiom" + '"', '"' + "Expired" + '"', '"' + "<= 90 Days" + '"', '"' + "Valid (> 90 Days)" + '"');


jn1Crt234Y[0] = 0;     // Count "Days_Expired_INT" = 0.
jn1Crt234Y[1] = 0;     // Count "Days_Expired_INT" < 15.
jn1Crt234Y[2] = 0;     // Count "Days_Expired_INT" < 30.
jn1Crt234Y[3] = 0;     // Count "Days_Expired_INT" < 45.
jn1Crt234Y[4] = 0;     // Count "Days_Expired_INT" NOT NULL, 0, < 15, < 30 y < 45.
jn1Crt234Y[5] = 0;     // Count "Days_Expired_INT" = NULL.

// Counters for Charts 2, 3 and 4 (it is one chart including three bars).
jn1Crt234Y[6] = 0;     // Count all MDEs "Expired".
jn1Crt234Y[7] = 0;     // Count all MDEs "To Expire (90 Days until Today)".
jn1Crt234Y[8] = 0;     // Count all MDEs "Valid (> 90 Days from Today)".


if (F.length > 0) {

    /* -------------- *
     * Read all MDEs. *
     * -------------- */
    for (var i = 0; i < F.length; i++) {

        if (F[i][1] === null) {
            jn1Crt234Y[5] = jn1Crt234Y[5] + 1;
        } else if (F[i][1] === 0) {
            jn1Crt234Y[0] = jn1Crt234Y[0] + 1;
        } else if (F[i][1] < 15) {
            jn1Crt234Y[1] = jn1Crt234Y[1] + 1;
        } else if (F[i][1] < 30) {
            jn1Crt234Y[2] = jn1Crt234Y[2] + 1;
        } else if (F[i][1] < 45) {
            jn1Crt234Y[3] = jn1Crt234Y[3] + 1;
        } else jn1Crt234Y[4] = jn1Crt234Y[4] + 1;

        if (F[i][2] < 0) {
            jn1Crt234Y[6] = jn1Crt234Y[6] + 1;   // Add to Expired counter.
        } else if (F[i][2] <= 90 && F[i][2] >= 0) {
            jn1Crt234Y[7] = jn1Crt234Y[7] + 1;   // Add to About to Expire counter.
        } else if (F[i][2] > 90) {
            jn1Crt234Y[8] = jn1Crt234Y[8] + 1;   // Add to Valid counter.
        }

        ++totCalbCnt;
    }

    // Normalize all NULL values count.
    if (jn1Crt234Y[5] > 10) {
        jn1Crt234Y[5] = 10;
    }

    /* ------------------------------------------------------------------------------------------------------------ *
     * Calculate percent of Measurement Devices with Calibration expired, about to expire and valid (for chart 15). *
     * ------------------------------------------------------------------------------------------------------------ */
    pctXpClCnt = Math.round((jn1Crt234Y[6] * 100) / totCalbCnt);
    pctAbClCnt = Math.round((jn1Crt234Y[7] * 100) / totCalbCnt);
    pctVlClCnt = Math.round((jn1Crt234Y[8] * 100) / totCalbCnt);

    rbv_api.println("JSON1 Charts 2, 3, 4 ---> Total MDEs: " + totCalbCnt);
    rbv_api.println("JSON1 Charts 2, 3, 4 ---> Expired: " + jn1Crt234Y[6]);
    rbv_api.println("JSON1 Charts 2, 3, 4 ---> About to Expire: " + jn1Crt234Y[7]);
    rbv_api.println("JSON1 Charts 2, 3, 4 ---> Valid: " + jn1Crt234Y[8]);
    rbv_api.println("JSON1 Charts 2, 3, 4 ---> Percent MDEs with Calibration expired: " + pctXpClCnt);
    rbv_api.println("JSON1 Charts 2, 3, 4 ---> Percent MDEs with Calibration about to expire: " + pctAbClCnt);
    rbv_api.println("JSON1 Charts 2, 3, 4 ---> Percent MDEs with Calibration valid: " + pctVlClCnt);
}


/* ------------------------------------------------------------------------------------- *
 *                   COLLECT DATA FOR JSON1 - Chart 3  - NOT USED                        *
 * ------------------------------------------------------------------------------------- */
var jn1Crt3X = [];    // X axis
var jn1Crt3Y = [];    // Y axis


/* ------------------------------------------------------------------------------------- *
 *                   COLLECT DATA FOR JSON1 - Chart 4 - NOT USED                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt4X = [];    // X axis
var jn1Crt4Y = [];    // Y axis


/* ------------------------------------------------------------------------------------- *
 *                   COLLECT DATA FOR JSON1 - Charts 5, 6, 7                             *
 * ------------------------------------------------------------------------------------- */
var jn1Crt567X = [];    // X axis
var jn1Crt567Y = [];    // Y axis

var totcertCnt = 0.0;   // Store the count of all Calibrations (used in calculations for chart 16).
var pctXpCtCnt = 0.0;   // Store percent of Equipments with expired Certifications (as required in chart 16).
var pctVlCtCnt = 0.0;   // Store percent of Measurement Devices with Valid Calibrations (as required in chart 16).
var pctAbCtCnt = 0.0;   // Store percent of Measurement Devices with About to expire Calibrations (as required in chart 16).


// Add all labels for X axis.
jn1Crt567X.push('"' + "Expired" + '"', '"' + "To Expire (90 Days until Today)" + '"', '"' + "Valid (> 90 Days from Today)" + '"');


// Counters for Charts 5, 6 and 7 (it is one chart including three bars).
jn1Crt567Y[0] = 0;     // Count all Equipments "Expired".
jn1Crt567Y[1] = 0;     // Count all Equipments "To Expire (90 Days until Today)".
jn1Crt567Y[2] = 0;     // Count all Equipments "Valid (> 90 Days from Today)".


if (R.length > 0) {

    /* -------------------- *
     * Read all Equipments. *
     * -------------------- */
    for (var i = 0; i < R.length; i++) {

        if (R[i][2] < 0) {
            jn1Crt567Y[0] = jn1Crt567Y[0] + 1;   // Add to Expired counter.
        } else if (R[i][2] <= 90 && R[i][2] >= 0) {
            jn1Crt567Y[1] = jn1Crt567Y[1] + 1;   // Add to About to Expire counter.
        } else if (R[i][2] > 90) {
            jn1Crt567Y[2] = jn1Crt567Y[2] + 1;   // Add to Valid counter.
        }

        ++totcertCnt;
    }


    /* ----------------------------------------------------------------------------------------------------- *
     * Calculate percent of Equipments with Certification expired, about to expire and valid (for chart 16). *
     * ----------------------------------------------------------------------------------------------------- */
    pctXpCtCnt = Math.round((jn1Crt567Y[0] * 100) / totcertCnt);
    pctAbCtCnt = Math.round((jn1Crt567Y[1] * 100) / totcertCnt);
    pctVlCtCnt = Math.round((jn1Crt567Y[2] * 100) / totcertCnt);

    rbv_api.println("JSON1 Charts 5, 6, 7 ---> Total Equipments: " + totcertCnt);
    rbv_api.println("JSON1 Charts 5, 6, 7 ---> Expired: " + jn1Crt567Y[0]);
    rbv_api.println("JSON1 Charts 5, 6, 7 ---> About to Expire: " + jn1Crt567Y[1]);
    rbv_api.println("JSON1 Charts 5, 6, 7 ---> Valid: " + jn1Crt567Y[2]);
    rbv_api.println("JSON1 Charts 5, 6, 7 ---> Percent Equipments with Certifications expired: " + pctXpCtCnt);
    rbv_api.println("JSON1 Charts 5, 6, 7 ---> Percent Equipments with Certifications about to expire: " + pctAbCtCnt);
    rbv_api.println("JSON1 Charts 5, 6, 7 ---> Percent Equipments with Certifications valid: " + pctVlCtCnt);
}


/* ------------------------------------------------------------------------------------- *
 *                   COLLECT DATA FOR JSON1 - Chart 6 - NOT USED                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt6X = [];    // X axis
var jn1Crt6Y = [];    // Y axis


/* ------------------------------------------------------------------------------------- *
 *                   COLLECT DATA FOR JSON1 - Chart 7 - NOT USED                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt7X = [];    // X axis
var jn1Crt7Y = [];    // Y axis


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 8                          *
 * ------------------------------------------------------------------------------------- */
var jn1Crt8X = [];    // X axis
var jn1Crt8Y = [];    // Y axis


if (P.length > 0 && O.length > 0) {
    var totCalls = O[0][0];      // Total number of Call Outs created.
    var aprCalls = 0;            // Number of Call Outs with Status "Approved" (it is: ready to produce a new Job).
    var pctAppvd = 0.0;          // Percent of Call Outs with Status "Approved".
    var pctOthSt = 0.0;          // Percent of Call Outs with any other Status.


    rbv_api.println("JSON1 Chart8 ---> TOTAL Call Outs in existence: " + totCalls);

    /* ------------------- *
     * Read all Call Outs. *
     * ------------------- */
    for (var i = 0; i < P.length; i++) {
        rbv_api.println("JSON1 Chart8 ---> Call Outs's name: " + P[i][1] + ", Date Approval: " + P[i][2] + ", Status: " + P[i][3]);
        ++aprCalls;
    }

    pctAppvd = Math.round((aprCalls * 100) / totCalls);     // Calculate percent of Call Outs with Status "Approved" (but Job not jet created).

    pctOthSt = 100 - pctAppvd;                  // Calculate percent of Call Outs with any other Status.

    rbv_api.println("JSON1 Chart8 ---> TOTAL Call Outs with Status Approved: " + aprCalls + ", it is an " + pctAppvd + " percent");


    /* ----------------- *
     * Fill JSON stream. *
     * ----------------- */
    jn1Crt8X.push('"' + 'Live Call Outs (pending Job creation)' + '"');  // Cels [0] and [1] store percentage (for pie chart 8).
    jn1Crt8Y.push('"' + pctAppvd + '"');

    jn1Crt8X.push('"' + 'Call Outs with any other status' + '"');
    jn1Crt8Y.push('"' + pctOthSt + '"');

    jn1Crt8X.push('"' + 'Live Call Outs counter' + '"');                 // Cel [2] store Live Call Outs counter (for the Box).
    jn1Crt8Y.push('"' + aprCalls + '"');
}


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 9                          *
 * ------------------------------------------------------------------------------------- */
var jn1Crt9X = [];    // X axis
var jn1Crt9Y = [];    // Y axis


if (D.length > 0 && Q.length > 0) {
    var totJobs = Q[0][0];      // Total number of Jobs created.
    var nclsJob = 0;            // Number of Jobs with any status but "Closed".
    var pctClJb = 0.0;          // Percent of Jobs with Status "Closed".
    var pctOtSt = 0.0;          // Percent of Jobs with any other Status.


    rbv_api.println("JSON1 Chart8 ---> TOTAL Jobs in existence: " + totJobs);


    /* --------------------------------------------- *
     * Read all Jobs (with any Status but "Closed"). *
     * --------------------------------------------- */
    for (var i = 0; i < D.length; i++) {
        rbv_api.println("JSON1 Chart8 ---> Jobs's name: " + D[i][1] + ", Status: " + D[i][2]);
        ++nclsJob;
    }

    pctOtSt = Math.round((nclsJob * 100) / totJobs);     // Calculate percent of Jobs with any status but "Closed".

    pctClJb = 100 - pctOtSt;                  // Calculate percent of Jobs with status "Closed".

    rbv_api.println("JSON1 Chart8 ---> TOTAL Jobs with any status but Closed: "  + nclsJob + ", it is an " + pctOtSt + " percent");


    /* ----------------- *
     * Fill JSON stream. *
     * ----------------- */
    jn1Crt9X.push('"' + 'Jobs Status Closed' + '"');           // Cels [0] and [1] store percentage (for pie chart 9).
    jn1Crt9Y.push('"' + pctClJb + '"');

    jn1Crt9X.push('"' + 'Jobs with any other Status' + '"');
    jn1Crt9Y.push('"' + pctOtSt + '"');

    jn1Crt9X.push('"' + 'Jobs Closed counter' + '"');          // Cel [2] store Live Jobs counter (for the Box).
    jn1Crt9Y.push('"' + nclsJob + '"');
}


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 10                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt10X = [];    // X axis
var jn1Crt10Y = [];    // Y axis


if (S.length > 0) {
    var totMoc = S[0][0];      // Total number of MOCs created.

    jn1Crt10X.push('"' + 'SIMULj1c10X1' + '"');
    jn1Crt10Y.push('"' + totMoc + '"');
}


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 11                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt11X = [];    // X axis
var jn1Crt11Y = [];    // Y axis


if (T.length > 0) {
    var totRisk = T[0][0];      // Total number of RISKs created.

    jn1Crt11X.push('"' + 'SIMULj1c11X1' + '"');
    jn1Crt11Y.push('"' + totRisk + '"');
}


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 12                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt12X = [];    // X axis
var jn1Crt12Y = [];    // Y axis


if (U.length > 0) {
    var totCar = U[0][0];      // Total number of CAPA with CAR type created.

    jn1Crt12X.push('"' + 'SIMULj1c12X1' + '"');
    jn1Crt12Y.push('"' + totCar + '"');
}


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 13                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt13X = [];    // X axis
var jn1Crt13Y = [];    // Y axis


if (V.length > 0) {
    var totPar = V[0][0];      // Total number of CAPA with PAR type created.

    jn1Crt13X.push('"' + 'SIMULj1c13X1' + '"');
    jn1Crt13Y.push('"' + totPar + '"');
}


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 14                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt14X = [];    // X axis
var jn1Crt14Y = [];    // Y axis


if (W.length > 0) {
    var totAu = W[0][0];      // Total number of Audits with status "Closed".

    jn1Crt14X.push('"' + 'SIMULj1c14X1' + '"');
    jn1Crt14Y.push('"' + totAu + '"');
}


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 15                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt15X = [];    // X axis
var jn1Crt15Y = [];    // Y axis


jn1Crt15X.push('"' + 'Expired' + '"');
jn1Crt15Y.push('"' + pctXpClCnt + '"');

jn1Crt15X.push('"' + '<= 90 Days' + '"');
jn1Crt15Y.push('"' + pctAbClCnt + '"');

jn1Crt15X.push('"' + 'Valid (> 90 Days)' + '"');
jn1Crt15Y.push('"' + pctVlClCnt + '"');


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 16                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt16X = [];    // X axis
var jn1Crt16Y = [];    // Y axis


jn1Crt16X.push('"' + 'Expired' + '"');
jn1Crt16Y.push('"' + pctXpCtCnt + '"');

jn1Crt16X.push('"' + '<= 90 Days' + '"');
jn1Crt16Y.push('"' + pctAbCtCnt + '"');

jn1Crt16X.push('"' + 'Valid (> 90 Days)' + '"');
jn1Crt16Y.push('"' + pctVlCtCnt + '"');


/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 17                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt17X = [];    // X axis
var jn1Crt17Y = [];    // Y axis

/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 18                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt18X = [];    // X axis
var jn1Crt18Y = [];    // Y axis

/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 19                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt19X = [];    // X axis
var jn1Crt19Y = [];    // Y axis

/* ------------------------------------------------------------------------------------- *
 *                             COLLECT DATA FOR JSON1 - Chart 20                         *
 * ------------------------------------------------------------------------------------- */
var jn1Crt20X = [];    // X axis
var jn1Crt20Y = [];    // Y axis


/* ----------------- *
 * Bild JSON stream. *
 * ----------------- */
var json = '{"data":{"json1Chart1":{"x":[' + jn1Crt1X + '],"y":[' + jn1Crt1Y + ']}' + ',"json1Chart234":{"x":[' + jn1Crt234X + '],"y":[' + jn1Crt234Y + ']}' + ',"json1Chart3":{"x":[' + jn1Crt3X + '],"y":[' + jn1Crt3Y + ']}' + ',"json1Chart4":{"x":[' + jn1Crt4X + '],"y":[' + jn1Crt4Y + ']}' + ',"json1Chart567":{"x":[' + jn1Crt567X + '],"y":[' + jn1Crt567Y + ']}' + ',"json1Chart6":{"x":[' + jn1Crt6X + '],"y":[' + jn1Crt6Y + ']}' + ',"json1Chart7":{"x":[' + jn1Crt7X + '],"y":[' + jn1Crt7Y + ']}' + ',"json1Chart8":{"x":[' + jn1Crt8X + '],"y":[' + jn1Crt8Y + ']}' + ',"json1Chart9":{"x":[' + jn1Crt9X + '],"y":[' + jn1Crt9Y + ']}' + ',"json1Chart10":{"x":[' + jn1Crt10X + '],"y":[' + jn1Crt10Y + ']}' + ',"json1Chart11":{"x":[' + jn1Crt11X + '],"y":[' + jn1Crt11Y + ']}' + ',"json1Chart12":{"x":[' + jn1Crt12X + '],"y":[' + jn1Crt12Y + ']}' + ',"json1Chart13":{"x":[' + jn1Crt13X + '],"y":[' + jn1Crt13Y + ']}' + ',"json1Chart14":{"x":[' + jn1Crt14X + '],"y":[' + jn1Crt14Y + ']}' + ',"json1Chart15":{"x":[' + jn1Crt15X + '],"y":[' + jn1Crt15Y + ']}' + ',"json1Chart16":{"x":[' + jn1Crt16X + '],"y":[' + jn1Crt16Y + ']}' + ',"json1Chart17":{"x":[' + jn1Crt17X + '],"y":[' + jn1Crt17Y + ']}' + ',"json1Chart18":{"x":[' + jn1Crt18X + '],"y":[' + jn1Crt18Y + ']}' + ',"json1Chart19":{"x":[' + jn1Crt19X + '],"y":[' + jn1Crt19Y + ']}' + ',"json1Chart20":{"x":[' + jn1Crt20X + '],"y":[' + jn1Crt20Y + ']}}}';

rbv_api.setFieldValue("DummyTest", "{!id}", "json1", json);