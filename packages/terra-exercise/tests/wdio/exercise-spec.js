Terra.describeViewports('Exercise', ['tiny', 'medium', 'large'], () => {
  describe('Default', () => {
    before(() => browser.url('/raw/tests/terra-exercise/exercise/default-exercise'));

    it('validates the element', () => {
      Terra.validates.element();
    });
  });
});
