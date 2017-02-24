export function websockit(options){
    let {url,data,onmessage,onclose} = options;
    let ws = new WebSocket(url);
    ws.onopen = function(){
        data = typeof data == 'string'?data:JSON.stringify(data);
        ws.send(data);
    }
    ws.onmessage = function(event){
        let res = window.JSON.parse(event.data);
        if(onmessage)onmessage(res);
    }
    ws.onclose = function(){
        if(onclose)onclose();
    }
}