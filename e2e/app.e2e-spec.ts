import { BunkerctlPage } from './app.po';

describe('bunkerctl App', () => {
  let page: BunkerctlPage;

  beforeEach(() => {
    page = new BunkerctlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
