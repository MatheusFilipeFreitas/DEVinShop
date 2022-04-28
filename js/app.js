const quantInput = document.querySelector('.item-input .quant'); 
const filters = document.querySelectorAll('.filters span');
const itemInput = document.querySelector('.item-input .prod');
const itemBox = document.querySelector('.item-box');

let itens = JSON.parse(localStorage.getItem('item-list'));

filters.forEach(btn => {
    btn.addEventListener('click', () => {
        //console.log(btn);
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        showItem(btn.id);
    })
})

function showItem(filter) {
    let li = '';
    if(itens){
        itens.forEach((item, id) => {
            let isCompleted = item.status == 'bought' ? 'checked' : '';
            if(filter == item.status || filter == 'all'){
                li += `<li class="item">
                <label for="${id}">
                    <input onclick="updatePrice(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">Un.${item.un} - ${item.name}</p>
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
    itemBox.innerHTML = li;
}

showItem();

function deleteItem(deleteId) {
    //console.log(deleteId);
    itens.splice(deleteId, 1);
    localStorage.setItem('item-list', JSON.stringify(itens));
}

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

function updatePrice(selectedItem) {

    //TODO: Update Price

    //console.log(selectedItem);

    //Status
    let itemName = selectedItem.parentElement.lastElementChild;
    if(selectedItem.checked){
        itemName.classList.add('checked');
        itens[selectedItem.id].status = 'bought';
    }else{
        itemName.classList.remove('checked');
        itens[selectedItem.id].status = 'pending';
    }
    localStorage.setItem('item-list', JSON.stringify(itens));
}

//TODO: Validate inputs

quantInput.addEventListener('keyup', e => {
    let userQuant = quantInput.value.trim();
    if(e.key == 'Enter' && itemInput.value == ''){
        alert('Please add a item and a quantity!')
    }
});

itemInput.addEventListener('keyup', e => {
    let userItem = itemInput.value.trim();
    if(e.key == 'Enter' && userItem){
        //console.log(userItem);
        if(!itens){
            itens = [];
        }
        itemInput.value = '';

        let itemInfo = {name: userItem, un: 0, status:'pending', price: 0.00};
        itens.push(itemInfo);
        localStorage.setItem('item-list', JSON.stringify(itens));
        showItem();
    }
})