
const calcprice = (topNote, heartNote, baseNote, extraNote) => {
    let price = 20
    if (topNote === 'pinkPepper' || topNote === 'Bergamont') {price += 15}
    else {price += 10}

    if (heartNote === 'Peony'){ price += 20}
    else if (heartNote === 'Jasmin') {price += 15}
    else price += 10

    if (baseNote === 'Sandalwood'){ price += 50}
    else if (baseNote === 'Vanilla'){ price += 30}
    else{ price += 20}

    if (extraNote) {price += 15}
    return price
}

export default calcprice