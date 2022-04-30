// Selectors

const clearAll = document.querySelector('.clear-btn');

const quantInput = document.querySelector('.item-input .quant'); 
const itemInput = document.querySelector('.item-input .prod');

const quantModalInput = document.querySelector('.quant-modal');
const priceModalInput = document.querySelector('.price-modal');

const filters = document.querySelectorAll('.filters span');

const itemBox = document.querySelector('.item-box');

const result = document.querySelector('#result');

//  Events

clearAll.addEventListener('click', () => {
    itens.splice(0, itens.length);
    localStorage.setItem('item-list', JSON.stringify(itens));
    showItem('all');
    showTotal();
})

itemInput.addEventListener('keyup', e => {
    let userItem = itemInput.value.trim();
    let userQuant = quantInput.value.trim();
    if(e.key == 'Enter' && userItem){
        if(userQuant >= 0){
            //console.log(userItem);
            if(!itens){
                itens = [];
            }
            itemInput.value = '';
            quantInput.value = '';
        
            let itemInfo = {name: userItem, un: userQuant, status:'pending', price: 0.00};
            itens.push(itemInfo);
            localStorage.setItem('item-list', JSON.stringify(itens));
            showItem('all');
            showTotal();
        }else{
            alert ('Invalid quantity!')
        }
    }
});

//  Ester eggs

const hamburguer = document.getElementById('hamburguer');
const exitBtn = document.getElementById('exit-menu');
const settingsBtn = document.getElementById('settings-menu');

hamburguer.addEventListener('click', () => {
    alert(' *SHOW BEAUTIFUL MENU* ');
    alert(' Sorry this is not finished yet! Try later.');
})

exitBtn.addEventListener('click', () => {
    alert('We can\'t let you exit!');
});

settingsBtn.addEventListener('click', () => {
    alert('This is not ready... We are working on it! ;)');
});


//  Color Modes

const lightMode = document.querySelector('#light-mode')
const darkMode = document.querySelector('#dark-mode');

darkMode.addEventListener('click', () => {
    //console.log('dm');
    
    darkMode.classList.add('active-mode');
    lightMode.classList.remove('active-mode');
    document.body.classList.add('dark-mode-changed');

    colorMode = localStorage.setItem('color', 'dark');

});

lightMode.addEventListener('click', () => {
    
    lightMode.classList.add('active-mode');
    darkMode.classList.remove('active-mode');
    document.body.classList.remove('dark-mode-changed');


    colorMode = localStorage.setItem('color', 'light');

});

// On Load stay Color Mode Selected

let colorMode = localStorage.getItem('color')
function getColorMode() {
    if(!colorMode){
        colorMode = localStorage.setItem('color', 'light');
    }else{
        if(colorMode === 'light'){
            lightMode.classList.add('active-mode');
            darkMode.classList.remove('active-mode');
            document.body.classList.remove('dark-mode-changed');
        }else{   
            darkMode.classList.add('active-mode');
            lightMode.classList.remove('active-mode');
            document.body.classList.add('dark-mode-changed');
        }
    }
    
}

// Filters

let itens = JSON.parse(localStorage.getItem('item-list'));

filters.forEach(btn => {
    btn.addEventListener('click', () => {
        //console.log(btn);
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        showItem(btn.id);
    })
})

//  Show Itens

function showItem(filter) {
    let li = '';
    if(itens){
        itens.forEach((item, id) => {
            let isCompleted = item.status == 'bought' ? 'checked' : '';
            if(filter == item.status || filter == 'all'){
                li += `<li class="item">
                <label for="${id}">
                    <input onchange="updatePrice(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">Un. ${item.un} - ${item.name} - R$ ${item.price}/un - (R$ ${item.price * item.un})</p>
                </label>
                <div class="settings">
                    <i onclick="showConfirm(this)" class="fa-solid fa-delete-left"></i>
                    <ul class="item-menu">
                        <span> Are you sure?</span>
                        <li onclick="deleteItem(${id})" ><i class="fa-solid fa-circle-check"></i> <span>Yes</span> </li>
                    </ul>
                </div>
            </li>`
            }
            //console.log(id, item);
            
        });
    }
    itemBox.innerHTML = li || `<span> You don't have any item here!</span>`;
}

function showTotal(){
    let soma = 0;
    itens.forEach((item) => {
            soma += (item.un * item.price)
    })

    const total = document.querySelector('#total');

    return total.innerText = `Total: R$ ${soma.toFixed(2)}`
}

showTotal();

showItem('all');

function showConfirm(selectedItem){
    //console.log(selectedItem);
    let itemMenu = selectedItem.parentElement.lastElementChild;
    itemMenu.classList.add('show');
    document.addEventListener('click', e => {
        if(e.target.tagName != 'I' || e.target != selectedItem) {
            itemMenu.classList.remove('show')
        }
    });
}

// Modal calls

let selected = 0; //used for taking the selectedItem.id

function modalCall(selectedItem){
    //console.log(selectedItem);
    let modal = document.querySelector('.modal');
    modal.style.display = 'block';
    selected = selectedItem.id;
    //console.log(selected);
}

function closeModal (){
    let modal = document.querySelector('.modal');
    let check = document.getElementById(`${selected}`);

    modal.style.display = 'none';

    itens[selected].status = 'pending';
    check.checked = false;
    check.parentElement.lastElementChild.classList.remove('checked')
    localStorage.setItem('item-list', JSON.stringify(itens));
}

//Modal Barcode calls

function modalBarcodeCall() {
    let modal = document.querySelector('.modal-barcode');
    modal.style.display = 'block';
}

function closeModalBarcode() {
    let modal = document.querySelector('.modal-barcode');
    result.innerText = '';
    modal.style.display = 'none';
}

// Functions

function addByBarcode(){
    console.log(result.textContent);
    if(result.textContent == ''){
       alert('The Barcode was not found. Try again!');
    }else{
        //console.log(userItem);
        if(!itens){
            itens = [];
        }
        let itemInfo = {name: result.textContent, un: 0, status:'pending', price: 0.00};
        itens.push(itemInfo);
        result.innerText = '';
        localStorage.setItem('item-list', JSON.stringify(itens));
        showItem('all');
        showTotal();
        closeModalBarcode();
    }
}

function priceChange(){
    let userQuant = quantModalInput.value.trim();
    let userPrice = priceModalInput.value.trim();
    if(userQuant > 0){
        itens[selected].un = userQuant;
        if(userPrice > 0){
            itens[selected].price = userPrice;
            
            quantModalInput.value = '';
            priceModalInput.value = '';
    
            localStorage.setItem('item-list', JSON.stringify(itens));
            let modal = document.querySelector('.modal');
            modal.style.display = 'none';
            showItem('all');
            showTotal();
        }else{
            alert('Price is required');
        }
    }else if(userQuant == ''){
        if(userPrice > 0){
            itens[selected].price = userPrice;
            
            quantModalInput.value = '';
            priceModalInput.value = '';
    
            localStorage.setItem('item-list', JSON.stringify(itens));
            let modal = document.querySelector('.modal');
            modal.style.display = 'none';
            showItem('all');
            showTotal();
        }else{
            alert('Price is required');
        }
    }else{
        alert('Invalid quantity!');
    }
    
}

function updatePrice(selectedItem) {
    //console.log(selectedItem);

    //Status
    let itemName = selectedItem.parentElement.lastElementChild;
    if(selectedItem.checked){
        modalCall(selectedItem)
        itemName.classList.add('checked');
        itens[selectedItem.id].status = 'bought';
    }else{
        itemName.classList.remove('checked');
        itens[selectedItem.id].price = 0;
        itens[selectedItem.id].status = 'pending';
    }
    localStorage.setItem('item-list', JSON.stringify(itens));
    showItem('all');
    showTotal();
}

function deleteItem(deleteId) {
    //console.log(deleteId);
    itens.splice(deleteId, 1);
    localStorage.setItem('item-list', JSON.stringify(itens));
    showItem('all');
    showTotal();
}
    

    

    
    
