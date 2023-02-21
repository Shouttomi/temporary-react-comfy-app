export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:'USD'
    }).format(number/100)
   // console.log(newNumber);
    return newNumber
}

export const getUniqueValues = (data,type) => {
   
    let unique = data.map((item)=> item[type])
    console.log(unique)

    if(type === 'colors'){
        unique = unique.flat();
    }
    //to take out only unique values
    console.log(new Set(unique))

    return ['all',...new Set(unique)]
}
