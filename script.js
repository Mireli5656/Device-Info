document.addEventListener("DOMContentLoaded", () => {
    updateDeviceInfo();

    const refreshBtn = document.getElementById("refreshBtn");

    if (refreshBtn) {
        refreshBtn.addEventListener("click", updateDeviceInfo);
    }

    window.addEventListener("online", updateNetworkInfo);
    window.addEventListener("offline", updateNetworkInfo);

    setInterval(updateTime, 1000);
});

/* =========================
   Main Update Function
========================= */

function updateDeviceInfo() {
    updateDevice();
    updateBrowser();
    updateDisplay();
    updateHardware();
    updateNetworkInfo();
    updatePrivacy();
    updateUserAgent();
    updateTime();
}

/* =========================
   Helper
========================= */

function setValue(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value ?? "Not available";
    }
}

function available(value) {
    return value !== undefined && value !== null && value !== "";
}

/* =========================
   Device
========================= */

function updateDevice() {
    const ua = navigator.userAgent.toLowerCase();

    let deviceType = "Desktop";

    if (/tablet|ipad|playbook|silk/i.test(ua)) {
        deviceType = "Tablet";
    } else if (/mobile|android|iphone|ipod/i.test(ua)) {
        deviceType = "Mobile";
    }

    setValue("deviceType", deviceType);
    setValue("os", detectOperatingSystem());

    const touchSupported =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

    setValue(
        "touchSupport",
        touchSupported
            ? `Yes (${navigator.maxTouchPoints || 1} points)`
            : "No"
    );
}

function detectOperatingSystem() {
    const ua = navigator.userAgent;

    if (/Windows NT 10.0/i.test(ua)) {
        return "Windows 10/11";
    }

    if (/Windows NT 6.3/i.test(ua)) {
        return "Windows 8.1";
    }

    if (/Windows NT 6.2/i.test(ua)) {
        return "Windows 8";
    }

    if (/Windows NT 6.1/i.test(ua)) {
        return "Windows 7";
    }

    if (/Android/i.test(ua)) {
        const match = ua.match(/Android\s([0-9.]+)/i);
        return match ? `Android ${match[1]}` : "Android";
    }

    if (/iPhone|iPad|iPod/i.test(ua)) {
        return "iOS";
    }

    if (/Mac OS X/i.test(ua)) {
        return "macOS";
    }

    if (/Linux/i.test(ua)) {
        return "Linux";
    }

    if (/CrOS/i.test(ua)) {
        return "ChromeOS";
    }

    return "Unknown";
}

/* =========================
   Browser
========================= */

function updateBrowser() {
    setValue("browser", detectBrowser());
    setValue("language", navigator.language || "Not available");

    setValue(
        "cookies",
        navigator.cookieEnabled ? "Enabled" : "Disabled"
    );

    let dnt = navigator.doNotTrack;

    if (dnt === "1" || dnt === "yes") {
        dnt = "Enabled";
    } else if (dnt === "0" || dnt === "no") {
        dnt = "Disabled";
    } else {
        dnt = "Not specified";
    }

    setValue("dnt", dnt);
}

function detectBrowser() {
    const ua = navigator.userAgent;

    if (/Edg\//i.test(ua)) {
        return "Microsoft Edge";
    }

    if (/OPR\//i.test(ua)) {
        return "Opera";
    }

    if (/SamsungBrowser\//i.test(ua)) {
        return "Samsung Internet";
    }

    if (/Firefox\//i.test(ua)) {
        return "Mozilla Firefox";
    }

    if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) {
        return "Google Chrome";
    }

    if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) {
        return "Safari";
    }

    return "Unknown";
}

/* =========================
   Display
========================= */

function updateDisplay() {
    setValue(
        "screenResolution",
        `${screen.width} × ${screen.height}`
    );

    setValue(
        "availableScreen",
        `${screen.availWidth} × ${screen.availHeight}`
    );

    setValue(
        "pixelRatio",
        window.devicePixelRatio || 1
    );

    setValue(
        "windowSize",
        `${window.innerWidth} × ${window.innerHeight}`
    );
}

/* =========================
   Hardware
========================= */

function updateHardware() {
    setValue(
        "cpuCores",
        available(navigator.hardwareConcurrency)
            ? navigator.hardwareConcurrency
            : "Not available"
    );

    setValue(
        "deviceMemory",
        available(navigator.deviceMemory)
            ? `${navigator.deviceMemory} GB`
            : "Not available"
    );

    setValue(
        "maxTouchPoints",
        available(navigator.maxTouchPoints)
            ? navigator.maxTouchPoints
            : 0
    );
}

/* =========================
   Network
========================= */

function updateNetworkInfo() {
    setValue(
        "networkStatus",
        navigator.onLine ? "Online" : "Offline"
    );

    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

    if (!connection) {
        setValue("connectionType", "Not available");
        setValue("effectiveType", "Not available");
        setValue("rtt", "Not available");
        setValue("downlink", "Not available");
        return;
    }

    setValue(
        "connectionType",
        available(connection.type)
            ? connection.type
            : "Not available"
    );

    setValue(
        "effectiveType",
        available(connection.effectiveType)
            ? connection.effectiveType
            : "Not available"
    );

    setValue(
        "rtt",
        available(connection.rtt)
            ? `${connection.rtt} ms`
            : "Not available"
    );

    setValue(
        "downlink",
        available(connection.downlink)
            ? `${connection.downlink} Mbps`
            : "Not available"
    );
}

/* =========================
   Privacy
========================= */

function updatePrivacy() {
    let timezone = "Not available";

    try {
        timezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone ||
            "Not available";
    } catch {
        timezone = "Not available";
    }

    setValue("timezone", timezone);

    setValue(
        "online",
        navigator.onLine ? "Yes" : "No"
    );
}

/* =========================
   User Agent
========================= */

function updateUserAgent() {
    setValue(
        "userAgent",
        navigator.userAgent || "Not available"
    );
}

/* =========================
   Local Time
========================= */

function updateTime() {
    const now = new Date();

    setValue(
        "localTime",
        now.toLocaleString()
    );
      }
