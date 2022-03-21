const tabsFunc = () => {
    const tabButtons = document.querySelectorAll('.design-list__item');
    const tabsDescriptions = document.querySelectorAll('.design__descr');
    const tabImages = document.querySelectorAll('.design-images');

    const changeContent = (array, value) => {
        array.forEach((elem) => {
            if (elem.dataset.tabsField == value) {
                elem.classList.remove('hidden');
            } else {
                elem.classList.add('hidden');
            }
        })
    }

    tabButtons.forEach((tabButton) => {
        tabButton.addEventListener('click', (event) => {
            const dataValue = tabButton.dataset.tabsHandler

            changeContent(tabsDescriptions, dataValue);
            changeContent(tabImages, dataValue);

            tabButtons.forEach((btn) => {
                if (btn === event.target) {
                    btn.classList.add('design-list__item_active');
                } else {
                    btn.classList.remove('design-list__item_active');
                }
            })
        })
    })
}
tabsFunc();

const modalFunc = () => {
    const modalButton = document.querySelector('.more');
    const modal = document.querySelector('.modal');
    const overlay = modal.querySelector('.overlay');
    const closeButton = modal.querySelector('.modal__close');

    modalButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    })

    overlay.addEventListener('click', (event) => {
        modal.classList.add('hidden');
    })

    closeButton.addEventListener('click', (event) => {
        modal.classList.add('hidden');
    })
}
modalFunc();

const burgerFunc = () => {
    const burger = document.querySelector('.humburger-menu');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu-list__item');

    burger.addEventListener('click', () => {
        menu.classList.add('menu-active');
    })

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('menu-active');
        })
    })

    document.addEventListener('click', (event) => {
        if (!(event.target.closest('.menu') || event.target.closest('.humburger-menu'))) {
            menu.classList.remove('menu-active');
        }
    })
}
burgerFunc();

const accordeonFunc = () => {
    const accordeon = document.querySelector('.feature-list');
    const accodeonButtons = document.querySelectorAll('.feature__link');

    accodeonButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            accodeonButtons.forEach(button => {
                button.classList.remove('feature__link_active');
                button.nextElementSibling.classList.add('hidden');
            })

            btn.classList.toggle('feature__link_active');
            btn.nextElementSibling.classList.toggle('hidden');
        })
    })
}
accordeonFunc();

const timerFunc = () => {
    const timerBlock = document.querySelector('.timer__time');
    const timerText = document.querySelector('.timer__text');
    
    //const deadline = '31 march 2022';

    const judgmentDay = new Date().getDate() + 2;
    const nonExistentDay = new Date(`${judgmentDay} march 2022`);  
    timerText.textContent = `ДО ${judgmentDay} ЧИСЛА СКИДКА 20% НА ВСЕ УСЛУГИ`;

    let interval;

    const updateClock = () => {
        const date = new Date().getTime();
        const dateDeadline = new Date(nonExistentDay).getTime();
        //const timeRemaining = (dateDeadline - date) / 1000;
        const timeRemaining = (nonExistentDay - date) / 1000;

        //const days = Math.floor(timeRemaining / 60 / 60 / 24);
        const hours = Math.floor(timeRemaining / 60 / 60);
        const minutes = Math.floor((timeRemaining / 60) % 60);
        const seconds = Math.floor(timeRemaining % 60);

        //const fDays = days < 10 ? '0' + days : days;
        const fHours = hours < 10 ? '0' + hours : hours;
        const fMinutes = minutes < 10 ? '0' + minutes : minutes;
        const fSeconds = seconds < 10 ? '0' + seconds : seconds;

        timerBlock.textContent = `${fHours}:${fMinutes}:${fSeconds}`;

        if (timeRemaining <= 0) {
            clearInterval(interval);
            timerBlock.textContent = `00:00:00`;
        }
    }

    interval = setInterval(updateClock, 500);
}
timerFunc();

const scrollFunc = () => {
    const links = document.querySelectorAll('.menu-list__link');
    const btn = document.querySelector('.main__button');

    const allLinks = [...links, btn];

    allLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const id = link.getAttribute('href').substring(1);

            const section = document.getElementById(id);

            if (section) {
                seamless.scrollIntoView(section, {
                    behavior: "smooth",
                    block: "center",
                    inline: "center",
                });
                // section.scrollIntoView({
                //     block: 'start',
                //     behavior: 'smooth'    
                // })
            }
        })
    })
}
scrollFunc();

const sendForm = () => {
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const body = {};

            formData.append('form', form.classList.value);

            formData.forEach((value, field) => {
                body[field] = value;
            })

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(response.status);
                    }
                })
                .then((json) => console.log(json))
                .catch((error) => {
                    console.error(error.message);
                })
                .finally(() => {
                    form.reset();
                })

        })
    })

}
sendForm();