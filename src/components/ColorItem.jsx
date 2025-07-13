
export default function ColorItem({index, colorsRef, windowWidth, windowHeight}) {
    const color = colorsRef[index].toString();
    
    const len = colorsRef.length;

    let width = windowWidth / len;
    let height = windowHeight;
    // if (width < 100)
    // {
    //     width = windowWidth;
    //     height = windowHeight / len;
    // }
    
    // TODO FA PRIN CSS RESPONSIVE
    

    return (
        <div style={{
            backgroundColor:color, 
            width:width,
            height:height,
            padding:0,
            margin:0
        }}>
            Test {index + 1}
        </div>
    )
}

