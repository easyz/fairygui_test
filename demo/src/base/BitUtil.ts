class BitUtil {
	public static Has(value: number, bit: number): boolean {
		return (value & (1 << bit)) > 0
	}

	public static Set(value: number, bit: number, state: boolean): number {
        if (state) {
            value |= 1 << (bit & 0xff)
        } else {
            value &= ~(1 << (bit & 0xff))
        }
		return value
	}
}