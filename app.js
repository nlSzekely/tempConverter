let lastSelect1 = document.getElementById('select1').value
let lastSelect2 = document.getElementById('select2').value


let formula = document.getElementById('formula')

//preventing same temp type selection
const noSameSelect = function (eventId) {
    let selection1 = document.getElementById('select1').value
    let selection2 = document.getElementById('select2').value
    if (selection1 === selection2) {
        if (eventId === 'select1') {
            document.getElementById('select2').value = lastSelect1
            lastSelect1 = document.getElementById('select1').value
            lastSelect2 = document.getElementById('select2').value
        } else {
            document.getElementById('select1').value = lastSelect2
            lastSelect1 = document.getElementById('select1').value
            lastSelect2 = document.getElementById('select2').value
        }
    }
}
//converter object
const converter = {
    'c': (value) => {
        return {
            'f': {
                result: typeof value !== 'string' ? ((value * 9 / 5) + 32).toFixed(2).replace(/\.00$/, '') : '',
                formula: function () { if (value || value === 0) { return `(${value}°C × 9/5) + 32 = ${this.result}°F` } else { return `(°C × 9/5) + 32 = °F` } }
            },
            'k': {
                result: typeof value !== 'string' ? (value + 273.15).toFixed(2).replace(/\.00$/, '') : '',
                formula: function () { if (value || value === 0) { return `${value}°C + 273.15 = ${this.result}K` } else { return `°C + 273.15 = K` } }
            }
        }
    },

    'f': (value) => {
        return {
            'c': {
                result: typeof value !== 'string' ? ((value - 32) * 5 / 9).toFixed(2).replace(/\.00$/, '') : '',
                formula: function () { if (value || value === 0) { return `(${value}°F − 32) × 5/9 = ${this.result}°C` } else { return `(°F − 32) × 5/9 = °C` } }
            },
            'k': {
                result: typeof value !== 'string' ? ((value - 32) * 5 / 9 + 273.15).toFixed(2).replace(/\.00$/, '') : '',
                formula: function () { if (value || value === 0) { return `(${value}°F − 32) × 5/9 + 273.15 = ${this.result}°C` } else { return `(°F − 32) × 5/9 + 273.15 = °C` } }
            }
        }
    },

    'k': (value) => {
        return {
            'c': {
                result: typeof value !== 'string' ? (value - 273.15).toFixed(2).replace(/\.00$/, '') : '',
                formula: function () { if (value || value === 0) { return `${value}K − 273.15 = ${this.result}°C` } else { return `K − 273.15 = °C` } }
            },
            'f': {
                result: typeof value !== 'string' ? ((value - 273.15) * 9 / 5 + 32).toFixed(2).replace(/\.00$/, '') : '',
                formula: function () { if (value || value === 0) { return `(${value}K − 273.15) × 9/5 + 32 = ${this.result}°F` } else { return `(K − 273.15) × 9/5 + 32 = °F` } }
            }
        }
    },

}
//converter function
const coverterFunc = function (value, inputId) {
    if (inputId === 'input1') {
        let result1 = document.getElementById('input2')
        result1.value = converter[document.getElementById("select1").value](value)[document.getElementById("select2").value].result
        formula.textContent = converter[document.getElementById("select1").value](value)[document.getElementById("select2").value].formula()
    } else {
        let result2 = document.getElementById('input1')
        result2.value = converter[document.getElementById("select2").value](value)[document.getElementById("select1").value].result
        formula.textContent = converter[document.getElementById("select1").value](parseFloat(result2.value))[document.getElementById("select2").value].formula()
    }
}
window.onload = coverterFunc(0, 'input1')

//Event Listeners-------------------------------------------------------------------------------------------------------------
//Number inputs
document.querySelector('#input1').addEventListener('keyup', (e) => {
    coverterFunc(parseFloat(e.target.value), e.target.id)
})
document.querySelector('#input1').addEventListener('blur', (e) => {
    coverterFunc(parseFloat(e.target.value), e.target.id)
})


document.querySelector('#input2').addEventListener('keyup', (e) => {
    coverterFunc(parseFloat(e.target.value), e.target.id)
})

document.querySelector('#input1').addEventListener('change', (e) => {
    coverterFunc(parseFloat(e.target.value), e.target.id)
})
document.querySelector('#input2').addEventListener('change', (e) => {
    coverterFunc(parseFloat(e.target.value), e.target.id)
})




//Select inputs
document.querySelector('#select1').addEventListener('change', (e) => {
    noSameSelect(e.target.id)
    console.log(document.getElementById('input1').value)
    coverterFunc(parseFloat(document.getElementById('input1').value), 'input1')
})
document.querySelector('#select2').addEventListener('change', (e) => {
    noSameSelect(e.target.id)
    coverterFunc(parseFloat(document.getElementById('input1').value), 'input1')
})