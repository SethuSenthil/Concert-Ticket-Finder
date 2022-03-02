export function endpoint(){
    if(window.location.host.startsWith('localhost')){
        return 'http://localhost:4566'
    }else{
        return 'https://concert-ticket-finder.herokuapp.com'
    }
}

let constants = {
    endpoint: endpoint
}

export default constants