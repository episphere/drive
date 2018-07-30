console.log('drive.js loaded')

drive=()=>{ // ini
    Object.keys(drive.path).forEach((k)=>{
        var el = document.body.querySelector('#mongo')
        if(el){
            let hd = el.querySelector('h3')
            if(hd&&drive[k]){
                hd.onclick=drive[k]
                hd.onmouseover=()=>{
                    hd.style.cursor='hand'
                    hd.style.backgroundColor='yellow'
                }
                hd.onmouseout=()=>{
                    hd.style.backgroundColor=''
                }
                if(location.hash.match('mongo','i')){
                    hd.click()
                }
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
    // populate UI

}


drive()