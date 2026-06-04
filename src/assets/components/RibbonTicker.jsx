import { motion } from "framer-motion";

export default function RibbonTicker(){
    const blends = [
        "Jamaican Blue Mountain"
        "Yirgacheffe",
        "Tanzania Peaberry",
        "Panama Geisha",
        "Vietnamese Robusta",
        "Brazilian Santos",
        "Costa Rica Tarrazu",
        "Guatemala Antigua",
        "Kenya AA",
        "Sumatra Mandheling",
        "Kona",
        "Columbian Supremo",
        "Ethiopian Harrar",
        "Arabian Mocha",
        "Red Sulawesi"
    ];

    const items = [...blends, ...blends];

    return (
        <div className="ribbon-ticker-container">
            <div className="ribbon-ticker">
                <div className="ribbon-track">
                {items.map((name, i) => (
                    <motion.span
                        key={i}
                        className="ribbon-item"
                        whileHover={{ scale: 1.1, color: "#f0b955" }}
                        transition={{ type: "spring, stifness: 300" }}>
                        {name} <span className="ribbon-dot">✦</span>

                    </motion.span>
                ))}

                </div>

            </div>

        </div>
    );
}