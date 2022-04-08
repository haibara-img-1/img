new Vue({
    el: "#todoapp",
    data:{
        list:[],
        inputValue:""
    },
    mounted(){
        let history = this.getCookie("data");
        console.log(history.length);
        if (history.length > 0){
            this.list = history.split(",");
        }
    },
    methods:{
        add:function (){
            this.list.push(this.inputValue);
            this.inputValue = "";
            this.setCookie("data",this.list.toString(),365);
        },
        del:function (index){
            this.list.splice(index, 1);
            this.setCookie("data",this.list.toString(),365);
        },
        clear:function (){
            this.list = [];
            this.setCookie("data",this.list.toString(),365);
        },
        // setCookie:function (){
        //     console.log(this.list.toString());
        //     document.cookie = this.list.toString();
        //     console.log(document.cookie);
        // },
        setCookie:function (cname,value,exdays){
            let d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires" + d.toUTCString();
            document.cookie = cname + "=" + value + "; " + expires + ";path=/";
        },
        getCookie:function (cname){
            let name = cname + "=";
            let decodeCookie = decodeURIComponent(document.cookie);
            let ca = document.cookie.split(";");
            for(let i = 0; i < ca.length; i++){
                let c = ca[i];
                while (c.charAt(0) == ' '){
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0){
                    return c.substring(name.length,c.length);
                }
            }
            return "";
        }

    }
})