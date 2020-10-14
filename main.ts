//% color="#008FFF" weight=2 0 icon="\uf11c" block="呼噜猫遥控器通信确认"
namespace TuoYuCar_connection {
    /**
     * 调用此来建立与遥控器的通信,通信建立成功则返回55
     * @param index
    */
    //% blockId=TuoYuCar_connection_con block="建立与遥控器的通信"
    //% weight=100
    //% blockGap=10
    //% color="#FFAAFF"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function con(): void {
        let length;
        for(let i=0;i<20;i++){
            length=pins.i2cReadNumber(66, NumberFormat.Int8LE);
            if(length==55){
                basic.showIcon(IconNames.Yes);
                break;
            }
            else{
                basic.showIcon(IconNames.No);
            }
        }
    }
}

//% color="#008FFF" weight=2 0 icon="\uf11c" block="呼噜猫遥控器传感器类"
namespace TuoYuCar {

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
     * 选择以打开或关闭小车超声波测量距离的功能（有效距离2cm~200cm）
     * @param index
    */
    //% blockId=TuoYuCar_Chao_Sheng_Bo block="超声波测距系统|%index"
    //% weight=110
    //% blockGap=10
    //% color="#FFAAFF"
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
    //% blockId=TuoYuCar_Read_Chao_Sheng_Bo block="读取超声波测到的距离(cm)"
    //% weight=109
    //% blockGap=10
    //% color="#FFAAFF"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Read_Chao_Sheng_Bo(): number {
        let length;
        basic.pause(10);
        length=pins.i2cReadNumber(65, NumberFormat.Int8LE);
        return length;
    }
    /**
     * 选择以打开小车人体红外传感器功能
     * @param index
    */
    //% blockId=TuoYuCar_Bodycheck block="当人体传感器检测到人体或者活物时"
    //% weight=98
    //% blockGap=10
    //% color="#FFAAFF"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Bodycheck():boolean {
        let temp: boolean = false;
        let temp1;
        basic.pause(10);
        temp1=pins.i2cReadNumber(72, NumberFormat.Int8LE);
        if(temp1==1)
            temp=true;
        else
            temp=false;
        return temp;
    }
    /**
     * 选择以打开小车水滴传感器功能
     * @param index
    */
    //% blockId=TuoYuCar_Rain block="当水滴传感器检测到水滴时"
    //% weight=97
    //% blockGap=10
    //% color="#FFAAFF"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Rain():boolean {
        let temp: boolean = false;
        let temp1;
        basic.pause(10);
        temp1=pins.i2cReadNumber(73, NumberFormat.Int8LE);
        if(temp1==1)
            temp=true;
        else
            temp=false;
        return temp;
    }
}


