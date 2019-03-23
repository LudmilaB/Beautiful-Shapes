var c = document.getElementById("shapeCanvas");

var ctx = c.getContext("2d");

function ResizeCanvas()
{
	
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//console.log(window.innerHeight, document.documentElement.clientHeight,document.body.clientHeight);
title_shapes=document.getElementById("title_shapes");
var rect=title_shapes.getBoundingClientRect()
height-=rect.bottom+1;
canvas_div=document.getElementById("canvas_div");
canvas_div.style.height=height;
if(width < 500 || height <500)
{
	var cs = getComputedStyle(c);
	
	if(width < 500 && width < height)
	{
		c.style.width="100%";
		var cwidth  = parseInt( cs.getPropertyValue('width'), 10);
		c.style.height=cwidth;
	}
	else
	{
/*		c.style.height="100%";
		var cheight = parseInt( cs.getPropertyValue('height'), 10);
		  */
		c.style.height=height;
		c.style.width=height;
	}
//	console.log(c.style.width, c.style.height);
}
else 
{
	c.style.width="500";
	c.style.height="500";	
}

//canvas.setAttribute("width",width);

} 

ResizeCanvas();  

var colors=[];
function setColor(num)
{
	var id="color"+num+"Select";
    var Input =document.getElementById(id);
	var Value = Input.value;
    colors[num-1] = Value;	
}

function setLineWidth()
{
    var selectBox = document.getElementById("LineWidthSelect");
    var selValue = selectBox.options[selectBox.selectedIndex].value;
    ctx.lineWidth = Number(selValue);	
}


function setBackgroundColor()
{
    var col = document.getElementById("BackgroundSelect").value;
    document.body.style.background = col;
}
  
var Speed;
function setAnimationSpeed()
{
    var selectBox = document.getElementById("SpeedSelect");
    var selValue = selectBox.options[selectBox.selectedIndex].value;
    Speed = Speeds[Number(selValue)];
}

var corners=0;
function setCorners()
{
    var selectBox = document.getElementById("CornersSelect");
	if(selectBox)
		corners = Number(selectBox.value);
}



//ctx.lineJoin="round";
ctx.lineCap="square";

var point=0;
var Intervalid=0;
ctx.save();

function Draw()
{
	ctx.save();
//	ctx.setLineDash([5,5,25]);
	ctx.beginPath();
	ctx.translate(c.width/2,c.height/2);
	Intervalid=setInterval(Line, Speed);
}

function UpdateAndDraw()
{
	setAnimationSpeed();
	setCorners();
	ctx.restore();
	setLineWidth();
    setBackgroundColor();
	clearInterval(Intervalid);
	ctx.clearRect(0, 0, c.width, c.height);
	point=0;
    Draw();
} 

function ShowSelectMenu()
{
	var show=(document.getElementById("parameters").style.display=="none");
	if(show)
		document.getElementById("parameters").style.display="block";
    else
		document.getElementById("parameters").style.display="none";
}

function LightenDarkenColor(col, amt) 
{
    col = col.slice(1);
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
	
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return "#" + (g | (b << 8) | (r << 16)).toString(16); 
}

function Download()
{
		var download = document.getElementById("download");
		
		var img = resizeImage();
		download.setAttribute("href", img.src);
		download.click();
	//	var im = c.toDataURL("image/png");
	//    download.setAttribute("href", im.src);
			  
}

function resizeImage() {
  var result = new Image();
  var cs = getComputedStyle(c);
  var cwidth  = parseInt( cs.getPropertyValue('width'), 10);
  var canv = document.createElement('canvas');
  canv.width = cwidth;
  canv.height = cwidth;
  canv.getContext('2d').drawImage(c, 0, 0, cwidth, cwidth);
  result.src = canv.toDataURL("image/png");
  return result;
}

var Gradient=0;
var gradient;

function setGradient()
{
    var selectBox = document.getElementById("GradientSelect");
    var selValue = selectBox.options[selectBox.selectedIndex].value;
    Gradient = Number(selValue);	
}

var Density=0;
function setDensity()
{
    var selectBox = document.getElementById("DensitySelect");
    var selValue = selectBox.options[selectBox.selectedIndex].value;
    Density = Number(selValue);	
}

