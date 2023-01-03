import { createContext, useState } from "react";

export const ethPrice = createContext(0)

export default function ethValue(prop) {
    const [eth, setEth] = useState(0)

    return (
        <ethPrice.Provider value={{ eth, setEth }}>
            {prop.children}
        </ethPrice.Provider>
    )
}