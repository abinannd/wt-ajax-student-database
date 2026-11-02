/**
 * Program 2: JavaScript Event Handling
 * Client-Side Controller (script.js)
 * 
 * Demonstrates native browser event handling:
 * - Mouse events: mouseover, mouseout, click
 * - Keyboard events: keydown, keyup
 * Real-time event monitor and telemetry dashboard.
 */

document.addEventListener("DOMContentLoaded", function () {
    // --- DOM Elements: Mouse Interaction ---
    var box = document.getElementById("box");
    var mouseMessage = document.getElementById("message");
    var mouseEventTypeTag = document.getElementById("mouseEventTypeTag");
    var mouseClickCounter = document.getElementById("mouseClickCounter");
    var clickRipple = document.getElementById("clickRipple");

    // --- DOM Elements: Keyboard Interaction ---
    var keyInput = document.getElementById("keyInput");
    var keyMessage = document.getElementById("keyMessage");
    var clearInputBtn = document.getElementById("clearInputBtn");
    var activeKeyCap = document.getElementById("activeKeyCap");
    var activeKeyName = document.getElementById("activeKeyName");
    var activeKeyCode = document.getElementById("activeKeyCode");
    var activeKeyEventType = document.getElementById("activeKeyEventType");

   

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
     * Log an event entry to the live event feed
     * @param {string} category - 'Mouse' or 'Keyboard'
     * @param {string} eventName - e.g., 'mouseover', 'click', 'keydown'
     * @param {string} detail - Contextual detail (e.g. key name or action)
     */
    function logEvent(category, eventName, detail) {
        totalLoggedEvents++;
        feedCountBadge.textContent = totalLoggedEvents + " event" + (totalLoggedEvents === 1 ? "" : "s");

        // Remove empty state message if present
        if (emptyFeedState && emptyFeedState.parentNode) {
            emptyFeedState.remove();
        }

        // Create feed item using safe DOM construction (no innerHTML)
        var li = document.createElement("li");
        li.className = "feed-item";

        var leftDiv = document.createElement("div");
        leftDiv.className = "feed-left";

        var badge = document.createElement("span");
        badge.className = "feed-category-badge " + (category === "Mouse" ? "feed-category-mouse" : "feed-category-keyboard");
        badge.textContent = category;

        var nameSpan = document.createElement("span");
        nameSpan.className = "feed-event-name";
        nameSpan.textContent = eventName;

        var descSpan = document.createElement("span");
        descSpan.className = "feed-event-desc";
        descSpan.textContent = detail ? "· " + detail : "";

        leftDiv.appendChild(badge);
        leftDiv.appendChild(nameSpan);
        if (detail) {
            leftDiv.appendChild(descSpan);
        }

        var timeSpan = document.createElement("span");
        timeSpan.className = "feed-timestamp";
        timeSpan.textContent = getTimestamp();

        li.appendChild(leftDiv);
        li.appendChild(timeSpan);

        // Prepend new item to the top of the feed
        eventFeed.insertBefore(li, eventFeed.firstChild);

        // Limit feed entries to latest MAX_FEED_ITEMS
        while (eventFeed.children.length > MAX_FEED_ITEMS) {
            eventFeed.removeChild(eventFeed.lastChild);
        }
    }

    // =========================================================================
    // MOUSE EVENT HANDLERS
    // Preserves original assignment messages:
    // - "Mouse Over Event Occurred"
    // - "Mouse Out Event Occurred"
    // - "Mouse Click Event Occurred"
    // =========================================================================

    /**
     * Mouse Over Event
     */
    function handleMouseOver() {
        mouseMessage.textContent = "Mouse Over Event Occurred";
        mouseMessage.classList.add("highlight-crimson");
        mouseEventTypeTag.textContent = "mouseover";
        logEvent("Mouse", "mouseover", "Pointer entered test area");
    }

    /**
     * Mouse Out Event
     */
    function handleMouseOut() {
        mouseMessage.textContent = "Mouse Out Event Occurred";
        mouseMessage.classList.remove("highlight-crimson");
        mouseEventTypeTag.textContent = "mouseout";
        logEvent("Mouse", "mouseout", "Pointer left test area");
    }

    /**
     * Mouse Click Event
     * @param {MouseEvent} e - Mouse event object
     */
    function handleMouseClick(e) {
        clickCount++;
        mouseMessage.textContent = "Mouse Click Event Occurred";
        mouseMessage.classList.add("highlight-crimson");
        mouseEventTypeTag.textContent = "click";
        mouseClickCounter.textContent = "Clicks: " + clickCount;

        // Visual click active effect on the interactive box
        box.classList.add("clicked-active");
        setTimeout(function () {
            box.classList.remove("clicked-active");
        }, 180);

        // Trigger dynamic ripple animation at pointer location
        if (e && e.clientX && e.clientY) {
            var rect = box.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            clickRipple.style.left = x + "px";
            clickRipple.style.top = y + "px";
            clickRipple.classList.remove("animate");
            // Force DOM reflow to restart animation
            void clickRipple.offsetWidth;
            clickRipple.classList.add("animate");
        }

        logEvent("Mouse", "click", "Click #" + clickCount + " inside box");
    }

    // Attach Mouse Event Listeners
    box.addEventListener("mouseover", handleMouseOver);
    box.addEventListener("mouseout", handleMouseOut);
    box.addEventListener("click", handleMouseClick);

    // =========================================================================
    // KEYBOARD EVENT HANDLERS
    // Preserves original assignment messages:
    // - "Keyboard Key Pressed"
    // - "Keyboard Key Released"
    // =========================================================================

    /**
     * Format key display label
     * @param {string} key - Raw event.key
     * @returns {string} Clean user-facing label
     */
    function formatKeyDisplay(key) {
        if (!key) return "—";
        if (key === " ") return "Space";
        if (key.length === 1) return key.toUpperCase();
        return key;
    }

    /**
     * Keyboard Key Down Event
     * @param {KeyboardEvent} e - Keyboard event object
     */
    function handleKeyDown(e) {
        keyMessage.textContent = "Keyboard Key Pressed";
        keyMessage.classList.add("highlight-crimson");

        // Update telemetry values safely
        activeKeyCap.textContent = formatKeyDisplay(e.key);
        activeKeyCap.classList.add("pressed");
        activeKeyName.textContent = e.key === " " ? "Space" : e.key;
        activeKeyCode.textContent = e.code || String(e.keyCode);
        activeKeyEventType.textContent = "keydown";

        logEvent("Keyboard", "keydown", "Key: \"" + (e.key === " " ? "Space" : e.key) + "\" (" + (e.code || e.keyCode) + ")");
    }

    /**
     * Keyboard Key Up Event
     * @param {KeyboardEvent} e - Keyboard event object
     */
    function handleKeyUp(e) {
        keyMessage.textContent = "Keyboard Key Released";
        keyMessage.classList.remove("highlight-crimson");

        activeKeyCap.classList.remove("pressed");
        activeKeyEventType.textContent = "keyup";

        logEvent("Keyboard", "keyup", "Key: \"" + (e.key === " " ? "Space" : e.key) + "\" released");
    }

    // Attach Keyboard Event Listeners
    keyInput.addEventListener("keydown", handleKeyDown);
    keyInput.addEventListener("keyup", handleKeyUp);

    // Clear input field button handler
    clearInputBtn.addEventListener("click", function () {
        keyInput.value = "";
        keyInput.focus();
        keyMessage.textContent = "Awaiting keyboard input...";
        keyMessage.classList.remove("highlight-crimson");
        activeKeyCap.textContent = "—";
        activeKeyCap.classList.remove("pressed");
        activeKeyName.textContent = "None";
        activeKeyCode.textContent = "None";
        activeKeyEventType.textContent = "Idle";
    });

    // =========================================================================
    // LIVE EVENT FEED CONTROLS
    // =========================================================================

    /**
     * Clear all recorded events from the feed
     */
    function clearEventFeed() {
        while (eventFeed.firstChild) {
            eventFeed.removeChild(eventFeed.firstChild);
        }
        eventFeed.appendChild(emptyFeedState);
        totalLoggedEvents = 0;
        feedCountBadge.textContent = "0 events";
    }

    clearFeedBtn.addEventListener("click", clearEventFeed);
});
