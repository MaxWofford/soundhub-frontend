function stepFilter(step) {
    step = step + 1;
    let beat = Math.ceil(step / 4);
    let tick = step % 4 || 4;
    return beat + '.' + tick;
}

export { stepFilter };