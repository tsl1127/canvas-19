

var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');//获取上下文
var lineWidth = 3;


autoSetCanvasSize(yyy)


/*监听鼠标事件**/
listenToUser(yyy)


/****控制橡皮擦是否开启***/
var EraserEnabled =false
pen.onclick = function(){
  EraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  // clear.classList.remove('active')
}
eraser.onclick = function(){
  EraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
  // clear.classList.remove('active')
}

clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height);
}

save.onclick = function(){
 var url = yyy.toDataURL("image/png")
//  window.open(url,'_blank')
var a = document.createElement('a')
document.body.appendChild(a)
a.href = url
a.download = '我的画儿'
a.target = '_blank'
a.click()
}


red.onclick = function(){
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')

}

green.onclick = function(){
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}

blue.onclick = function(){
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')
  black.classList.remove('active')
}

black.onclick = function(){
  context.strokeStyle = 'black'
  black.classList.add('active')
  blue.classList.remove('active')
  green.classList.remove('active')
  red.classList.remove('active')
}

thin.onclick = function(){
  lineWidth = 3
}

thick.onclick = function(){
  lineWidth = 5
}


//   eraser.onclick = function(){
//    EraserEnabled = true
//    actions.className = 'actions x'  //前面这个actions是id
   
// }
//   brush.onclick =function(){
//    EraserEnabled =false 
//    actions.className = 'actions'
//   }


/*********/
function autoSetCanvasSize(canvas){
   setCanvasSize()

   window.onresize = function(){
   setCanvasSize()
  }  
  function setCanvasSize (){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth   //canvas和页面一样的宽高
  canvas.height = pageHeight
  } 
}


function drawLine(x1,y1,x2,y2){
  context.beginPath()
  // context.strokeStyle = 'red'
  context.moveTo(x1,y1)  //起点
  context.lineWidth = lineWidth
  context.lineTo(x2,y2)  //终点
  context.stroke()
  context.closePath()
  
}

function listenToUser (canvas){
//function drawCircle(x,y,radius){
 // context.beginPath();
 // context.fillStyle = 'red'
 // context.arc(x,y,radius,0,Math.PI*2);
 // context.fill();
//}

var using = false  //加标记
var lastPoint = {x:undefined,y:undefined}


// 特性检测
if(document.body.ontouchstart !== undefined){
//就是触屏设备，touch事件是OK的
  canvas.ontouchstart = function(a){
    var x=a.touches[0].clientX
    var y=a.touches[0].clientY
    using = true
  if(EraserEnabled){
    //using = true
    context.clearRect(x-5,y-5,10,10)  
  }
  else{
    //using = true
  
    lastPoint = {"x":x,"y":y}
    //console.log(lastPoint)
    //drawCircle(x,y,1)    
  }
  }

  canvas.ontouchmove = function(a){
    var x=a.touches[0].clientX
    var y=a.touches[0].clientY
    if(!using){
      return
    } 
   
  if(EraserEnabled){
      context.clearRect(x-5,y-5,10,10)        
  } else {
    var newPoint={"x":x,"y":y}
    //drawCircle(x,y,1)
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
    lastPoint = newPoint   
         } 
  }

  canvas.ontouchend = function(a){
    using = false
  }
}
else{
  // 非触屏设备
// 按下去鼠标
canvas.onmousedown = function(a){
  // console.log('down')
  var x=a.clientX
  var y=a.clientY
  using = true
if(EraserEnabled){
  //using = true
  context.clearRect(x-5,y-5,10,10)  
}
else{
  //using = true

  lastPoint = {"x":x,"y":y}
  //console.log(lastPoint)
  //drawCircle(x,y,1)    
}

}

//动鼠标
canvas.onmousemove = function(a){  
  // console.log('move')
  var x=a.clientX
  var y=a.clientY
  
  if(!using){
    return
  } 
 
if(EraserEnabled){
    context.clearRect(x-5,y-5,10,10)        
} else {
  var newPoint={"x":x,"y":y}
  //drawCircle(x,y,1)
  drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
  lastPoint = newPoint   
       }

}

//松开鼠标
canvas.onmouseup = function(z){
  // console.log('up')
using = false
    }




}


}

// yyy.ontouchstart = function(a){
//   console.log('wo')
// }
