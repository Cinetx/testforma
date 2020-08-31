window.addEventListener('DOMContentLoaded', function() {
    'use strict'
let bordItem = document.querySelectorAll('.bord__style__list'),
    bordCheckbox = document.querySelector('.bord__checkbox'),
    materialFinal = document.querySelector('.final__material'),
    bordSubmit = document.querySelector('.bord__submit'),
    bordLength = document.querySelector('.bord__length__input'),
    bordHeight = document.querySelector('.bord__height__input'),
    totalSum = document.querySelectorAll('.total__summ__rub'),
    formBord = document.querySelector('.form__bord'),
    formPerson = document.querySelector('.form__person'),
    form = document.querySelector('form'),
    allInput = document.querySelectorAll('input'),
    finalSize = document.querySelectorAll('.person__final__size'),
    personName = document.querySelector('.person__name__input'),
    personMail = document.querySelector('.person__email__input'),
    personPhone = document.querySelector('.person__phone__input'),
    personSubmit = document.querySelector('.person__submit'),
    popUpName = document.querySelector('.pop-up__name'),
    popUpMail = document.querySelector('.pop-up__email'),
    popUpPhone = document.querySelector('.pop-up__phone'),
    backBtn = document.querySelector('.form__person__back'),
    popUpCloseBtn = document.querySelector('.pop-up__close'),
    popUp = document.querySelector('.pop-up'),
    meter = document.querySelectorAll('.meter')



const material = [
    {
        materialName : 'сетка',
        value : 200
    },
    {
        materialName : 'профнастил',
        value : 400
    },
    {
        materialName : 'модуль',
        value : 500
    },
    {
        materialName : 'бетон',
        value : 700
    }
]

// выпадающий список
bordItem.forEach((item) => {
    item.addEventListener('click', () => {
        bordItem.forEach((item) => {
            item.classList.toggle('bord__style__list--active');
            if (item.classList.contains('bord__style__list--select')) {
                item.classList.remove('bord__style__list--select')
            }
            if (item.value == 0) {
                item.remove()
            }
        })
        item.classList.add('bord__style__list--select')
        for (let key of material){
            if (item.value == key.value) {
                materialFinal.textContent = key.materialName;
            }
        }
        appData.result();
        
    });
});




allInput.forEach((input) => {

    input.addEventListener('input', () => {
        //изменение состояние после ввода данных в инпуты
        appData.addFinalSize(input)
        appData.validCheck();
        appData.result();   
        appData.popUpData();
        
        //склоненин метров после инпута
        meter.forEach((i) => {
            if (input.className == i.dataset.type) {
                i.textContent = appData.declOfNum(input.value)
            }
        })
        
        
    })


  
});

let appData = {
    // добавление финальной цены в зависимости от введенных данных
    addFinalSize : function(input){
            finalSize.forEach((size) => {
                if (input.className == 'bord__length__input' && size.dataset.type == 'bord__length__input') {
                    size.textContent = `длинной ${input.value} ${appData.declOfNum(input.value)}`
                } else if (input.className == 'bord__height__input' && size.dataset.type == 'bord__height__input') {
                    size.textContent = `высотой ${input.value} ${appData.declOfNum(input.value)}`
                }
            })
        
    },
//склонение метра
    declOfNum : function (n) {
        n = Math.abs(n) % 100; var n1 = n % 10;
        if (n > 10 && n < 20) { return 'метров'; }
        if (n1 > 1 && n1 < 5) { return 'метра'; }
        if (n1 == 1) { return 'метр'; }
        return 'метров';
    },

    //проверка на валидность инпутов
    validCheck : function(){
        // проверка на валидность длины, высоты и материала забора
        bordItem.forEach((item) => {
            if (item.classList.contains('bord__style__list--select')) {
                if(bordLength.validity.valid == true && 
                    bordLength.value != '0' &&
                    bordHeight.validity.valid == true &&
                    bordHeight.value != '0' &&
                    item.value > 0){
                    bordSubmit.removeAttribute('disabled');
                    
                    
                } else {
                    bordSubmit.setAttribute("disabled", "disabled");
                }
            }
        })

        // проверка на валидность имени, емейла и телефона
        if(personName.validity.valid == true && 
            personMail.validity.valid == true &&
            personPhone.validity.valid == true){
            personSubmit.removeAttribute('disabled');
    
        } else {
            personSubmit.setAttribute("disabled", "disabled");
        }
    },

    // вычесление суммы
    result: function () {
        bordItem.forEach((item) => {
            if (item.classList.contains('bord__style__list--select')) {
                totalSum.forEach((sum) => {
                    appData.validCheck();
                    if (bordCheckbox.checked) {
                        sum.textContent = `${bordLength.value * bordHeight.value * (item.value + 200)}₽`
                    } else {
                        sum.textContent = `${bordLength.value * bordHeight.value * item.value}₽`
                    }
                })
            }
            
        })
    },
    // вывод конечных данных пользователя в pop-up
    popUpData : function () {
            popUpName.textContent = personName.value;
            popUpMail.textContent = personMail.value;
            popUpPhone.textContent = personPhone.value
        
    }

};



//ввод данных в первую форму
bordSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    formBord.style.display = 'none'
    formPerson.style.display = 'block'
    
});


//кнопка возврата
backBtn.addEventListener('click', ()=>{
    formBord.style.display = ''
    formPerson.style.display = 'none'
});

//отправка формы
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    formPerson.style.display = 'none'
    popUp.style.display = 'flex'
    sendEmail();
    });

    //кнопка закрытия
popUpCloseBtn.addEventListener('click', ()=>{
    popUp.style.display = 'none'
})

function sendEmail(){
    Email.send({
        Host : "smtp.gmail.com",
        Username : "liderprodahtest@gmail.com",
        Password : "testovoe12345",
        To : personMail.value,
        From : "liderprodahtest@gmail.com",
        Subject : "тестовое задание, заказ забора №8675",
        Body : `${personName.value}, заказ №8675 сформирован. В ближайшее время наш специалист свяжется с вами по телефону ${personPhone.value}.`
    }).then(
      
    );
}


});

