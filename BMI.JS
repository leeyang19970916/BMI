
var button = document.querySelector("#button")
var list = document.querySelector("#ul")
var data = JSON.parse(localStorage.getItem("listdata")) || []
var initial = document.querySelector("#initial")
var go = document.querySelector("#go")
var replay = document.querySelector("#replay")
var BMIIN = document.querySelector(".BMIIN")
var BMIanswer = document.querySelector(".BMIanswer")
var answer = document.querySelector("#answer") 




//監聽
go.addEventListener("click", givelist, false)
replay.addEventListener("click",again, false)

initial.setAttribute("class", "block")

updatelist(data)
button.addEventListener("click", enter, false)

window.onload = function block(e) {

    e.preventDefault();
    var initial = document.querySelector("#initial")
    if (data == "") {

        initial.setAttribute("class", "block")
    } else {
        initial.setAttribute("class", "none")

    }

}


var BMIIN = document.querySelector(".BMIIN")
var BMIanswer = document.querySelector(".BMIanswer")


function enter(e) {
    e.preventDefault();
    var tall = document.querySelector("#tall").value;
    var weight = document.querySelector("#weight").value
    var talllast = (tall / 100) * (tall / 100);
    var bmi = (weight / talllast).toFixed(2);
  
    button.setAttribute("class","none")
    BMIIN.setAttribute("class","block")
BMIanswer.textContent=bmi

if ((tall == "") || (weight == "")) {
    history.go(0)
    return alert("身高體重輸入錯誤")
}
else {
    if ((tall < 1000) && (weight < 10000)) {

        if (bmi< 18.5) {
            BMIIN.setAttribute("class","blue pt-3  mt-3")
            go.setAttribute("class","blue-bg px-1 py-1")
            
            replay.setAttribute("class","blue-bg-right px-1 py-1")
            answer.style.display="block"
            answer.style.color="skyblue"
            answer.textContent="過瘦"
            
            
            }
            else if ((18.5 <= bmi) && (bmi< 24)) {
            BMIIN.setAttribute("class","green pt-3  mt-3")
            go.setAttribute("class","green-bg px-1 py-1")
            
            replay.setAttribute("class","green-bg-right px-1 py-1")
            answer.style.display="block"
            answer.style.color="green"
            answer.textContent="適中"
            }
            else if ((24 <= bmi) && (bmi< 27)) {
                BMIIN.setAttribute("class","orange pt-3  mt-3")
                go.setAttribute("class","orange-bg px-1 py-1")
                
                replay.setAttribute("class","orange-bg-right px-1 py-1")
                answer.style.display="block"
                answer.style.color="orange"
                answer.textContent="小胖"
            }
            else if ((27 <= bmi) && (bmi < 30)) {
                BMIIN.setAttribute("class","orangered pt-3  mt-3")
                go.setAttribute("class","orangered-bg px-1 py-1")
                
                replay.setAttribute("class","orangered-bg-right px-1 py-1")
                answer.style.display="block"
                answer.style.color="orangered"
                answer.textContent="中胖"
            }
            else if ((30 <= bmi) && (bmi < 35)) {
                BMIIN.setAttribute("class","red pt-3  mt-3")
                go.setAttribute("class","red-bg px-1 py-1")
                
                replay.setAttribute("class","red-bg-right px-1 py-1")
                answer.style.display="block"
                answer.style.color="red"
                answer.textContent="大胖"
            }
            
            else {
                BMIIN.setAttribute("class","black pt-3  mt-3")
                go.setAttribute("class","black-bg px-1 py-1")
                
                replay.setAttribute("class","black-bg-right px-1 py-1")
                answer.style.display="block"
                answer.style.color="black"
                answer.textContent="緞帶肥肥"
            }



    } else {
        history.go(0)
        alert("身高或體重輸入錯誤")
    }

}
}

function again(e) {
    e.preventDefault();
    history.go(0)
    
}

function givelist(e) {
    e.preventDefault();
    var tall = document.querySelector("#tall").value;
    var weight = document.querySelector("#weight").value
    var talllast = (tall / 100) * (tall / 100);
    var bmi = (weight / talllast).toFixed(2);
    var borcolor;
    var title;
    history.go(0)
 
        if ((tall < 10000) && (weight < 10000)) {
            var todo = {
                t: tall,
                w: weight,
                b: bmi
            }
            data.push(todo) 
            localStorage.setItem("listdata", JSON.stringify(data))


            if (list == "") {
                initial.setAttribute("class", "block")
            } else {
                initial.setAttribute("class", "none")
            }
            updatelist(data)
        } else {
            alert("這個算不出來拉")
        }

}
var data = JSON.parse(localStorage.getItem("listdata")) || [] 


function updatelist(data) {
    var Today = new Date();
    var gettoday = Today.getFullYear() + "/" + Today.getMonth()+  "/" + Today.getDate();
    var len = data.length;
    str = "";

    for (var i = 0; i < len; i++) {
        if (data[i].b < 18.5) {
            var colorful = "thin";
            var name = "過瘦"
        }
        else if ((18.5 <= data[i].b) && (data[i].b < 24)) {
            var colorful = "normal"
            var name = "適中"
        }
        else if ((24 <= data[i].b) && (data[i].b < 27)) {
            var colorful = "fat1"
            var name = "小胖"
        }
        else if ((27 <= data[i].b) && (data[i].b < 30)) {
            var colorful = "fat2"
            var name = "中胖"
        }
        else if ((30 <= data[i].b) && (data[i].b < 35)) {
            var colorful = "fat3"
            var name = "大胖"
        }

        else {
            var colorful = "fat4"
            var name = "緞帶肥肥"
        }
        str += '<li class="' + colorful + ' mt-4 w-100 py-4"> <table  ><tbody ><tr ><td class="long"> <span class="pl-3 fw-sm">' + name + '</span> </td>  <td class="long pl-1"><span>BMI: <em class="text "> ' + data[i].b + '</em></span>  </td><td class="long "><span>weight:<em class="text pl-1"> ' + data[i].w + '</em> </span> </td> <td class="long "><span>height:<em class="text "> ' + data[i].t + '</em></span> </td>   <td class="long "><span >' + gettoday + '</span> </td>     <td class="long"><a href="#"  data-num="' + i + '" class="h py-1 px-1 "  >X</a> </td>                          </tr> </tbody></table>   </li>'

    }

    list.innerHTML = str;

}



list.addEventListener("click", dele, false)


var li = document.querySelector(".colorful")


function dele(e) {
    e.preventDefault();

    var node = e.target.nodeName;

    if (node == "A") {
        var datanum = e.target.dataset.num;

        data.splice(datanum, 1)
        localStorage.setItem("listdata", JSON.stringify(data)); 

    }

    if (data == "") {
        initial.setAttribute("class", "block")
    }
    updatelist(data)

}
