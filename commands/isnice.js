//const groupedNumbers = {};
function isnice(number){
    const str_number = number.toString();
    let percentage = 0;

    const divider_weight = 10;
    const dividers = [2, 3, 5, 15, 25, 50, 100, 500, 1000, 10000, 100000];
    dividers.forEach(num => {
        if (number > 1 && number % num == 0) percentage += divider_weight;
    });

    const negative_divider_weight = -7;
    const negative_dividers = [7, 13];
    negative_dividers.forEach(num => {
        if (number > 1 && number % num == 0) percentage += negative_divider_weight;
    });

    const unlucky_weight = -100;
    if (number == 7 || number == 13) percentage += unlucky_weight;

    const lucky_weight = 33;
    if (number == 777) percentage += lucky_weight;

    const consecutive_weight = 75;
    if (number >= 123) {
        let consecutive = true;
        for (let i = 1; i < str_number.length; i++) {
            const diff = str_number[i] - str_number[i - 1];
            if (diff !== 1) {
                consecutive = false;
                break;
            }
        }
        if (consecutive) percentage += consecutive_weight;

        consecutive = true;
        for (let i = 1; i < str_number.length; i++) {
            const diff = str_number[i] - str_number[i - 1];
            if (diff !== -1) {
                consecutive = false;
                break;
            }
        }
        if (consecutive) percentage += consecutive_weight;
    }

    const prime_weight = 17;
    if (number > 2) {
        let is_prime = true;
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                is_prime = false;
                break;
            }
        }
        if (is_prime) percentage += prime_weight;
    }

    const palindrome_weight = 42;
    if (number >= 101) {
        if (str_number === str_number.split('').reverse().join('')) percentage += palindrome_weight;
    }

    const binary_palindrome_weight = 27;
    if (number >= 9) {
        const binaryRepresentation = number.toString(2);
        if (binaryRepresentation == binaryRepresentation.split('').reverse().join('')) {
            percentage += binary_palindrome_weight;
        }
    }

    const power_of_two_weight = 41;
    if (number > 1 && !(number & (number - 1))) percentage += power_of_two_weight;

    const perfect_square_weight = 9;
    if (number > 1 && Math.sqrt(number) % 1 == 0) percentage += perfect_square_weight;

    const perfect_cube_bonus_weight = 27;
    if (number > 1 && Math.cbrt(number) % 1 === 0) percentage += perfect_cube_bonus_weight;

    const chaos_weight = -14;
    if (number > 99) {
        const digitArray = str_number.split('').map(Number);
        if (digitArray.some((digit, index, array) => index > 0 && Math.abs(digit - array[index - 1]) >= 3)) {
            percentage += chaos_weight;
        }
    }

    percentage = Math.max(0, Math.min(percentage, 100));

    if (number == 420 || number == 420420) percentage = 420;
    if (number == 666 || number == 666666) percentage = 666;
    if (number == 911) percentage = 911;
    if (number == 69 || number == 6969 || number == 696969) percentage = 69;
    if (number == 4515) percentage = 4515;

    // if (!(percentage in groupedNumbers)) {
    //     groupedNumbers[percentage] = [];
    // }
    
    // groupedNumbers[percentage].push(number);

    return percentage;
}

module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.channel.send("Bohužel jsi jenom zmáčkl enter.");

    const number = parseInt(args[0]);

	if(isNaN(number)) {
        for (let i = 0; i < args[0].length; i++) {
            if (!isNaN(parseInt(args[0][i]))) {
              return message.channel.send("Pokrok, už tam je číslo.");
            }
        }
        return message.channel.send("Bohužel tohle není číslo.");
    }

    if(number>1000000) return message.channel.send(`Pokud chceš vědět, jestli je číslo ${number} nice, tak musíš zakoupit DLC "1M+" za cenu 1000000 Kč.`);
    if(number<0) return message.channel.send(`Pokud chceš vědět, jestli je číslo ${number} nice, tak musíš zakoupit DLC "<0" za cenu 1000000 Kč.`);

    const percentage = isnice(number);

    // for (let a=0; a<=1000000; a++) isnice(a);
    // for (const percentage_debug in groupedNumbers) {
    //     const numbers = groupedNumbers[percentage_debug];
    //     //console.log(`Čísla ${numbers.join(', ')} jsou ${percentage_debug}% nice.`);
    //     console.log(`${numbers.length} čísel je ${percentage_debug}% nice.`);
    //     if (percentage_debug > 89) console.log(`Čísla ${numbers.join(', ')} jsou ${percentage_debug}% nice.`);
    // }

    return message.channel.send(`Číslo ${number} je ${percentage}% nice.`)
}

module.exports.config = {
    name: "isnice",
    aliases: []
}