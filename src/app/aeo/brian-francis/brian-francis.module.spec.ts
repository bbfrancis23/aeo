import { BrianFrancisModule } from './brian-francis.module';

describe('BrianFrancisModule', () => {
  let brianFrancisModule: BrianFrancisModule;

  beforeEach(() => {
    brianFrancisModule = new BrianFrancisModule();
  });

  it('should create an instance', () => {
    expect(brianFrancisModule).toBeTruthy();
  });


});
