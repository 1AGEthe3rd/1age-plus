import * as THREE from '../shared/vendor/three.module.js';
import {createWalker} from './walking.mjs';
import {createFloorMaterial,addArchitecture,addContactShade} from './architecture.mjs';
const $=s=>document.querySelector(s),stage=$('#scene'),panel=$('#panel'),body=$('#panel-body'),status=$('#status');
let walker=null,quality=1.5,resize=()=>{};
// Fail closed: no verified membership entitlement service is connected.
// This shell contains no private assets, member data, reward claims or social session.
function show(menu=false){
 body.replaceChildren();$('#panel-title').textContent=menu?'1AGE':'1AGE Plus · Members';
 const make=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;body.append(e);return e;};
 const link=(label,url)=>{const a=make('a',label);a.href=url;return a;};
 if(!menu){
 make('p','Members-only lounge · entrance locked');
 make('p','Membership activation and verification are not connected to this preview.');
 for(const [title,detail] of [['Member lounge','Future shared space with other members.'],['Exclusive drops','Future member-only releases and eligible free digital items.'],['Cash rewards','Future approved rewards credited by the secure Cash ledger.'],['Social events','Future member gatherings, with privacy and moderation.']]){const c=make('article','');c.className='mission-card';const t=document.createElement('strong');t.textContent=title;const p=document.createElement('p');p.textContent=detail;c.append(t,p);}
 make('p','All benefits are planned, not active. Membership does not guarantee rewards or financial returns.');
 link('Existing membership information (test only)','../application.html');
 }else{
 link('1AGE World','https://1age.world/');link('1AGE.com','https://1age.com/');link('1AGE Store','https://1age.store/');
 const select=make('select','');select.setAttribute('aria-label','Graphics resolution');for(const [n,v] of [['Low','0.8'],['Balanced','1.5'],['High','2']])select.add(new Option(n,v));select.value=String(quality);select.onchange=()=>{quality=Number(select.value);resize();};
 const b=make('button','Membership');b.type='button';b.onclick=()=>show();
 }
 walker?.clear();if(!panel.open)panel.showModal();
}
$('#interact').onclick=()=>show();$('#menu').onclick=()=>show(true);$('#reset').onclick=()=>{walker?.clear();walker?.reset();};panel.addEventListener('close',()=>walker?.clear());
try{
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x03060d);
 const camera=new THREE.PerspectiveCamera(64,1,.08,260),renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'low-power'});
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;stage.append(renderer.domElement);
 const std=(color,metalness=.2,roughness=.45)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
 const dark=std(0x121b24,.45),alloy=std(0xc7cdd1,.5,.32),gold=std(0x9d8356,.6,.32),fabric=std(0x233c43,.02,.8),floor=createFloorMaterial();
 const green=new THREE.MeshBasicMaterial({color:0x75e7b6}),warm=new THREE.MeshBasicMaterial({color:0xffe1b4});
 const glass=new THREE.MeshPhysicalMaterial({color:0x9edaff,transparent:true,opacity:.075,side:THREE.DoubleSide,depthWrite:false});
 const mesh=(g,m,x,y,z,parent=scene)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o;};
 const box=(w,h,d,m,x,y,z,parent=scene)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,parent);
 const cyl=(a,b,h,m,x,y,z,parent=scene)=>mesh(new THREE.CylinderGeometry(a,b,h,64),m,x,y,z,parent);
 const ring=(r,t,m,y,parent=scene)=>{const o=mesh(new THREE.TorusGeometry(r,t,8,96),m,0,y,0,parent);o.rotation.x=Math.PI/2;return o;};
 scene.add(new THREE.HemisphereLight(0xe2f1ff,0x465564,1.6));const sun=new THREE.DirectionalLight(0xe5f0ff,1.7);sun.position.set(-12,14,-8);scene.add(sun);
 cyl(11.4,11.5,.32,floor,0,-.16,0);cyl(11.4,11.4,.35,dark,0,5.6,0);mesh(new THREE.CylinderGeometry(10.95,10.95,4.95,96,1,true),glass,0,2.72,0);addArchitecture(scene);ring(10.75,.045,warm,.026);
 let seed=47;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296),points=[];for(let i=0;i<2000;i++){const a=rand()*Math.PI*2,v=rand()*2-1,r=106+rand()*32;points.push(Math.cos(a)*Math.sqrt(1-v*v)*r,v*r,Math.sin(a)*Math.sqrt(1-v*v)*r);}
 const stars=new THREE.BufferGeometry();stars.setAttribute('position',new THREE.Float32BufferAttribute(points,3));scene.add(new THREE.Points(stars,new THREE.PointsMaterial({color:0xdceaff,size:.19})));
 const earthMat=std(0x447eb2,0,.9),earth=mesh(new THREE.SphereGeometry(14,48,32),earthMat,-18,9,-47);earth.rotation.z=.18;new THREE.TextureLoader().load(new URL('../shared/world-surface.png',import.meta.url).href,t=>{t.colorSpace=THREE.SRGBColorSpace;earthMat.map=t;earthMat.color.set(0xffffff);earthMat.needsUpdate=true;},undefined,()=>{});
 // Public, nonfunctional architectural shell of the future members lounge.
 for(const side of [-1,1]){const x=side*4.8;for(const z of [-4,-.8]){box(2.8,.45,.9,fabric,x,.42,z);box(2.8,.8,.22,fabric,x,.98,z-.43);box(.12,.52,.92,gold,x-1.35,.55,z);box(.12,.52,.92,gold,x+1.35,.55,z);}cyl(.75,.75,.12,alloy,x,.75,-2.4);cyl(.15,.3,.67,gold,x,.34,-2.4);}
 cyl(2.3,2.5,.18,dark,0,.1,-5);const platform=new THREE.Group();platform.position.z=-5;scene.add(platform);ring(2.2,.035,green,.2,platform);
 for(const x of [-3.4,0,3.4]){cyl(.65,.8,.9,alloy,x,.55,-7.5);cyl(.83,.83,.11,gold,x,1.05,-7.5);}
 // A full-width barrier blocks access; this is navigation, not server authorization.
 const gate=new THREE.Group();gate.position.z=3.6;scene.add(gate);
 const barrier=new THREE.MeshPhysicalMaterial({color:0x294539,transparent:true,opacity:.58,roughness:.2,side:THREE.DoubleSide});
 box(20.9,4.7,.14,barrier,0,2.35,0,gate);for(const x of [-2.4,2.4]){box(.22,4.4,.34,gold,x,2.2,.1,gate);box(.055,4.1,.055,green,x,2.2,.32,gate);}
 box(5,.18,.3,alloy,0,4.15,.2,gate);
 const sign=document.createElement('canvas');sign.width=1024;sign.height=256;const ctx=sign.getContext('2d');ctx.fillStyle='#101e25';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#d7f7e4';ctx.textAlign='center';ctx.font='bold 64px system-ui';ctx.fillText('1AGE PLUS',512,105);ctx.font='36px system-ui';ctx.fillText('MEMBERS · LOCKED',512,185);const texture=new THREE.CanvasTexture(sign);texture.colorSpace=THREE.SRGBColorSpace;mesh(new THREE.PlaneGeometry(4,1),new THREE.MeshBasicMaterial({map:texture}),0,3.45,.3,gate);
 const hub=new THREE.Group();hub.position.set(0,0,5.6);scene.add(hub);addContactShade(scene,0,5.6,1.35);cyl(.68,.85,.66,dark,0,.4,0,hub);ring(.7,.035,warm,.76,hub);
 const plus=new THREE.Group();plus.position.y=1.95;hub.add(plus);box(.23,1.2,.23,green,0,0,0,plus);box(1.2,.23,.23,green,0,0,0,plus);
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
 walker=createWalker(camera,renderer.domElement,{radius:10.15,eyeHeight:1.75,spawn:[0,1.75,8.7],obstacles:[{x:0,z:5.6,r:.9}],allowed:(x,z)=>z>=4.0,paused:()=>panel.open,onTap:e=>{const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);if(ray.intersectObjects([hub,gate],true).length)show();}});
 addEventListener('keydown',e=>{if(e.code==='KeyE'&&!panel.open&&!e.repeat&&!e.target?.closest?.('input,textarea,select'))show();});
 resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,quality));renderer.setSize(innerWidth,innerHeight);};resize();addEventListener('resize',resize);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();renderer.setAnimationLoop(null);status.textContent='3D unavailable. Membership information remains accessible.';});
 let last=performance.now();status.textContent='';renderer.setAnimationLoop(now=>{const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;walker.update(dt);earth.rotation.y+=dt*.025;plus.rotation.y+=dt*.4;renderer.render(scene,camera);});
}catch(error){console.error(error);status.textContent='3D unavailable. Membership information remains accessible.';}
