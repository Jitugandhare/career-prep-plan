function capitalFirstLetterOfStr(str) {

    // let ans = str.split(' ');
    // let bag = "";
    // for (let i = 0; i < ans.length; i++) {
    //     bag += ans[i][0].toUpperCase() + ans[i].slice(1) + " "

    // }
    // console.log(bag)

    let words=str.split(" ");
    let res=words.map(i=>i.charAt(0).toUpperCase()+i.slice(1)+" ").join(" ")


    console.log(res)
}


let str = "my name is jitu";

capitalFirstLetterOfStr(str)