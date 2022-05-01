# Dev In Shop

## _Website using JavaScript, HTML, CSS_

[![N|Solid](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MatheusFilipeFreitas)

<div style="display: inline_block"><br>
  <img align="center" alt="Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="HTML" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg">
  <img align="center" alt="CSS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg">
</div>

_OBS:_
The library used for barcode reader is QuaggaJS. [link for the website](https://serratus.github.io/quaggaJS/)
Site used for generate barcodes: [link](https://barcode.tec-it.com/en/)
## Introduction

- Looking and user functionalities 
  - Site looking
  - Themes
  - Product List (functionalities)
- Programming section
  - item object
  - events
  - themes
  - filters
  - total
  - modals
  - functions
  - ester eggs 
  - barcode init



## Looking and user functionalities 

### Site looking

​	_OBS:_ The site uses your camera to read and auto add an item to your list. For this functionality works, please give permission for using the camera.  

​	You can change the theme at user-menu. Just put your mouse at the user icon.

![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/5.png)



![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/6.png)



<hr>

### Themes



- **Dark Mode:**

  

  ![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/1(default).png)

  

  ![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/1.png)

  

- **Light Mode:**

  

  ![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/2(default).png)

  

  ![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/2.png)



​	If you click the top list icon, will appear an responsive side navigation bar.

​		![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/4.png)



<hr>

### Products list

​	Insert the quantity and the item's name and press enter to add the item to the list.

​	The filters show's your items per status. (For any item filtered as "Bought" is required an price, you can add the price of your item, checking the checkbox after the item description).

​	You can delete any item you want by pressing the delete button.

​	To delete all items, click the button "Clear all".



![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/7.png)



​	By clicking the barcode icon, you activate the barcode reader (this function add a new item to your list, by reading the item`s barcode. You have examples for trying at:

`.\img\barcode\`



![akt text](https://github.com/MatheusFilipeFreitas/DEVinShop/blob/master/img/documentation/8.png)



When the result appears, click the check button to add the item. 



## Programming Section

- item object
- events
- themes
- filters
- total
- modals
- functions
- ester eggs 
- barcode init

### item object

`userItem` (itemInput.value);

`userQuant`(quantInput.value);

```javascript
let itemInfo = {name: userItem, un: userQuant, status:'pending', price: 0.00};
```

### events

Sidebar navigation.

```javascript
hamburguer.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
```



Clear all button.

```javascript
clearAll.addEventListener('click', () => {
    itens.splice(0, itens.length);
    localStorage.setItem('item-list', JSON.stringify(itens));
    showItem('all');
    showTotal();
});
```



### themes

Selectors.

```javascript
const lightMode = document.querySelector('#light-mode')
const darkMode = document.querySelector('#dark-mode');
```



Dark Mode.

```javascript
darkMode.addEventListener('click', () => {
    //console.log('dm');
    
    darkMode.classList.add('active-mode');
    lightMode.classList.remove('active-mode');
    document.body.classList.add('dark-mode-changed');

    colorMode = localStorage.setItem('color', 'dark');

});
```



Light Mode.

```javascript
lightMode.addEventListener('click', () => {
    
    lightMode.classList.add('active-mode');
    darkMode.classList.remove('active-mode');
    document.body.classList.remove('dark-mode-changed');


    colorMode = localStorage.setItem('color', 'light');

});
```



Stay on load theme selected.

```javascript
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
```



### filters

Selector.

```javascript
let itens = JSON.parse(localStorage.getItem('item-list'));
```

Active mode class for CSS.

```javascript
filters.forEach(btn => {
    btn.addEventListener('click', () => {
        //console.log(btn);
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        showItem(btn.id);
    })
});
```

Show items per filter activated.

```javascript
function showItem(filter) {
    let li = '';
    if(itens){
        itens.forEach((item, id) => {
            let isCompleted = item.status == 'bought' ? 'checked' : '';
            if(filter == item.status || filter == 'all'){
                li += `<li class="item">
                <label for="${id}">
                    <input onchange="updatePrice(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">Un. ${item.un} - ${item.name} : R$ ${item.price}/un (R$ ${item.price * item.un})</p>
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
```



### total

Show total on screen.

```javascript
function showTotal(){
    let soma = 0;
    let tam = 0;
    itens.forEach((item) => {
            tam += (item.un * 1);
            soma += (item.un * item.price)
    })

    const total = document.querySelector('#total');
    const itensTotal = document.querySelector('#total-un');
    itensTotal.innerText = `un. ${tam}`;
    return total.innerText = `Total: R$ ${soma.toFixed(2)}`;
}
```



### modals

Global variable (get the selectedItem id).

```javascript
let selected = 0; //used for taking the selectedItem.id
```

Open edit modal (checkbox modal).

```javascript
function modalCall(selectedItem){
    //console.log(selectedItem);
    let modal = document.querySelector('.modal');
    modal.style.display = 'block';
    selected = selectedItem.id;
    //console.log(selected);
}
```

Close edit modal (checkbox modal).

```javascript
function closeModal (){
    let modal = document.querySelector('.modal');
    let check = document.getElementById(`${selected}`);

    modal.style.display = 'none';

    itens[selected].status = 'pending';
    check.checked = false;
    check.parentElement.lastElementChild.classList.remove('checked')
    localStorage.setItem('item-list', JSON.stringify(itens));
}
```

Open barcode modal (barcode icon).

````javascript
function modalBarcodeCall() {
    let modal = document.querySelector('.modal-barcode');
    modal.style.display = 'block';
}
````

Close barcode modal (barcode icon).

```javascript
function closeModalBarcode() {
    let modal = document.querySelector('.modal-barcode');
    result.innerText = '';
    modal.style.display = 'none';
}
```



### functions

- **Adding a new item to items list**

​																From the inputs.
```javascript
itemInput.addEventListener('keyup', e => {
    let userItem = itemInput.value.trim();
    let userQuant = quantInput.value.trim();
    if(e.key == 'Enter' && userItem){
        if(userQuant > 0){
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
```

​														From barcode reader.

```javascript
function addByBarcode(){
    console.log(result.textContent);
    if(result.textContent == ''){
       alert('The Barcode was not found. Try again!');
    }else{
        //console.log(userItem);
        if(!itens){
            itens = [];
        }
        let itemInfo = {name: result.textContent, un: 1, status:'pending', price: 0.00};
        itens.push(itemInfo);
        result.innerText = '';
        localStorage.setItem('item-list', JSON.stringify(itens));
        showItem('all');
        showTotal();
        closeModalBarcode();
    }
}
```

- **Updating an item status and price**

​														Quantity and price.

```javascript
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
```

​																		Status.

```javascript
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
```

- **Deleting item by id (id from checkbox)**

```javascript
function deleteItem(deleteId) {
    //console.log(deleteId);
    itens.splice(deleteId, 1);
    localStorage.setItem('item-list', JSON.stringify(itens));
    showItem('all');
    showTotal();
}
```



### ester eggs

Selectors.

```javascript
const recomendations = document.getElementById('nav-recomendations');
const history = document.getElementById('nav-history');

const notifications = document.getElementById('notification');

const exitBtn = document.getElementById('exit-menu');
const settingsBtn = document.getElementById('settings-menu');
```



Alerts.

```javascript
recomendations.addEventListener('click', () => {
    alert('We don\'t have any recomendations yet!');
});

history.addEventListener('click', () => {
    alert('We are working on this page right now! ;)');
});

notifications.addEventListener('click', () => {
    alert('Notifications are in maintance!');
});


exitBtn.addEventListener('click', () => {
    alert('We can\'t let you exit!');
});

settingsBtn.addEventListener('click', () => {
    alert('This is not ready... We are working on it! ;)');
});
```





### bar code reader lib 

Init.

```javascript
Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#cam')
        },
        decoder: {
            readers: ["code_128_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
```

OnDetected (take the barcode data).

```javascript
 Quagga.onDetected(function (data){
        document.querySelector('.modal-barcode #result').innerHTML = data.codeResult.code;
    });
```



