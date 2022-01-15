import { lookup } from 'dns';
import { Bus } from './bus';
import { Instruction } from './opcode';

export enum FLAGS {
    C = (1 << 0), //Carry Bit
    Z = (1 << 1), //Zero
    I = (1 << 2), //Disable Interrupts
    D = (1 << 3), //Decimal Mode (implemented?)
    B = (1 << 4), //Break
    U = (1 << 5), //Unused
    V = (1 << 6), //Overflow
    N = (1 << 7)  //Negative
}

export class Cpu {
    bus: Bus;
    a: number;          //Accumulator
    x: number;          //X Register
    y: number;          //Y Register
    sp: number;         //Stack Pointer (points to location on bus)
    pc: number;         //Program oOunter
    status: number;     //Status Register
    fetched: number;
    absoluteAddress: number;
    relativeAddress: number;
    opcode: number;
    cycles: number;
    lookup: Instruction[];

    constructor() {}

    connectBus(bus: Bus) {
        this.bus = bus
        this.a = 0x00
        this.x = 0x00
        this.y = 0x00
        this.sp = 0x00
        this.pc = 0x0000
        this.status = 0x00
        this.fetched = 0x00
        this.absoluteAddress = 0x00
        this.relativeAddress = 0x00
        this.opcode = 0x00
        this.cycles = 0
        this.lookup = []
    }

    write(address: number, data: number) {
        this.bus.write(address, data)
    }

    read(address: number) {
        this.bus.read(address, false)
    }

    clock() {}

    reset() {}

    irq() {}

    nmi() {}

    fetch(): number {}
}