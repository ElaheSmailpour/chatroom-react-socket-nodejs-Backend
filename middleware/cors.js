const corsHeader = (req, res, next) => {
    // Wir packen an die Antwort die Erlaubnis, von allen Adressen Anfragen zu stellen
    res.header("Access-Control-Allow-Origin", "*");
    // Access-Control-Allow-Headers steuert, welche Angaben gemacht werden dürfen
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, x-Requested-With, Content-Type, Accept"
    );

    // Und hiermit steuern wir die erlaubten Methoden
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    // Beispielsweise könnten wir nur lesende Operationen von überall erlauben
    // Während wir die schreibenden (POST/PUT/DELETE hier weglassen) um das nur  
    // von der eigenen Domain aus machen zu dürfen.
    next();
};

module.exports = corsHeader;