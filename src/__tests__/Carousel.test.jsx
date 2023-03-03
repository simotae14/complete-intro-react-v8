import { expect, test } from 'vitest';
import { render } from '@testing-library/react';

import Carousel from '../Carousel';

test('lets users click on thumbnails to make them the hero', async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  // retrieve the hero image
  const hero = await carousel.findByTestId('hero');
  // check if the default one is the first one
  expect(hero.src).toContain(images[0]);

  // then simulate the click on every thumbnail and check the hero
  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    // retrieve the thumbnail to click on
    const thumb = await carousel.findByTestId(`thumbnail${i}`);
    // click on the thumbnail
    await thumb.click();

    // check if the hero is now the thumbnail selected
    expect(hero.src).toContain(image);

    // check if the the clicked thumb has the calls active
    expect(Array.from(thumb.classList)).toContain('active');
  }

  // unmount the component
  carousel.unmount();
});