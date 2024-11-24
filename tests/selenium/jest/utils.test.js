import utils from 'public/js/utils';

describe('utils.inform', () => {
    let consoleErrorSpy;
    let consoleLogSpy;
    let alertSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should log an error when isError is true', () => {
        const message = 'This is an error!';
        utils.inform(true, message);

        expect(consoleErrorSpy).toHaveBeenCalledWith(message);
        expect(consoleLogSpy).not.toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith(message);
    });

    test('should log a message when isError is false', () => {
        const message = 'This is a regular message.';
        utils.inform(false, message);

        expect(consoleLogSpy).toHaveBeenCalledWith(message);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith(message);
    });
});
