for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, 100)
}

// before let we are using iife and bind

for(var i=0;i<5;i++){
    (function(i){
        setTimeout(()=>{
            console.log(i)
        },100)
    })(i)
}


for(var i=0;i<5;i++){
    setTimeout(console.log.bind(null,i),100)
}