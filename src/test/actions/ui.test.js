import { finishLoading, removeError, setError, startLoading } from "../../../src/actions/ui"
import { types } from "../../types/types";


describe('Pruebas en ui', () => {

    test('todas las acciones deben de funcionar', () => {
        
        const action = setError('Error'); 
        expect(action).toEqual({
            type: types.uiSetError,  
            payload: 'Error'
        });


        const action2 = removeError();
        expect(action2).toEqual({
            type: types.uiRemoveError
        });


        const action3 = startLoading();
        expect(action3).toEqual({
            type: types.uiStartLoading
        });


        const action4 = finishLoading();
        expect(action4).toEqual({
            type: types.uiFinishLoading
        });

        
    });


})

