import { SettingsHandler, ItemsHandler } from '../../src/handlers';
import axios, { AxiosInstance } from 'axios';
import sinon, { SinonSandbox } from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('SettingsHandler', () => {
	let sandbox: SinonSandbox;
	let axiosInstance: AxiosInstance;
	let handler: SettingsHandler;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
		axiosInstance = axios.create();
		handler = new SettingsHandler(axiosInstance);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('Extends ItemsHandler', () => {
		expect(handler).to.be.instanceOf(ItemsHandler);
	});
});
