var data=[
        {label:"HTML5",value:3},
        {label:"CSS3",value:5},
        {label:"JS",value:7},
        {label:"DOM",value:6.5},
        {label:"AJAX",value:8},
        {label:"ANGULAR",value:9},
        {label:"WEB_APP",value:7},
        {label:'框架',value:5}
];
var barWidth=50;
for(var i=0;i<data.length;i++){
    var row=data[i];
    var w=barWidth;
    var h=400*row.value/10;
    var x=(2*i+1)*barWidth;
    var y=400-h;
    var c=rgb();
    //创建渐变对象
    var g=document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
    g.setAttribute('id','g'+i);
    g.setAttribute('x1','0');
    g.setAttribute('y1','0');
    g.setAttribute('x2','0');
    g.setAttribute('y2','100%');
    g.innerHTML=`<stop offset="0" stop-color="${c}"></stop>
                <stop offset="100%" stop-color="${c}"></stop>`;
    effect.appendChild(g);
    //创建矩形
    var rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x',x);
    rect.setAttribute('y',y);
    rect.setAttribute('width',w);
    rect.setAttribute('height',h);
    rect.setAttribute('stroke',c);
    rect.setAttribute('fill',`url(#g${i})`);
    rect.setAttribute('fill-opacity',0.3);
    rect.setAttribute('data-value',row.value);
    rect.setAttribute('data-label',row.label);
    s1.appendChild(rect);
    //创建文本
    var text=document.createElementNS('http://www.w3.org/2000/svg','text');
    text.innerHTML=row.label;
    text.setAttribute('x',x+5);
    text.setAttribute('y',y-3);
    text.setAttribute('fill',c);
    s1.appendChild(text);
};
//为每个柱子添加鼠标悬停事件
s1.onmouseover=function(e){
   var target= e.target;
    if(target.nodeName=='rect'){
        var v=target.getAttribute('data-value');
        target.nextSibling.innerHTML=v;
    }
};
s1.onmouseout=function(e){
    var target= e.target;
    if(target.nodeName=='rect'){
        var v=target.getAttribute('data-label');
        target.nextSibling.innerHTML=v;
    }
};
function rgb(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
};