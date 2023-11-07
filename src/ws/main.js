import io from 'socket.io-client'
// const BASE_URL = 'http://localhost:3000/ws';

let options = {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzc3VlciI6ImZyb250LWFwcC11cmwiLCJ1c2VyIjp7ImlkIjoxLCJ0eXBlIjoicmVhbHRvciIsInNjb3BlcyI6WyJhbm5vdW5jZW1lbnQ6Y3JlYXRlIiwiYW5ub3VuY2VtZW50OnJlYWQiLCJhbm5vdW5jZW1lbnQ6ZGVsZXRlIiwiYW5ub3VuY2VtZW50OndyaXRlIiwid2FsbGV0OmNyZWF0ZSIsIndhbGxldDpyZWFkIiwid2FsbGV0OmRlbGV0ZSIsIndhbGxldDp3cml0ZSIsImNvbW1lbnQ6Y3JlYXRlIiwiY29tbWVudDpkZWxldGUiLCJjb21tZW50OnJlYWQiLCJjb21tZW50OndyaXRlIiwiYWNjb3VudHM6Y3JlYXRlIiwiYWRtaW5fY2hhdDpjcmVhdGUiLCJhZHZlcnRpc2VtZW50OmNyZWF0ZSIsImFubm91bmNlbWVudHNfYWR2ZXJ0aXNpbmc6Y3JlYXRlIiwiY2hhdDpjcmVhdGUiLCJjb21wYW55OmNyZWF0ZSIsImNvbXBhbnlfdXNlcjpjcmVhdGUiLCJjb21wbGFpbnQ6Y3JlYXRlIiwiY29tcGxhaW50X2NoYXQ6Y3JlYXRlIiwiZGFzaGJvYXJkOmNyZWF0ZSIsImZlYXR1cmU6Y3JlYXRlIiwiZmVlZGJhY2s6Y3JlYXRlIiwibm90aWZpY2F0aW9uOmNyZWF0ZSIsInNhdmVkX2Fubm91bmNlbWVudDpjcmVhdGUiLCJ0cmFuc2FjdGlvbjpjcmVhdGUiLCJ0cmFuc2xhdGlvbjpjcmVhdGUiLCJ0cmFuc2xhdGlvbl9rZXk6Y3JlYXRlIiwiYWNjb3VudHM6d3JpdGUiLCJhZG1pbl9jaGF0OndyaXRlIiwiYWR2ZXJ0aXNlbWVudDp3cml0ZSIsImFubm91bmNlbWVudHNfYWR2ZXJ0aXNpbmc6d3JpdGUiLCJjaGF0OndyaXRlIiwiY29tcGFueTp3cml0ZSIsImNvbXBhbnlfdXNlcjp3cml0ZSIsImNvbXBsYWludDp3cml0ZSIsImNvbXBsYWludF9jaGF0OndyaXRlIiwiZGFzaGJvYXJkOndyaXRlIiwiZmVhdHVyZTp3cml0ZSIsImZlZWRiYWNrOndyaXRlIiwibm90aWZpY2F0aW9uOndyaXRlIiwic2F2ZWRfYW5ub3VuY2VtZW50OndyaXRlIiwidHJhbnNhY3Rpb246d3JpdGUiLCJ0cmFuc2xhdGlvbjp3cml0ZSIsInRyYW5zbGF0aW9uX2tleTp3cml0ZSIsImFjY291bnRzOnJlYWQiLCJhZG1pbl9jaGF0OnJlYWQiLCJhZHZlcnRpc2VtZW50OnJlYWQiLCJhbm5vdW5jZW1lbnRzX2FkdmVydGlzaW5nOnJlYWQiLCJjaGF0OnJlYWQiLCJjb21wYW55OnJlYWQiLCJjb21wYW55X3VzZXI6cmVhZCIsImNvbXBsYWludDpyZWFkIiwiY29tcGxhaW50X2NoYXQ6cmVhZCIsImRhc2hib2FyZDpyZWFkIiwiZmVhdHVyZTpyZWFkIiwiZmVlZGJhY2s6cmVhZCIsIm5vdGlmaWNhdGlvbjpyZWFkIiwic2F2ZWRfYW5ub3VuY2VtZW50OnJlYWQiLCJ0cmFuc2FjdGlvbjpyZWFkIiwidHJhbnNsYXRpb246cmVhZCIsInRyYW5zbGF0aW9uX2tleTpyZWFkIiwiYWNjb3VudHM6ZGVsZXRlIiwiYWRtaW5fY2hhdDpkZWxldGUiLCJhZHZlcnRpc2VtZW50OmRlbGV0ZSIsImFubm91bmNlbWVudHNfYWR2ZXJ0aXNpbmc6ZGVsZXRlIiwiY2hhdDpkZWxldGUiLCJjb21wYW55OmRlbGV0ZSIsImNvbXBhbnlfdXNlcjpkZWxldGUiLCJjb21wbGFpbnQ6ZGVsZXRlIiwiY29tcGxhaW50X2NoYXQ6ZGVsZXRlIiwiZGFzaGJvYXJkOmRlbGV0ZSIsImZlYXR1cmU6ZGVsZXRlIiwiZmVlZGJhY2s6ZGVsZXRlIiwibm90aWZpY2F0aW9uOmRlbGV0ZSIsInNhdmVkX2Fubm91bmNlbWVudDpkZWxldGUiLCJ0cmFuc2FjdGlvbjpkZWxldGUiLCJ0cmFuc2xhdGlvbjpkZWxldGUiLCJ0cmFuc2xhdGlvbl9rZXk6ZGVsZXRlIl19LCJpYXQiOjE2OTcwMDUzMTAsImV4cCI6MTY5NzA0MTMxMH0.oTASNJEi8oLMWK6Ecui3qM5Qkdmk6tU1YKEeX-3t0uA"},
    },
  },
};

var socket = io(BASE_URL, options);

var messages = document.getElementById('messages')
 
var form = document.getElementById('form')
var input = document.getElementById('input')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (input.value) {
    socket.emit('new_complaint_chat', {
      sender_id: 1,
      complaint_id: 1,
      message: input.value,
    })
    input.value = ''
  }
})

socket.on('complaints', function (msg) {

  // messages object id and name
  var item = document.createElement('li')
  item.textContent = msg.id + ' : ' + msg.message + ' : ' + msg.sender_id + ' : ' + msg.contact_id + ' : ' + msg.created_at
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})