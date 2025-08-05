function capitalFirstLetterOfStr(str){
   
    let ans=str.split(' ');
    let bag="";
    for(let i=0;i<ans.length;i++){
        bag+=ans[i][0].toUpperCase()+ans[i].slice(1)+" "

    }
    console.log(bag)
}


let str="my name is jitu";

capitalFirstLetterOfStr(str)