// function getCookie(name){
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if(parts.length===2){
//         return parts.pop().split(';').shift();
//     }
// }

document.getElementById('btncreate')
.addEventListener("click", function() {
    const token = localStorage.getItem('token');
    if(token){
        window.location.href='pages/dashboard.html';
    }else{
        window.location.href='pages/login.html';
    }
    
});