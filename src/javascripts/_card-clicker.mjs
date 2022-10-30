function makeCardClickable () {
  const cards = document.querySelectorAll('.card')
  cards.forEach(function (card) {
    const links = card.querySelectorAll('a')
    const lastLink = links[links.length - 1]
    if (lastLink) {
      const url = lastLink.getAttribute('href')
      card.classList.add('clickable')
      card.addEventListener('click', function (e) {
        location.href = url
        e.preventDefault()
      })
    }
  })
}

function init () {
  if ('querySelector' in document) makeCardClickable()
}

export default { init }
