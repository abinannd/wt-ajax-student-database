
document.addEventListener("DOMContentLoaded", function () {
    // --- Mouse Event Elements ---
    var box = document.getElementById("box");
    var mouseMessage = document.getElementById("message");
    var mouseEventTypeTag = document.getElementById("mouseEventTypeTag");
    var mouseClickCounter = document.getElementById("mouseClickCounter");

    // --- Keyboard Event Elements ---
    var keyInput = document.getElementById("keyInput");
    var keyMessage = document.getElementById("keyMessage");
    var clearInputBtn = document.getElementById("clearInputBtn");
    var activeKeyCap = document.getElementById("activeKeyCap");
    var activeKeyName = document.getElementById("activeKeyName");
    var activeKeyCode = document.getElementById("activeKeyCode");
    var activeKeyEventType = document.getElementById("activeKeyEventType");

    // --- Live Event Monitor Elements ---
    var eventFeed = document.getElementById("eventFeed");
    var emptyFeedState = document.getElementById("emptyFeedState");
    var feedCountBadge = document.getElementById("feedCountBadge");
    var clearFeedBtn = document.getElementById("clearFeedBtn");

    // --- State Variables ---
    var clickCount = 0;
    var totalLoggedEvents = 0;
    var MAX_FEED_ITEMS = 10;

    /**
     * Format current timestamp as HH:MM:SS.mmm
     * @returns {string} Formatted timestamp
     */
    function getTimestamp() {
        var now = new Date();
        var h = String(now.getHours()).padStart(2, "0");
        var m = String(now.getMinutes()).padStart(2, "0");
        var s = String(now.getSeconds()).padStart(2, "0");
        var ms = String(now.getMilliseconds()).padStart(3, "0");
        return h + ":" + m + ":" + s + "." + ms;
    }

    /**
     * Log an event entry to the live event log
     * @param {string} category - 'Mouse' or 'Keyboard'
     * @param {string} eventName - e.g., 'mouseover', 'click', 'keydown'
     * @param {string} detail - Contextual detail
     */
    function logEvent(category, eventName, detail) {
        if (!eventFeed) return;

        totalLoggedEvents++;
        if (feedCountBadge) {
            feedCountBadge.textContent = totalLoggedEvents + " event" + (totalLoggedEvents === 1 ? "" : "s");
        }

        // Remove empty state message if present
        if (emptyFeedState && emptyFeedState.parentNode) {
            emptyFeedState.remove();
        }

        // Create feed list item safely
        var li = document.createElement("li");
        li.className = "feed-item";

        var leftDiv = document.createElement("div");
        leftDiv.className = "feed-left";

        var badge = document.createElement("span");
        badge.className = "feed-badge";
        badge.textContent = category;

        var nameSpan = document.createElement("span");
        nameSpan.className = "feed-name";
        nameSpan.textContent = eventName;

        var descSpan = document.createElement("span");
        descSpan.className = "feed-desc";
        descSpan.textContent = detail ? "— " + detail : "";

        leftDiv.appendChild(badge);
        leftDiv.appendChild(nameSpan);
        if (detail) {
            leftDiv.appendChild(descSpan);
        }

        var timeSpan = document.createElement("span");
        timeSpan.className = "feed-time";
        timeSpan.textContent = getTimestamp();

        li.appendChild(leftDiv);
        li.appendChild(timeSpan);

        // Prepend new item
        eventFeed.insertBefore(li, eventFeed.firstChild);

        // Cap at MAX_FEED_ITEMS
        while (eventFeed.children.length > MAX_FEED_ITEMS) {
            eventFeed.removeChild(eventFeed.lastChild);
        }
    }

    // =========================================================================
    // MOUSE EVENT HANDLERS
    // =========================================================================

    function handleMouseOver() {
        mouseMessage.textContent = "Mouse Over Event Occurred";
        mouseMessage.classList.add("highlight");
        if (mouseEventTypeTag) mouseEventTypeTag.textContent = "mouseover";
        logEvent("Mouse", "mouseover", "Entered box");
    }

    function handleMouseOut() {
        mouseMessage.textContent = "Mouse Out Event Occurred";
        mouseMessage.classList.remove("highlight");
        if (mouseEventTypeTag) mouseEventTypeTag.textContent = "mouseout";
        logEvent("Mouse", "mouseout", "Left box");
    }

    function handleMouseClick() {
        clickCount++;
        mouseMessage.textContent = "Mouse Click Event Occurred";
        mouseMessage.classList.add("highlight");
        if (mouseEventTypeTag) mouseEventTypeTag.textContent = "click";
        if (mouseClickCounter) mouseClickCounter.textContent = "Clicks: " + clickCount;

        // Visual click feedback
        box.classList.add("clicked-active");
        setTimeout(function () {
            box.classList.remove("clicked-active");
        }, 150);

        logEvent("Mouse", "click", "Click #" + clickCount);
    }

    // Attach Mouse Listeners
    if (box) {
        box.addEventListener("mouseover", handleMouseOver);
        box.addEventListener("mouseout", handleMouseOut);
        box.addEventListener("click", handleMouseClick);
    }

    // =========================================================================
    // KEYBOARD EVENT HANDLERS
    // =========================================================================

    function formatKeyDisplay(key) {
        if (!key) return "—";
        if (key === " ") return "Space";
        if (key.length === 1) return key.toUpperCase();
        return key;
    }

    function handleKeyDown(e) {
        keyMessage.textContent = "Keyboard Key Pressed";
        keyMessage.classList.add("highlight");

        if (activeKeyCap) {
            activeKeyCap.textContent = formatKeyDisplay(e.key);
            activeKeyCap.classList.add("pressed");
        }
        if (activeKeyName) activeKeyName.textContent = e.key === " " ? "Space" : e.key;
        if (activeKeyCode) activeKeyCode.textContent = e.code || String(e.keyCode);
        if (activeKeyEventType) activeKeyEventType.textContent = "keydown";

        logEvent("Keyboard", "keydown", "Key: \"" + (e.key === " " ? "Space" : e.key) + "\"");
    }

    function handleKeyUp(e) {
        keyMessage.textContent = "Keyboard Key Released";
        keyMessage.classList.remove("highlight");

        if (activeKeyCap) {
            activeKeyCap.classList.remove("pressed");
        }
        if (activeKeyEventType) activeKeyEventType.textContent = "keyup";

        logEvent("Keyboard", "keyup", "Key: \"" + (e.key === " " ? "Space" : e.key) + "\" released");
    }

    // Attach Keyboard Listeners
    if (keyInput) {
        keyInput.addEventListener("keydown", handleKeyDown);
        keyInput.addEventListener("keyup", handleKeyUp);
    }

    // Clear input field button handler
    if (clearInputBtn && keyInput) {
        clearInputBtn.addEventListener("click", function () {
            keyInput.value = "";
            keyInput.focus();
            keyMessage.textContent = "Keyboard Event Message";
            keyMessage.classList.remove("highlight");
            if (activeKeyCap) {
                activeKeyCap.textContent = "—";
                activeKeyCap.classList.remove("pressed");
            }
            if (activeKeyName) activeKeyName.textContent = "None";
            if (activeKeyCode) activeKeyCode.textContent = "None";
            if (activeKeyEventType) activeKeyEventType.textContent = "Idle";
        });
    }

    // =========================================================================
    // LIVE EVENT FEED CONTROLS
    // =========================================================================

    if (clearFeedBtn && eventFeed) {
        clearFeedBtn.addEventListener("click", function () {
            while (eventFeed.firstChild) {
                eventFeed.removeChild(eventFeed.firstChild);
            }
            if (emptyFeedState) {
                eventFeed.appendChild(emptyFeedState);
            }
            totalLoggedEvents = 0;
            if (feedCountBadge) {
                feedCountBadge.textContent = "0 events";
            }
        });
    }
});
