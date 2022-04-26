// CALL OF MODAL

'use strict'

// modal-add
const openModaladd = () => document.getElementById('add-modal').classList.add('active')
const closeModaladd = () => document.getElementById('add-modal').classList.remove('active')
    // modal
const openModal = () => document.getElementById('edit-modal').classList.add('active')
const closeModal = () => document.getElementById('edit-modal').classList.remove('active')

// EVENT
// modal-add
document.getElementById('addItem').addEventListener('click', openModaladd)
document.getElementById('close-modal-add').addEventListener('click', closeModaladd)
    // modal
document.getElementById('btn-check').addEventListener('click', openModal)
document.getElementById('close-modal').addEventListener('click', closeModal)