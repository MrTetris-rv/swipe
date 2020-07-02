class Structure {
  render() {
    const phone = document.getElementById("phone");
    const stage0 = document.createElement('div');
    stage0.className = "stage";
    stage0.innerHTML = `
  <div id="stacked-cards-block" class="stackedcards stackedcards--animatable init">
  <div class="stackedcards-container" id="stage">
  </div>
<div class="stackedcards--animatable stackedcards-overlay top">
</div>
<div class="stackedcards--animatable stackedcards-overlay right">

  <div class="star">
    <p class="par">Добавлено в избранное</p>
    <span class="material-icons gold">
      grade
    </span>
  </div>
</div>

<div class="stackedcards--animatable stackedcards-overlay left"></div>

`;
    phone.prepend(stage0);
  

  }
}
const str = new Structure();
str.render();
var ref = firebase.database().ref('result/extractorData/data/0/group');
ref.on('value', gotData, errData);
var imgFood = document.getElementById("img");
var foodName = document.getElementById("foodName");


function gotData(data) {
  var d = 0;
  var scores = data.val();
  var keys = Object.keys(scores);
  class Cards {
    render() {
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var nm = scores[k].Title.text;
        var tx = scores[k].Photo.src;

        console.log(nm, tx);
        const card = document.createElement('div');
        card.className = "card";
        card.innerHTML = ` <div class="card-content">
    <div class="card-image" >
      <img id="img" src="${tx}"/></div>

    <div class="ds closed" id="ds">
      <div class="drag-area">
        <div class="drag-line" onclick="cl()">
        </div>
      </div>
      <p id="foodName">${nm}</p>
      <p id="foodPrice">11 BYN</p>
      <p id="foodCategory">Обед, овощи</p>
      <div class="stars">
        <span class="material-icons gold">
          grade
        </span>
        <span class="material-icons gold">
          grade
        </span>
        <span class="material-icons gold">
          grade
        </span>
        <span class="material-icons gold">
          grade
        </span>
        <span class="material-icons">
          grade
        </span>
      </div>
      <div class="inf">
        <p class="info">Информация о блюде</p>
        <div class="p">Масса: <span> 450 гр.</span></div>
        <div class="p">Ингредиенты: <span> яйцо вареное, хлеб, листья салата, розмарин</span></div>
      </div>
      <div class="place">
        <p class="placeWord">Расположение:</p>
        <div class="placeName">
          <p>Кафе "Мята"</p>
          <p class="address">г. Минск, ул. Ефросиньи Полоцкой 3 </p>
        </div>
      </div>
      <div class="btnOrder">
        <button>Заказать</button>
      </div>
    </div>`;
        stage.append(card);



      }

    }
  }
  const cardFood = new Cards();
  cardFood.render();


}




function cl() {
  document.querySelectorAll('.drag-area').forEach(element => {

    element.parentNode.classList.toggle('closed');
  });
}

function errData(err) {
  console.log("Error");
  console.log(err);
}