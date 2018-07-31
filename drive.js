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
        h+='connection string: <select><option>fill new or select one</option></select><br>'
        h+='&nbsp;<br>'
        h+='domain <input id="mongoDomain">:<input id="mongoPort" size=9><br>'
        h+='user <input id="mongoUser" size=10> '
        h+='password <input id="mongoPassword" type="password" size=10><br>'
        h+='&nbsp;<br>'
        h+='name: <input id="mongoName" size=10> <button id="saveConnection" class="btn btn-primary">save</button>* <button class="btn btn-warning">delete</button><br>'
        h+='&nbsp;* <span style="font-size:small">only if you trust this machine</span><br>'
        h+='&nbsp;<br>'
        h+='<button id="mongoConnect" class="btn btn-success">Connect</button> <span id="mongoConnectMsg">...</span>'
        h+='<hr>'
        div.innerHTML=h
        div.hidden=true
        div.msg=(txt,clr)=>{
            var msgSp=div.parentElement.querySelector('#mongoMsg')
            msgSp.innerHTML=txt
            msgSp.style.color=clr||'blue'
            //debugger
        }
        div.querySelector('#saveConnection').onclick=()=>{
            div.msg('saving connection xyz at '+Date())
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
    var lk=localStorage.localKey.split('').map(ki=>parseInt(ki))
    if(localStorage[key]){
        return JSON.parse(localStorage['lala'].split(',').map(v=>parseInt(v)).map((v,i)=>String.fromCharCode(v-lk[i])).join(''))
    }else{
        throw('drive item "'+key+'" not found')
    }
}




drive()