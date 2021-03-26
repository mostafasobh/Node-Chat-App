// const moment = require('moment')
// const $ = require('jquery')
let select = (el) => document.querySelector(el) 

function scrollBottom() {
  let messages = jQuery('#messages')
  let newMessage=  messages.children('li:last-child')

  let clientHeight = messages.prop('clientHeight')
  let scrollTop = messages.prop('scrollTop')
  let scrollHeight = messages.prop('scrollHeight')
  let newMessageHeight =newMessage.innerHeight()
  let lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

const socket = io();
socket.on('connect', function () {
  let params = jQuery.deparam(window.location.search)
  socket.emit('join', params, (err) => {
    err ? (alert(err), window.location.href = '/') : console.log('No Errors')
  })
})

socket.on('newMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('LT')
  let template = jQuery('#message-template').html()
  let html = Mustache.render(template, {
    text: message.text,
    from:message.from,
    createdAt:formattedTime,
  })

  jQuery('#messages').append(html)
  scrollBottom()
  // console.log('newMessage',message)
})
socket.on('disconnect',function(){
  console.log('disconnected from server')
})
socket.on('updateUserList',function(users){
  let ol = jQuery('<ol></ol>')
  users.forEach((user) => {
    ol.append(jQuery('<li></li>').text(user))
  })

  jQuery('#users').html(ol)
})

socket.on('newLocationMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('LT')
  let template = jQuery('#location-message-template').html()
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url:message.url
  })
  jQuery('#messages').append(html)
  scrollBottom()
  
  // let li = document.createElement('li')
  // let a = document.createElement('a')
  // a.target='_blank'
  // li.innerHTML=`${message.from} ${formattedTime}: `
  // a.href= message.url
  // a.innerHTML='My current location'
  // li.appendChild(a)
  // document.querySelector('#messages').appendChild(li)
})


document.querySelector('#message-form').addEventListener('submit', function (e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: select('[name=message]').value,
  }, (res) => {
    select('[name=message]').value=''
  })
})

let locationButton = document.querySelector('#send-location')
locationButton.addEventListener('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported')
  }
  locationButton.disabled= true
  locationButton.innerHTML='Sending location ...'
  navigator.geolocation.getCurrentPosition((position) => {
 
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude:position.coords.longitude
    })
      console.log(position)
  }, function () {
    alert('unable to fetch location')
  })
})