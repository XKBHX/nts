import { Cpu } from './cpu'

export type AddressingMode = (cpu: Cpu) => number

export const IMP: AddressingMode = (c) => {
    c.fetched = c.a
    return 0
}

export const IMM: AddressingMode = (c) => {
    c.absoluteAddress = c.pc++
    return 0
}

export const ZP0: AddressingMode = (c) => { 
    c.absoluteAddress = c.read(c.pc)
    c.pc++
    c.absoluteAddress = 0x00ff

    return 0
}

export const ZPX: AddressingMode = (c) => {
    c.absoluteAddress = (c.read(c.pc) + c.x)
    c.pc++
    c.absoluteAddress = 0x00ff

    return 0
}

export const ZPY: AddressingMode = (c) => {
    c.absoluteAddress = (c.read(c.pc) + c.y)
    c.pc++
    c.absoluteAddress = 0x00ff

    return 0
}

export const REL: AddressingMode = (c) => {
    c.relativeAddress = c.read(c.pc++)

    if(c.relativeAddress & 0x80) c.relativeAddress |= 0xff00

    return 0
}

export const ABS: AddressingMode = (c) => {
    const lo = c.read(c.pc++)
    const hi = c.read(c.pc++)

    c.absoluteAddress = (hi << 8) | lo

    return 0
}

export const ABX: AddressingMode = (c) => {
    const lo = c.read(c.pc++)
    const hi = c.read(c.pc++)

    c.absoluteAddress = (hi << 8) | lo
    c.absoluteAddress += c.x
    
    if((c.absoluteAddress & 0xff00) !== (hi << 8)) return 1

    return 0
}

export const ABY: AddressingMode = (c) => {
    const lo = c.read(c.pc++)
    const hi = c.read(c.pc++)

    c.absoluteAddress = (hi << 8) | lo
    c.absoluteAddress += c.y
    
    if((c.absoluteAddress & 0xff00) !== (hi << 8)) return 1

    return 0
}

export const IND: AddressingMode = (c) => {
    const loPointer = c.read(c.pc++)
    const hiPointer = c.read(c.pc++)
    const pointer = (hiPointer << 8) | loPointer

    c.absoluteAddress = (c.read(pointer + 1) << 8) | c.read(pointer + 0)
    
    return 0
}

export const IZX: AddressingMode = (c) => {
    const t = c.read(c.pc++)
    const lo = c.read((t + c.x) & 0x00ff)
    const hi = c.read((t + c.x + 1) & 0x00ff)

    c.absoluteAddress = (hi << 8) | lo
    
    return 0
}

export const IZY: AddressingMode = (c) => {
    const t = c.read(c.pc++)
    const lo = c.read(t & 0x00ff)
    const hi = c.read((t + 1) & 0x00ff)

    c.absoluteAddress = (hi << 8) | lo
    c.absoluteAddress += c.y 
    
    if((c.absoluteAddress & 0xff00) !== (hi << 8)) return 1

    return 0
}