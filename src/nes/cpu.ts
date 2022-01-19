import { IMP } from './addressing';
import { Bus } from './bus';
import { Instruction, instructions } from './opcode';

export enum FLAG {
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
        this.lookup = instructions
    }

    write(address: number, data: number) {
        this.bus.write(address, data)
    }

    read(address: number): number {
        return this.bus.read(address, false)
    }

    clock() {
        if(this.cycles) {
            this.opcode = this.read(this.pc)
            this.pc++
            this.cycles = this.lookup[this.opcode].cycles
            
            const additionalCycles1 = this.lookup[this.opcode].mode(this)
            const additionalCycles2 = this.lookup[this.opcode].operate(this)

            this.cycles += (additionalCycles1 & additionalCycles2)
        }

        this.cycles--
    }

    reset() {}

    irq() {}

    nmi() {}

    fetch(): number {
        if(!(this.lookup[this.opcode].mode === IMP)) this.fetched = this.read(this.absoluteAddress)

        return this.fetched
    }

    setFlag(flag: FLAG, v: boolean) {
        if(v) {
            this.status |= flag
        } else {
            this.status |= ~flag
        }
    }

    /// This NEEDS to be FIXED!!!!
    getFlag(flag: FLAG) {
        return this.status
    }
}