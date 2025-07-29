const { nanoid } = require("nanoid");
const dayjs = require("dayjs");

let urlDatabase = {}; 
const createShortUrl = (req, res) => {
    try {
        const { url, validity, shortcode, email, name, rollNo, accessCode, clientID, clientSecret } = req.body;
        if (!url || !/^https?:\/\/.+/i.test(url)) {
            return res.status(400).json({ message: "Invalid URL format" });
        }

        let code = shortcode || nanoid(6);
        if (urlDatabase[code]) {
            return res.status(409).json({ message: "Shortcode already exists" });
        }

        const expiryTime = dayjs().add(validity ?? 30, "minute").toISOString();

        urlDatabase[code] = {
            originalUrl: url,
            createdAt: new Date().toISOString(),
            expiry: expiryTime,
            clicks: [],
            email,
            name,
            rollNo,
            accessCode,
            clientID,
            clientSecret
        };

        return res.status(201).json({
            shortLink: `http://localhost:5000/${code}`,
            expiry: expiryTime,
            email,
            name,
            rollNo,
            accessCode,
            clientID,
            clientSecret
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

const redirectUrl = (req, res) => {
    const { code } = req.params;
    const entry = urlDatabase[code];

    if (!entry) {
        return res.status(404).json({ message: "Shortcode not found" });
    }

    if (dayjs().isAfter(entry.expiry)) {
        return res.status(410).json({ message: "Link expired" });
    }

    entry.clicks.push({
        timestamp: new Date().toISOString(),
        source: req.get("Referer") || "direct",
        location: req.ip
    });

    return res.redirect(entry.originalUrl);
};

const getStats = (req, res) => {
    const { code } = req.params;
    const entry = urlDatabase[code];

    if (!entry) {
        return res.status(404).json({ message: "Shortcode not found" });
    }

    return res.status(200).json({
        originalUrl: entry.originalUrl,
        createdAt: entry.createdAt,
        expiry: entry.expiry,
        totalClicks: entry.clicks.length,
        clickDetails: entry.clicks,
        email: entry.email,
        name: entry.name,
        rollNo: entry.rollNo,
        accessCode: entry.accessCode,
        clientID: entry.clientID,
        clientSecret: entry.clientSecret
    });
};

module.exports = { createShortUrl, redirectUrl,