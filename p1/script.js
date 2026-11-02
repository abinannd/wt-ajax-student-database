


document.addEventListener("DOMContentLoaded", function () {
    // DOM Element References
    var searchForm = document.getElementById("searchForm");
    var regnoInput = document.getElementById("regno");
    var searchBtn = document.getElementById("searchBtn");
    var btnText = document.getElementById("btnText");
    var clearBtn = document.getElementById("clearBtn");
    var loadingDiv = document.getElementById("loading");
    var messageDiv = document.getElementById("message");
    var resultSection = document.getElementById("result");

    // Result Fields (using textContent for secure DOM population)
    var resRegNo = document.getElementById("resRegNo");
    var resStdName = document.getElementById("resStdName");
    var resMark1 = document.getElementById("resMark1");
    var resMark2 = document.getElementById("resMark2");
    var resMark3 = document.getElementById("resMark3");
    var resTotal = document.getElementById("resTotal");
    var resAvg = document.getElementById("resAvg");

    // Quick-test chip buttons
    var chips = document.querySelectorAll(".chip");

    // Track active request state to prevent duplicate submissions
    var isRequestActive = false;

    /**
     * Show loading state
     */
    function showLoading() {
        isRequestActive = true;
        searchBtn.disabled = true;
        btnText.textContent = "Searching...";
        loadingDiv.classList.remove("hidden");
        messageDiv.classList.add("hidden");
        resultSection.classList.add("hidden");
    }

    /**
     * Hide loading state
     */
    function hideLoading() {
        isRequestActive = false;
        searchBtn.disabled = false;
        btnText.textContent = "Search Record";
        loadingDiv.classList.add("hidden");
    }

    /**
     * Display notification message (safe against XSS via textContent)
     * @param {string} text - Message text
     * @param {string} type - 'error', 'success', or 'info'
     */
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = "message-box " + type;
        messageDiv.classList.remove("hidden");
    }

    /**
     * Hide notification message
     */
    function hideMessage() {
        messageDiv.classList.add("hidden");
        messageDiv.textContent = "";
    }

    /**
     * Reset the entire form and result view
     */
    function resetView() {
        regnoInput.value = "";
        hideMessage();
        resultSection.classList.add("hidden");
        loadingDiv.classList.add("hidden");
        regnoInput.focus();
    }

    /**
     * Render student details safely into the DOM without innerHTML injection
     * @param {Object} student - Student record object
     */
    function renderStudentDetails(student) {
        // Safe DOM updates using textContent
        resRegNo.textContent = student.regno;
        resStdName.textContent = student.stdname;
        resMark1.textContent = student.mark1;
        resMark2.textContent = student.mark2;
        resMark3.textContent = student.mark3;

        // Calculate total and average
        var m1 = Number(student.mark1) || 0;
        var m2 = Number(student.mark2) || 0;
        var m3 = Number(student.mark3) || 0;
        var total = m1 + m2 + m3;
        var avg = (total / 3).toFixed(2);

        resTotal.textContent = total;
        resAvg.textContent = avg + "%";

        // Display results container
        resultSection.classList.remove("hidden");
    }

    /**
     * Fetch student record asynchronously using XMLHttpRequest
     * @param {string} regno - Student Register Number
     */
    function fetchStudentRecord(regno) {
        // Prevent concurrent duplicate requests
        if (isRequestActive) {
            return;
        }

        // Client-side validation: ensure register number is not empty
        var trimmedRegNo = regno.trim();
        if (trimmedRegNo === "") {
            showMessage("Please enter a valid Register Number.", "error");
            resultSection.classList.add("hidden");
            regnoInput.focus();
            return;
        }

        // Set UI to loading state
        showLoading();

        // 1. Create XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Target URL with properly URL-encoded query parameter
        var url = "db.php?regno=" + encodeURIComponent(trimmedRegNo);

        // 2. Configure request: GET method, target URL, and asynchronous flag set to true
        xhr.open("GET", url, true);

        // Optional request timeout (8 seconds)
        xhr.timeout = 8000;

        // 3. Monitor state transitions using onreadystatechange
        xhr.onreadystatechange = function () {
            // readyState 4 represents the operation is complete (DONE)
            if (xhr.readyState === 4) {
                hideLoading();

                // Check HTTP status code (200 OK)
                if (xhr.status === 200) {
                    try {
                        // Parse JSON response safely
                        var response = JSON.parse(xhr.responseText);

                        if (response.success && response.student) {
                            hideMessage();
                            renderStudentDetails(response.student);
                        } else {
                            resultSection.classList.add("hidden");
                            showMessage(response.message || "Student not found.", "error");
                        }
                    } catch (parseError) {
                        resultSection.classList.add("hidden");
                        showMessage("Error: Received invalid JSON response from server.", "error");
                    }
                } else if (xhr.status === 404) {
                    resultSection.classList.add("hidden");
                    showMessage("Error 404: The requested backend script (db.php) was not found.", "error");
                } else if (xhr.status === 500) {
                    resultSection.classList.add("hidden");
                    showMessage("Error 500: Internal server error occurred while querying database.", "error");
                } else {
                    resultSection.classList.add("hidden");
                    showMessage("Server error (HTTP Status: " + xhr.status + "). Please try again.", "error");
                }
            }
        };

        // 4. Handle Network Errors
        xhr.onerror = function () {
            hideLoading();
            resultSection.classList.add("hidden");
            showMessage("Network error: Failed to connect to server. Check Apache/network.", "error");
        };

        // 5. Handle Request Timeout
        xhr.ontimeout = function () {
            hideLoading();
            resultSection.classList.add("hidden");
            showMessage("Request timed out. The server took too long to respond.", "error");
        };

        // 6. Send the asynchronous request (null body for GET request)
        xhr.send(null);
    }

    // Event Listener: Form Submission (prevents full page reload)
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Crucial: prevents traditional browser form reload
        fetchStudentRecord(regnoInput.value);
    });

    // Event Listener: Clear Button
    clearBtn.addEventListener("click", function () {
        resetView();
    });

    // Event Listeners: Quick-test chip buttons
    chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            var targetRegNo = chip.getAttribute("data-regno");
            if (targetRegNo) {
                regnoInput.value = targetRegNo;
                fetchStudentRecord(targetRegNo);
            }
        });
    });
});
