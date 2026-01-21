let n=[];function l(){const t=document.createElement("div");t.id="flickering-grid",t.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `,document.body.appendChild(t);const e=Math.ceil(window.innerWidth/50),i=Math.ceil(window.innerHeight/50),s=e*i;for(let o=0;o<s;o++){const r=document.createElement("div"),c=o%e*50,d=Math.floor(o/e)*50;r.style.cssText=`
            position: absolute;
            left: ${c}px;
            top: ${d}px;
            width: 50px;
            height: 50px;
            background: transparent;
            transition: background-color 0.3s ease;
        `,t.appendChild(r),n.push(r)}I();let a;window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(()=>{t.remove(),n=[],l()},250)})}function I(){setInterval(()=>{n.forEach(e=>{e.style.background="transparent"});const t=new Set;for(;t.size<20;)t.add(Math.floor(Math.random()*n.length));t.forEach(e=>{const i=n[e],s=.1+Math.random()*.15;i.style.background=`rgba(0, 255, 136, ${s})`})},200)}export{l as initFlickeringGrid};
