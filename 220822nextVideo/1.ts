function nextVideo(_num = 0){
    let num = _num;
    const arr = (Array.from(document.querySelector('.class_list_con').children) as HTMLDivElement[]).filter(v => v.classList.contains('class_list'))
    function playVideo(num:number){
        arr[num].click();
        setTimeout(() => {
            const iframe = document.querySelector('iframe');
            let src = iframe.src;
            if(!(src.includes('autoplay'))){
                iframe.src = `${src}&autoplay=1`;
            }
            iframe.setAttribute('allowscriptaccess',"always"); 
        }, 1000);
    }
    playVideo(num);
    window.addEventListener('message', e => {
        const { data } = e;
        const res = JSON.parse(data) as {info:{playerState:number}};
        if(res?.info.playerState === 0){
            if(arr[num + 1]){
                num++;
                playVideo(num);
            } else {
                alert('동영상이 끝났습니다.')
            }
        }
    });
}

