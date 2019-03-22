var Speeds=[10,60];
var angle=0; //168(15)264 point+2  210(12)260 point+2   140(18)point+1   252(10) point+1  504(5) point+2 280(9) point+1 157.5(16)point+1
                //126(20) point+1  ?100.8(25) point+.5 
var point_add=0;

var stars=[ //3 120;  4  90; 5 72; 6 60
		{corners:5, angle:144, point_add:2},
		{corners:7, angle: 257.143, point_add:1},
		{corners:8, angle:135, point_add:2},
		{corners:9, angle:280, point_add:1},  //{corners:9, angle:160, point_add:2},
		{corners:10, angle:252, point_add:1},
		{corners:12, angle:210, point_add:2}, //{corners:12, angle:150, point_add:2},
		{corners:15, angle:168, point_add:2},
		{corners:16, angle:157.5, point_add:1},
		{corners:18, angle:140, point_add:1},
		{corners:20, angle:126, point_add:1},
]

function SetStarParameters()
{
//	console.log(corners);
	for(var i=0; i<stars.length; i++)
	{
		if(corners==stars[i].corners)
		{
			angle=stars[i].angle;
			point_add=stars[i].point_add;
			break;
		}	
	}
}
				
function Line()
{
  if(Gradient==1)
  {
	gradient=ctx.createRadialGradient(0,0,0,0,0,point);
    gradient.addColorStop("0",colors[0]);
	gradient.addColorStop("0.5",colors[1]);
	gradient.addColorStop("1",colors[0]);
    ctx.strokeStyle=gradient;	
  }
  else if(Gradient==2)
  {
	gradient=ctx.createLinearGradient(0,0,0,point);
    gradient.addColorStop("0",colors[0]);
	gradient.addColorStop("1",colors[1]);
    ctx.strokeStyle=gradient;	
  }
  else if(Gradient==0)
    ctx.strokeStyle=colors[point/point_add%2];
 /* else
 {
	ctx.strokeStyle=colors[Math.floor(point/point_add/corners)%2];
	console.log(Math.floor(point/point_add/corners)%2);
 } */

  if(point==0)
  {
		ctx.moveTo(0, 0);
		SetStarParameters();
  }
	
   ctx.lineTo(0, point);
   ctx.stroke();
   ctx.beginPath();
   ctx.moveTo(0, point) ;
   ctx.rotate(-Math.PI*angle/180);   
  if(point>=251) 
  {
	ctx.rotate( Math.PI*angle/180/2);
	clearInterval(Intervalid);
	point=point+point_add;
	ctx.lineTo(0, point*Math.cos(Math.PI*angle/180/2));
	ctx.stroke();
	point=0;
  }

  point=point+point_add;
}  


function Update() 
{   
    for(var i=0; i<2; i++)
		setColor(i+1);
	setGradient();
	point=0;
	UpdateAndDraw();
}

//Update();

function RandomShape()
{
	ctx.restore();
	Gradient=Math.floor(Math.random()*3);
	var i=Math.floor(Math.random()*stars.length);
	corners=stars[i].corners;
	var linewidth=[0.5, 1,1,1,2,2,2,3,3,4,5];
	i=Math.floor(Math.random()*linewidth.length);
	ctx.lineWidth=linewidth[i];
    for(i=0; i<2; i++)
		colors[i]=RandomColor();
	
	clearInterval(Intervalid);
	ctx.clearRect(0, 0, c.width, c.height);
	point=0;
	SetMenu();
    Draw();
}

function RandomColor() {
  var numbers = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += numbers[Math.floor(Math.random() * 16)];
  }
  return color;
}

function SetMenu()
{
	var selectBox = document.getElementById("LineWidthSelect");
    selectBox.value=ctx.lineWidth;
	
	selectBox = document.getElementById("GradientSelect");
    selectBox[Gradient].selected=true;

	selectBox = document.getElementById("CornersSelect");
	selectBox.value=corners;
	
	for(i=0; i<2; i++)
	{
		var id="color"+(i+1)+"Select";
        var Input =document.getElementById(id);
	    Input.value=colors[i];
		console.log(Input.value);
	}
}