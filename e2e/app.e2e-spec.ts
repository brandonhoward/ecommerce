import { HapiAngularPage } from './app.po';

describe('hapi-angular App', () => {
  let page: HapiAngularPage;

  beforeEach(() => {
    page = new HapiAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
