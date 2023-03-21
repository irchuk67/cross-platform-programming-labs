let lab4 = require('../lab4/logic')

describe("Lab4 tests", () => {
    it('variable creation: should add variable to Map', () => {
        let commandContent = ['Create', 'c', '6'];
        let commandContent2 = ['Create', 'e', '245'];
        lab4.handleCreate(commandContent);
        lab4.handleCreate(commandContent2);
        expect(lab4.variables.get('c')).toBe('6');
        expect(lab4.variables.get('e')).toBe('245');
    });

    describe('add variables', () => {
        it('two variables', () => {
            let commandContent = ['Add', 'c', 'e'];
            lab4.handleAdd(commandContent);
            expect(lab4.variables.get('c')).toBe('251')
        });
        it('variable and number', () => {
            let commandContent = ['Add', 'e', '78'];
            lab4.handleAdd(commandContent);
            expect(lab4.variables.get('e')).toBe('323')
        })
    })

    describe('subtract variables', () => {
        it('two variables', () => {
            let commandContent = ['Add', 'e', 'c'];
            lab4.handleSubtract(commandContent);
            expect(lab4.variables.get('e')).toBe('72')
        });
        it('variable and number', () => {
            let commandContent = ['Add', 'c', '200'];
            lab4.handleSubtract(commandContent);
            expect(lab4.variables.get('c')).toBe('51')
        })
    })

    it('increment variable', () => {
        let commandContent = ['Increment', 'c'];
        lab4.handleIncrement(commandContent);
        expect(lab4.variables.get('c')).toBe('52')
    })

    it('jump command', () => {
        let commandContent = ['Jump', '2', 'e', '35'];
        expect(lab4.handleJump(commandContent)).toBe(1)
    })
})