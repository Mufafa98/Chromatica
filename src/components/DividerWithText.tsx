
import "./DividerWithText.css"


export default function DividerWithText({ text }: { text: string }) {
    return (
        <div className="divider-with-text">{text}</div>
    )
}