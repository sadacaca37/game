const fs=require('fs');
let adapted=require('./adapt-campaign.js')(fs.readFileSync('work/shell.html','utf8'),fs.readFileSync('work/game3d.js','utf8'));
let html=adapted.html;
for(const [tag,file] of [['LIBRARY','three.min.js'],['CORE','core.js'],['GAME','game3d.js']]){
 let js=tag==='GAME'?adapted.game:fs.readFileSync('work/'+file,'utf8');
 if(tag==='CORE')js+='\n'+fs.readFileSync('work/campaign.js','utf8')+'\n'+fs.readFileSync('work/props-data.js','utf8');
 new Function(js);
 html=html.replace('<!-- '+tag+' -->',()=>'<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script>');
}
fs.writeFileSync('outputs/bridge-assault-3d.html',html);
console.log('Built offline 3D game: '+html.length+' bytes');
