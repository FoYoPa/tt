window.onload = function() {
  imgLocation('container', 'box')
  var imgData = { "data": [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }, { "src": "6.jpg" }] }
  window.onscroll = function() {
    if (checkflag()) {
      var oParent = document.getElementById('container');
      for (var i = 0; i < imgData.data.length; i++) {
        var aCon = document.createElement('div');
        aCon.className = 'box';
        oParent.appendChild(aCon);
        var boximg = document.createElement('div');
        boximg.className = 'box_img';
        aCon.appendChild(boximg);
        var img = document.createElement('img');
        img.src = "img/" + imgData.data[i].src;
        boximg.appendChild(img);

      }
      imgLocation('container', 'box')
    }
  }

}

function checkflag() {
  var oParent = document.getElementById('container');
  var aCon = getChildElement(oParent, 'box');
  var lastimgHeight = aCon[aCon.length - 1].offsetTop;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
  if (lastimgHeight < scrollTop + pageHeight) {
    return true;
  }
}

function imgLocation(parent, content) {
  var oParent = document.getElementById(parent);
  var aCon = getChildElement(oParent, content);
  var imgWid = aCon[0].offsetWidth;
  var num = Math.floor(document.documentElement.clientWidth / imgWid);
  oParent.style.cssText = "width : " + imgWid * num + "px ;margin : 0 auto ";


  var boxheightArr = [];
  for (var i = 0; i < aCon.length; i++) {
    if (i < num) {
      boxheightArr[i] = aCon[i].offsetHeight;
    } else {
      var minHeight = Math.min.apply(null, boxheightArr);
      var minIndex = getminIndex(boxheightArr, minHeight);
      aCon[i].style.position = 'absolute';
      aCon[i].style.top = minHeight + 'px';
      aCon[i].style.left = aCon[minIndex].offsetLeft + 'px';
      boxheightArr[minIndex] = boxheightArr[minIndex] + aCon[i].offsetHeight;
    }
  }

}

function getminIndex(boxheightArr, minHeight) {
  for (var i in boxheightArr) {
    if (boxheightArr[i] == minHeight) {
      return i;
    }
  }
}



function getChildElement(parent, content) {
  var contentArr = [];
  var aContent = document.getElementsByTagName('*');
  for (var i = 0; i < aContent.length; i++) {
    if (aContent[i].className == 'box') {
      contentArr.push(aContent[i]);
    }
  }
  return contentArr;

}