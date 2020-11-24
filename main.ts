//% color="#35D482" weight=30 icon="\uf11b" block="呼噜猫遥控器通信确认"
namespace HuLuMaoRemote_connection {
    /**
     * 调用此来建立MicroBit与遥控器的通信
     * @param index
    */
    //% blockId=HuLuMaoRemote_connection_con block="建立 MicroBit 与遥控器的通信"
    //% weight=100
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function con(): void {
        let length;
        for(let i=0;i<20;i++){
            length=pins.i2cReadNumber(66, NumberFormat.Int8LE);
            if(length==55){
                basic.showIcon(IconNames.Yes);
                basic.pause(1000);
                basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `);
                break;
            }
            else{
                basic.showIcon(IconNames.No);
            }
        }
    }

    /**
     * 调用此来建立遥控器与小车的通信,并设置一个通信密码(最大为255)
     * @param index
    */
    //% blockId=HuLuMaoRemote_connection_con1 block="建立遥控器与小车的通信,通信密码为|%index"
    //% weight=99
    //% blockGap=10
    //% index.min=1 index.max=255
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function con1(index:number): void {
        let data=0;
        for(let i=0;i<8;i++){
            pins.i2cWriteNumber(75, index, NumberFormat.UInt8LE);
        }
        while(data!=2){
            basic.pause(10);
            data=pins.i2cReadNumber(75, NumberFormat.Int8LE);
            basic.showIcon(IconNames.SmallSquare);
        }
        basic.showIcon(IconNames.Square);
        basic.pause(1000);
        basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
        `);
    }
}

//% color="#35D482" weight=29 icon="\uf11b" block="呼噜猫遥控器传感器类"
namespace HuLuMaoRemote {

    export enum ultrasonicState{
        //% blockId="OFF" block="关闭"
        Off = 0,
        //% blockId="Open" block="开启"
        Open = 1
    }
    export function IICWrite(value:number,value1:number) {
        
        pins.i2cWriteNumber(value, value1, NumberFormat.UInt8LE);
    }
    export function IICWriteBuf3(value: number, value1: number, value2: number) {
        let buf = pins.createBuffer(2);
        buf[0] = value1;
        buf[1] = value2;
        
        pins.i2cWriteBuffer(value, buf);
    }
    export function IICWriteBuf(value: number, value1: number, value2: number, value3: number, value4: number) {
        let buf = pins.createBuffer(4);
        buf[0] = value1;
        buf[1] = value2;
        buf[2] = value3;
        buf[3] = value4;
        
        pins.i2cWriteBuffer(value, buf);
    }
    function SPIWrite(value: number) {
        pins.spiPins(DigitalPin.P0, DigitalPin.P1, DigitalPin.P2);
        pins.spiFormat(8, 3);
        pins.spiFrequency(100000);
        pins.spiWrite(value);
    }
    /**
     * 选择以打开或关闭遥控器超声波测量距离的功能（有效距离2cm~200cm）
     * @param index
    */
    //% blockId=HuLuMaoRemote_Chao_Sheng_Bo block="超声波测距系统|%index"
    //% weight=110
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Chao_Sheng_Bo(index: ultrasonicState):void {
        basic.pause(10);
        switch (index) {
            case ultrasonicState.Off: IICWrite(65, 1); break;
            case ultrasonicState.Open: IICWrite(65, 2); break;
        }
    }

    /**
     * 调用此将返回超声波的所测到的距离（有效距离2cm~200cm）
     * @param index
    */
    //% blockId=HuLuMaoRemote_Read_Chao_Sheng_Bo block="读取超声波测到的距离(cm)"
    //% weight=109
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Read_Chao_Sheng_Bo(): number {
        let length;
        basic.pause(10);
        length=pins.i2cReadNumber(65, NumberFormat.Int8LE);
        return length;
    }
    /**
     * 选择以打开遥控器人体红外传感器功能
     * @param index
    */
    //% blockId=HuLuMaoRemote_Bodycheck block="当人体传感器检测到人体或者活物时"
    //% weight=98
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Bodycheck():boolean {
        let temp: boolean = false;
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }
    /**
     * 选择以打开遥控器水滴传感器功能
     * @param index
    */
    //% blockId=HuLuMaoRemote_Rain block="当水滴传感器检测到水滴时"
    //% weight=97
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Rain():boolean {
        let temp: boolean = false;
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }

    /**
     * 选择以打开遥控器气体传感器功能，可检测一氧化碳,烟雾，可燃气体等
     * @param index
    */
    //% blockId=HuLuMaoRemote_Gas block="当气体传感器检测到目标气体时"
    //% weight=96
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Gas():boolean {
        let temp: boolean = false;
        if (pins.digitalReadPin(DigitalPin.P3) == 1) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }
    /**
     * 选择以打开心率传感器，用手指按住即可测量心率
     * @param index
    */
    //% blockId=HuLuMaoRemote_heart block="当检测到心跳时"
    //% weight=95
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function heart():boolean {
        let temp: boolean = false;
        let temp1;
        temp1 = pins.analogReadPin(AnalogPin.P3);
        temp1 = (temp1 * 2.89) / 1000;
        if (temp1 > 2) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }
    /**
     * 选择以打开声音传感器功能
     * @param index
    */
    //% blockId=HuLuMaoRemote_Voice block="当声音传感器检测到有声音产生时"
    //% weight=94
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Voice():boolean {
        let temp: boolean = false;
        if (pins.digitalReadPin(DigitalPin.P3) == 0) {
            temp = true;
        }
        else {
            temp = false;
        }
        return temp;
    }

     /**
     * 调用此将返回光敏电阻返回的亮度值（0代表最暗，333代表最亮）
     * @param index
    */
    //% blockId=HuLuMaoRemote_Photoresistor block="读取光敏电阻测到的亮度(0代表最暗，333代表最亮)"
    //% weight=80
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Photoresistor(): number {
        let data;
        data=pins.analogReadPin(AnalogPin.P2);
        data=data*3.18/10;
        return Math.round(data);
    }
    /**
     * 调用此将返回热敏电阻返回的温度值（0代表最冷，333代表最热）
     * @param index
    */
    //% blockId=HuLuMaoRemote_Thermistor block="读取热敏电阻测到的热度(0代表最冷，333代表最热)"
    //% weight=79
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Thermistor(): number {
        let data;
        data=pins.analogReadPin(AnalogPin.P2);
        data=data*3.18/10;
        return Math.round(data);
    }
}
//% color="#35D482" weight=28 icon="\uf11b" block="呼噜猫遥控器音乐类"
namespace HuLuMaoRemote_music {

    export enum yingdiao{
        //% blockId="low" block="低音"
        low = 1,
        //% blockId="mid" block="中音"
        mid,
        //% blockId="high" block="高音"
        high
    }
    export enum Music_name{
        //% blockId="MaiBaoGe" block="卖报歌"
        MaiBaoGe=1,
        //% blockId="DaDianHua" block="打电话"
        DaDianHua,
        //% blockId="LiangZhiLaoHu" block="两只老虎"
        LiangZhiLaoHu,
        //% blockId="XinNianHao" block="新年好"
        XinNianHao,
        //% blockId="IfYouHere" block="名侦探柯南主题曲-如果有你在"
        IfYouHere
    }
    
    /**
     * 打开遥控器的七音符
     * @param index
    */
    //% blockId=HuLuMaoRemote_music_music block="将1到7按键设置为七音符（哆来咪发索拉西）,音调为|%index"
    //% weight=100
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function music(index:yingdiao): void {
        basic.pause(10);
        switch (index) {
            case yingdiao.low: pins.i2cWriteNumber(64, 1, NumberFormat.UInt8LE); break;
            case yingdiao.mid: pins.i2cWriteNumber(64, 2, NumberFormat.UInt8LE); break;
            case yingdiao.high: pins.i2cWriteNumber(64, 3, NumberFormat.UInt8LE); break;
        }   
    }
    /**
     * 播放指定歌曲，在歌曲播放结束之前，无法进行其它操作
     * @param index
    */
    //% blockId=HuLuMaoRemote_music_Play_music block="播放歌曲|%index"
    //% weight=99
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Play_music(index:Music_name): void {
        basic.pause(10);
        pins.i2cWriteNumber(69, index, NumberFormat.UInt8LE);  
    }

    
}
//% color="#35D482" weight=28 icon="\uf11b" block="呼噜猫遥控器按键与延时类"
namespace HuLuMaoRemote_Key {
    export enum key_number{
        //% blockId="_1" block="1"
        _1=1,
        //% blockId="_2" block="2"
        _2,
        //% blockId="_3" block="3"
        _3,
        //% blockId="_4" block="4"
        _4,
        //% blockId="_5" block="5"
        _5,
        //% blockId="_6" block="6"
        _6,
        //% blockId="_7" block="7"
        _7,
        //% blockId="_8" block="8"
        _8,
        //% blockId="_9" block="9"
        _9,
        //% blockId="_10" block="10"
        _10,
        //% blockId="_F1" block="F1"
        _F1,
        //% blockId="_F2" block="F2"
        _F2
    }
     /**
     * 判断指定按键是否按下
     * @param index
    */
    //% blockId=HuLuMaoRemote_Key_Key block="当按键|%index被按下"
    //% weight=100
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Key(index:key_number): boolean {
        let temp: boolean = false;
        let num;
        basic.pause(10);
        num=pins.i2cReadNumber(67, NumberFormat.Int8LE);
        if(num==index){
            temp=true;
        }
        else{
            temp=false;
        }
        return temp;
    }

    /**
     * 判断组合按键是否按下
     * @param index
    */
    //% blockId=HuLuMaoRemote_Key_Key1 block="当按键|%index被按下"
    //% weight=99
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Key1(index:key_number,index1:key_number,speed:number): boolean {
        let temp: boolean = false;
        let num;
        let key_1,key_2;
        key_1=index;
        key_2=index1;
        key_1=(key_1<<8)+key_2;
        pins.i2cWriteNumber(68, key_1, NumberFormat.UInt8LE);
        basic.pause(speed);
        num=pins.i2cReadNumber(68, NumberFormat.Int8LE);
        if(num==key_1){
            temp=true;
        }
        else{
            temp=false;
        }
        return temp;
    }
     /**
     * 选择以调用延时函数
     * @param index
    */
    //% blockId=HuLuMaoRemote_Key_My_delayms block="延时(暂停,ms) %speed"
    //% weight=97
    //% blockGap=10
     //% speed.min=0 speed.max=1000
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function My_delayms(speed:number):void {
        basic.pause(speed);
     }

     /**
     * 选择以调用延时函数
     * @param index
    */
    //% blockId=HuLuMaoRemote_Key_My_delays block="延时(暂停,s) %speed"
    //% weight=96
    //% blockGap=10
     //% speed.min=0 speed.max=1000
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function My_delays(speed:number):void {
        while(speed>0){
            basic.pause(1000);
            speed--;
        }
     }

}
//% color="#35D482" weight=27 icon="\uf11b" block="呼噜猫遥控器与小车通信类"
namespace HuLuMaoRemote_car {
    export enum car{
        //% blockId="forward" block="前进"
        forward=1,
        //% blockId="back" block="后退"
        back,
        //% blockId="turn_left" block="向前左转"
        turn_left,
        //% blockId="turn_right" block="向前右转"
        turn_right,
        //% blockId="turn_back_left" block="向后左转"
        turn_back_left,
        //% blockId="turn_back_right" block="向后右转"
        turn_back_right,
        //% blockId="left_hand" block="原地左旋"
        left_hand,
        //% blockId="right_hand" block="原地右旋"
        right_hand,
         //% blockId="stop" block="停止"
         stop
    }
    /**
     *"接收小车发送过来的指令" 和 "向小车发送指令" 不可在同一程序中使用
     * @param index
    */
    //% blockId=HuLuMaoRemote_car_Car_Remote block="接收小车发送过来的指令"
    //% weight=102
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_Remote():void {
        basic.pause(10);
        pins.i2cWriteNumber(77, 1, NumberFormat.UInt8LE); 
        
    }
    /**
     *"向小车发送指令" 和 "接收小车发送过来的指令" 不可在同一程序中使用
     * @param index
    */
    //% blockId=HuLuMaoRemote_car_Remote_Car block="向小车发送指令"
    //% weight=101
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Remote_Car():void {
        basic.pause(10);
        pins.i2cWriteNumber(77, 2, NumberFormat.UInt8LE); 
        
    }
    /**
     * 选择以打开或关闭小车行驶功能
     * @param index
    */
    //% blockId=HuLuMaoRemote_car_Car_Drive block="遥控器控制小车|%index"
    //% weight=100
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_Drive(index:car):void {
        let buf;
        basic.pause(10);
        switch (index) {
          case car.forward:buf=190;break;
          case car.back:buf=191;break;
          case car.turn_left:buf=192;break;
          case car.turn_right:buf=193;break;
          case car.turn_back_left:buf=194;break;
          case car.turn_back_right:buf=195;break;
          case car.left_hand:buf=196;break;
          case car.right_hand:buf=197;break;
          case car.stop:buf=198;break;
        }
        pins.i2cWriteNumber(76, buf, NumberFormat.UInt8LE); 
    }

    /**
     * 选择以控制小车舵机的转动角度
     * @param index
    */
    //% blockId=HuLuMaoRemote_car_Car_Gear block="遥控器控制小车舵机的角度为 |%speed °"
    //% weight=99
    //% blockGap=10
    //% speed.min=0 speed.max=180
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_Gear(speed:number):void {
        basic.pause(10);
        speed+=1;
        pins.i2cWriteNumber(76, speed, NumberFormat.UInt8LE); 
    }
     /**
     * 调用此将接收小车超声波的所测到的距离（有效距离2cm~200cm）
     * @param index
    */
    //% blockId=HuLuMaoRemote_car_Car_Remote_CM block="接收小车超声波测到的距离(cm)"
    //% weight=98
    //% blockGap=10
    //% color="#35D482"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Car_Remote_CM(): number {
        let length;
        basic.pause(10);
        length=pins.i2cReadNumber(76, NumberFormat.Int8LE);
        return length;
    }
}
