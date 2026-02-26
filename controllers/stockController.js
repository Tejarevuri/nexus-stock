const axios = require("axios");

// Get latest stock quote using Stooq public CSV endpoint.
exports.getQuote = async (req, res) => {
  try {
    const symbol = (req.params.symbol || "").trim().toUpperCase();

    if (!symbol) {
      return res.status(400).json({ message: "Stock symbol is required" });
    }

    // Stooq uses the .US suffix for US tickers.
    const stooqSymbol = `${symbol}.US`;
    const url = `https://stooq.com/q/l/?s=${encodeURIComponent(stooqSymbol)}&i=d`;

    const { data } = await axios.get(url, { responseType: "text" });
    const line = String(data || "").trim();

    if (!line || !line.includes(",")) {
      return res.status(404).json({ message: "Symbol not found" });
    }

    // Format: SYMBOL,DATE,TIME,OPEN,HIGH,LOW,CLOSE,VOLUME,
    const parts = line.split(",");
    if (parts.length < 8 || parts[3] === "N/D" || parts[6] === "N/D") {
      return res.status(404).json({ message: "Symbol not found" });
    }

    const open = Number(parts[3]);
    const close = Number(parts[6]);
    const volume = Number(parts[7]);

    if (!Number.isFinite(close)) {
      return res.status(404).json({ message: "Symbol not found" });
    }

    res.json({
      symbol,
      price: close,
      change: Number.isFinite(open) ? Number((close - open).toFixed(2)) : 0,
      volume: Number.isFinite(volume) ? volume : 0,
    });
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.status(500).json({ message: "Failed to fetch stock quote", error: error.message });
  }
};
