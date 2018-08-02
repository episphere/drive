console.log('drive.js loaded')

drive=()=>{ // ini
    Object.keys(drive.path).forEach((k)=>{
        var el = document.body.querySelector('#mongo')
        if(el){
            let hd = el.querySelector('h4')
            if(hd&&drive[k]){
                hd.onclick=drive[k]
                hd.onmouseover=()=>{
                    hd.style.cursor='hand'
                    hd.style.backgroundColor='yellow'
                }
                hd.onmouseout=()=>{
                    hd.style.backgroundColor=''
                }
                //if(location.hash.match(/mongo/i)){
                    hd.click()
                //}
            }
        }

    })

}

drive.url='http://localhost:8010/drive-62d5f/us-central1/drive'

drive.path={ // same paths as drive service
    'upload':true, //'upload files',
    'listUploaded':true, //'list uploaded files',
    'download':true, //'download files',
    'mongo':true //manage a mongo connection
}

drive.mongo=()=>{
    console.log('clicked mongo at '+Date())
    var div0=document.body.querySelector('#mongo')
    var div=div0.querySelector('#appDiv')
    if (!div){
        div=document.createElement('div')
        div.id='appDiv'
        div.style.color='navy'
        div0.appendChild(div)
        h='<hr>'
        h+='*<span style="font-size:small">only if you trust this machine</span>'
        h+='<div class="form-inline" style="color:gray">'
        h+='<select id="mongoSelect" class="form-control"><option>provide connection string below or select existing one</option></select>'
        h+='&nbsp;<input id="mongoName" class="form-control" placeholder="connection name">'
        h+='&nbsp;<button id="saveConnection" class="btn btn-primary" disabled=true>save*</button>'
        h+='&nbsp;<button id="deleteConnection" class="btn btn-warning" disabled=true>delete</button>'
        h+='</div>'
        h+='&nbsp;<br>'
        h+='<div class="form-inline" style="color:gray">'
        h+='mongo://'
        h+='<input id="mongoUser" class="form-control" placeholder="username" style="width:10em">'
        h+=':<input id="mongoPassword" type="password" class="form-control" placeholder="Password" style="width:10em">'
        h+='@<input id="mongoDomain"  class="form-control" placeholder="domain" style="width:20em">'
        h+=':<input id="mongoPort" class="form-control" placeholder="port" style="width:6em">'
        h+='/<input id="mongoDatabase" class="form-control" placeholder="database" style="width:6em">'
        h+='</div>'
        h+='&nbsp;<br>'
        h+='<button id="mongoConnect" class="btn btn-success">Connect</button> <span id="mongoConnectMsg">...</span>'
        h+='<hr>'
        div.innerHTML=h
        div.hidden=true
        var buildSelect=(v)=>{
            var sel = div.querySelector('#mongoSelect')
            v=v||sel.value
            //remove all options expect head
            for(var i=sel.length-1 ; i>0 ; i--){
                sel.options[i].remove()
            }
            //repopulate from store
            var conns=drive.getItem('driveMongoConnections')
            Object.keys(conns).forEach(k=>{
                var op = document.createElement('option')
                op.value = k
                op.textContent=k+': '+conns[k].domain+'/'+conns[k].db
                sel.appendChild(op)
            })
            sel.onchange=()=>{
                if(sel.selectedOptions[0].index>0){
                    var con = conns[sel.value]
                    div.querySelector('#mongoName').value=sel.value
                    div.querySelector('#mongoDomain').value=con.domain
                    div.querySelector('#mongoPort').value=con.port
                    div.querySelector('#mongoDatabase').value=con.db
                    div.querySelector('#mongoUser').value=con.username
                    div.querySelector('#mongoPassword').value=con.password
                    div.querySelector('#saveConnection').disabled=div.querySelector('#deleteConnection').disabled=false
                }

                //debugger
            }
        }
        buildSelect()


        div.msg=(txt,clr)=>{
            var msgSp=div.parentElement.querySelector('#mongoMsg')
            msgSp.innerHTML=txt
            msgSp.style.color=clr||'blue'
            //debugger
        }
        div.querySelector('#saveConnection').onclick=()=>{
            var conns= drive.getItem('driveMongoConnections')||{}
            conns[div.querySelector('#mongoName').value]={
                username:div.querySelector('#mongoUser').value,
                password:div.querySelector('#mongoPassword').value,
                domain:div.querySelector('#mongoDomain').value,
                port:div.querySelector('#mongoPort').value,
                db:div.querySelector('#mongoDatabase').value
            }
            drive.setItem('driveMongoConnections',conns)
            div.querySelector('#saveConnection').textContent='"'+div.querySelector('#mongoName').value+'" saved'
            div.querySelector('#saveConnection').style.color='green'
            div.querySelector('#saveConnection').style.backgroundColor='yellow'
            setTimeout(_=>{
                 div.querySelector('#saveConnection').textContent='Save*'
                 div.querySelector('#saveConnection').style.color=div.querySelector('#saveConnection').style.backgroundColor=''
            },1000)
            
            //div.msg('saving connection xyz at '+Date())
        }
        div.querySelector('#mongoName').onkeyup=(ev)=>{
            if(div.querySelector('#mongoName').value.length>0){
                div.querySelector('#saveConnection').disabled=div.querySelector('#deleteConnection').disabled=false
            }else{
                div.querySelector('#saveConnection').disabled=div.querySelector('#deleteConnection').disabled=true
            }
            //debugger
        }
        div.querySelector('#mongoConnect').onclick=async ()=>{
            var cs = 'mongo://'+div.querySelector('#mongoUser').value+':'+div.querySelector('#mongoPassword').value+'@'+div.querySelector('#mongoDomain').value+':'+div.querySelector('#mongoPort').value+'/'+div.querySelector('#mongoDatabase').value
            cs= encodeURIComponent(cs);
            fetch(drive.url+'/mongo?connect='+cs).then(x=>{
                x.json().then(y=>{
                    console.log('got ',y)
                })
                //debugger
            })
            //debugger
        }

    }
    

    div.hidden=!div.hidden
    // populate UI

}

drive.setItem=(key,obj)=>{
    var lk=(localStorage.localKey=localStorage.localKey||[...Array(10000).keys()].map(_=>Math.random().toString().slice(2)).join('')).split('').map(ki=>parseInt(ki))
    return localStorage.setItem(key,JSON.stringify(obj).split('').map((o,i)=>(o.charCodeAt()+lk[i])).toString())
}
drive.getItem=(key)=>{
    var lk=(localStorage.localKey=localStorage.localKey||[...Array(10000).keys()].map(_=>Math.random().toString().slice(2)).join('')).split('').map(ki=>parseInt(ki))
    if(localStorage[key]){
        return JSON.parse(localStorage[key].split(',').map(v=>parseInt(v)).map((v,i)=>String.fromCharCode(v-lk[i])).join(''))
    }else{
        return undefined
    }
}




drive()