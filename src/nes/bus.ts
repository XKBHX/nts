import { Cpu } from './cpu';

export class Bus {
    cpu: Cpu;
    ram: ArrayBuffer; // 64KB

    constructor() {
        this.ram = new SharedArrayBuffer(64 * 1024)
        this.cpu = new Cpu()
        this.cpu.connectBus(this)
    }

    write(address: number, data: number) {
        if( address >= 0x0000 && address <= 0xffff) {
            new Uint8Array(this.ram).fill(data, 1, 1)
        }
    }

    read(address: number, readOnly = false): number {
        if( address >= 0x0000 && address <= 0xffff) {
            return this.ram[address]
        }
        return 0x00
    }
}