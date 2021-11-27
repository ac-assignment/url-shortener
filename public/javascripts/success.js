const link = document.querySelector('#url-result a')
const copyBtn = document.querySelector('#url-result button')

const shortUrl = link.getAttribute('href')
copyBtn.addEventListener('click', function() {
  navigator.clipboard.writeText(shortUrl)
  copyBtn.animate([
    { backgroundColor: '#5a5' }
  ], {
    duration: 1000,
    easing: 'steps(1, start)'
  })
  copyBtn.textContent = 'Copied!'
  Promise.all(
    copyBtn.getAnimations()
      .map(animation => animation.finished)
  ).then(() => {
    copyBtn.textContent = 'Copy'
  })
})