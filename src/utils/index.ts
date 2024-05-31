export  const currencyFormat = (data: number) => {
    return data.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

};

