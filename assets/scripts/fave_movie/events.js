'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api.js')
const ui = require('./ui.js')

$(function () {
  $('#message2').text('New user? Please sign up')
  $('#message3').text('Registered account? Please sign in')
  $('.sign-up').empty()
  $('.sign-in').empty()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('.container').hide()
  $('.movie-info').hide()
})

const onAddFave = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.create(data)
    .then(ui.createFaveSuccess)
    .catch(ui.createFaveFailure)
}

const onGetFaves = (event) => {
  event.preventDefault()
  api.index()
    .then(ui.getFavesSuccess)
    .then(function () {
      $('.delete-fave').on('click', onDestroy)
    })
    .catch(ui.getFavesfailure)
}

const onDestroy = function (event) {
  event.preventDefault()
  const data = $(this).parent().parent().data('id')
  api.destroy(data)
    .then(ui.deleteFaveSuccess)
    .catch(ui.deleteFavefailure)
}

const addHandlers = () => {
  $('.movie-info').on('submit', onAddFave)
  $('#getFaves').on('click', onGetFaves)
}

module.exports = {
  addHandlers
}
