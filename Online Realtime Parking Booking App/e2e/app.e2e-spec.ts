import { RealtimeparkingapplicationPage } from './app.po';

describe('realtimeparkingapplication App', function() {
  let page: RealtimeparkingapplicationPage;

  beforeEach(() => {
    page = new RealtimeparkingapplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
