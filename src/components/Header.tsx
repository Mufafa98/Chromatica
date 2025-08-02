import type React from "react"
import "./Header.css"

interface HeaderInterface {
    toggleSettings: () => void
}

export default function Header({
    toggleSettings
}: HeaderInterface) {
    return (
        <header className="headerMenu">
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.currentTarget.blur()
                    toggleSettings()
                }}
            >Settings</button>
        </header>
    )
}