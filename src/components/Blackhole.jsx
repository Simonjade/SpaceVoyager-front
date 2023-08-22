import { useEffect } from "react";
import blackhole from "./Black"

import "./style.scss"

export default function Blackhole() {
    useEffect(() => {
        blackhole("blackhole");
    }, []); // Utilisation du tableau de dépendances vide pour exécuter le code uniquement une fois après le montage initial

    return (
        <div id="blackhole" className="blackhole">
            <div className="centerHover"><span>ENTER</span></div>
        </div>
    );
}