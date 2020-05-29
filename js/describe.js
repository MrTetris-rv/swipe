// btn = document.getElementById("dbBtn");
// describeText = document.getElementById("ds");
// btn.onmousedown = function (event) {
//   ds.style.position = 'absolute';
//   ds.style.zIndex = 1200;
//   document.body.append(describeText);
//   moveAt(event.pageY);

//   function moveAt(pageY) {
//     describeText.style.top = pageY - describeText.offsetHeight / 3 + 'px';
//     console.log("ge");
//   }

//   function onMouseMove(event) {
//     moveAt(event.pageY);
//   }


//   document.addEventListener('mousemove', onMouseMove);

//   // (4) положить мяч, удалить более ненужные обработчики событий
//   describeText.onmouseup = function () {
//     document.removeEventListener('mousemove', onMouseMove);
//     describeText.onmouseup = null;
//     console.log("asas");
//   };

// };