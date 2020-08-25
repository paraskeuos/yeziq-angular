export class LessonStats {
    constructor(private unknownCount: number,
        private unknownPct: number,
        private yeziqCount: number,
        private total: number) {}
    
    public getUnknownCount() {
        return this.unknownCount;
    }

    public getTotal() {
        return this.total;
    }
};