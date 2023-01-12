const formatSumFunc = (sum: string | number) => {
    const reversedSum = sum.toString().split('').reverse();

    for (let i = 0; i < reversedSum.length; i++) {
        if (i % 4 === 0) {
            reversedSum.splice(i, 0, ',');
        }
    }
    reversedSum.reverse().pop();

    const finalSum = reversedSum.join('');

    return finalSum;
};

export default formatSumFunc;
