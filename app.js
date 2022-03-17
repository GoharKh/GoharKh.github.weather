const days = document.getElementById('days');
const searching = document.getElementById('searching')
const btn = document.getElementById('btn')
btn.addEventListener('click', weather)
searching.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) weather()
})
async function weather() {
    clearData()
    try {
        const data = await axios.get(`https://weatherdbi.herokuapp.com/data/weather/${searching.value}`)
        // const data = await axios.get(`https://weatherdbi.herokuapp.com/data/weather/Yerevan`)
        console.log(data.data.next_days)
        console.log(data.data.currentConditions)
        currentWeather(data.data.currentConditions)
        nextDays(data.data.next_days)
    }
    catch {
        console.log('error')
    }
    finally {
        console.log("done")
    }
}
function currentWeather(data) {
    const current = document.getElementById('current')
    current.innerHTML = `
    <p class="todayDate">${data.dayhour}</p>
    <div class="all">
      <div class="info">
          <span class="location">${searching.value}</span> <br>
          <span class="todayTemp">${data.temp.c}&deg</span> <br>
      </div>
      <div class="comImg">
          <span class="todayComment">${data.comment}</span>
        <img class="todayImg" src = ${data.iconURL}>
      </div>
    </div>
    `
}
function nextDays(data) {
    data.forEach(element => {
        const eachDay = document.createElement(`div`)
        eachDay.classList.add('eachDay')
        eachDay.innerHTML = `
        <div class="daysAll">
        <span class="daysDate">${element.day}</span> <br>
        <span  class="minMax">${element.min_temp.c}&deg ${element.max_temp.c}&deg</span>
        <span class="daysCom">${element.comment}</span> <br>
        <img class="daysImg" src = ${element.iconURL}>
        </div>
        `
        days.appendChild(eachDay)
    })
}
function clearData() {
    current.innerHTML = ''
    days.innerHTML = ''
}