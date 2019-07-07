<template>
    <div>
        <div class="item" v-for="(item,index) in dataList">{{item.name}} : {{item.data}}</div>
        <div class="bottom-btn">
            <div class="text-input"><input autofocus type="text" v-model="inputValue" @keyup.enter="send"></div>
            <div @click="send" :class="{'confirm':inputValue != ''}" class="btn">发送</div>
        </div>
    </div>
</template>
<script>
    // import "../../node_modules/sockjs-client/dist/sockjs.js";
    import {getToken,setToken,removeToken} from "../../utils/auth"
    export default {
        data(){
            return {
                inputValue:"",
                dataList:[],
                socket:window.socket,
                connected:false,
                socketId:0
            }
        },
        async mounted(){
            var _this = this;
            this.initDataList();
            await this.initSocketListener();
            // this.initSocketListener();
            if(!getToken()){
                this.$prompt('请输入聊天名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '',
                    showClose:false,
                    showCancelButton:false,
                    closeOnClickModal:false,
                    closeOnPressEscape:false,
                }).then(({ value }) => {
                    setToken(value);
                    if(this.connected){
                        _this.$message({
                            type: 'success',
                            message: `连接成功,id为:${this.socketId},名称为:${getToken()}`
                        });
                    }else{
                        _this.$message({
                            type: 'error',
                            message: `连接失败`
                        });
                    }

                })
            }else{
                if(this.connected){
                    _this.$message({
                        type: 'success',
                        message: `连接成功,id为:${this.socketId},名称为:${getToken()}`
                    });
                }else{
                    _this.$message({
                        type: 'error',
                        message: `连接失败`
                    });
                }
            }
        },
        watch:{
            dataList(){
                this.saveIntoLocalStorage();
            }
        },
        methods:{
            close(){
                this.socket.close();
            },
            initDataList(){
              if(localStorage.getItem("dataList")){
                  this.dataList = JSON.parse(localStorage.getItem("dataList"));
              }
            },
            saveIntoLocalStorage(){
              localStorage.setItem("dataList",JSON.stringify(this.dataList));
            },
            initSocketListener(){
                var _this = this;
                return new Promise((resolve,reject)=>{
                    // this.socket.on('disconnect', function(){});
                    this.socket.on('event', function(data){
                        _this.dataList.push(data);
                    });
                    this.socket.on('connect', function(){
                        if(_this.socket.connected){
                            _this.connected = true;
                            _this.socketId = _this.socket.id;
                        }else{
                            _this.connected = true;
                        }
                        resolve();
                    });
                })
            },
            connect(){
                this.socket.open();
            },
            send(){
                if(this.inputValue == ""){
                    return;
                }
                window.socket.emit("event", {
                    name:getToken(),
                    data:this.inputValue
                });
                this.inputValue = "";
            }
        }
    }
</script>

<style scoped lang="sass" lang="scss">

    .bottom-btn{
        height: 0.5rem;
        line-height: 0.5rem;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: fixed;
        bottom: 0;
        /*left: 0;*/
        /*right: 0;*/
        border-top: 1px solid black;
        width: 640px;
        .text-input{
            width: 2.3rem;
            line-height: 0.5rem;
            input{
                width: 100%;
                height: 0.4rem;
                background: rgba(0,0,0,0.2);
                border-radius: 0.12rem;
                line-height: 0.4rem;
                text-indent: 10px;
                outline: none;
            }
        }
        .btn{
            display: inline;
            width: 0.8rem;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 0.12rem;
            height: 0.4rem;
            background: gray;
            color: #ffffff;
        }
        .confirm{
            background: #22bb22;
        }
    }
    .item{
        padding: 0.1rem;
        box-sizing: border-box;
        width: 3.55rem;
        margin: 0 auto;
        border-bottom: 1px solid gray;
    }
</style>