function nextVideo(_num = 0) {
    let num = _num;
    const arr = Array.from(document.querySelector('.class_list_con').children).filter(v => v.classList.contains('class_list'));
    function playVideo(num) {
        arr[num].click();
        setTimeout(() => {
            const iframe = document.querySelector('iframe');
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }),'*')
        }, 1000);
    }
    playVideo(num);
    window.addEventListener('message', e => {
        const { data } = e;
        console.log(data);
        const res = JSON.parse(data);
        if (res?.info.playerState === 0) {
            if (arr[num + 1]) {
                num++;
                playVideo(num);
            }
            else {
                alert('동영상이 끝났습니다.');
            }
        }
    });
}
