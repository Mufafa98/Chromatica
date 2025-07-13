

export default function Header({
    defaultGenerator, 
    generators, 
    setGenerator,
    numOfColors,
    setNumOfColors,
}){
    const handleChange = (event) => {
            setGenerator(generators[event.target.value])
        }

    const handleNumOfColors = (event) => {
        setNumOfColors(event.target.value);
    }
    return (
        <>
        <select value={defaultGenerator} onChange={handleChange}>
            {
                Object.entries(generators).map(([key]) => {
                    return <option value={key} key={key}>{key}</option>
                })
            }
        </select>

        <input
            type="number"
            min={1}
            max={20}
            value={numOfColors}
            onChange={handleNumOfColors}
        />
        </>
    )
}