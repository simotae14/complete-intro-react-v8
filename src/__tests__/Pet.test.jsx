import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';

import Pet from '../Pet';

test('display a default thumbnail', async () => {
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );

  // retrieve the pet thumbnail
  const petThumbnail = await pet.findByTestId('thumbnail');
  // assert if the petThumbnail element contains the correct src
  expect(petThumbnail.src).toContain('none.jpg');
  // unmount the component
  pet.unmount();
});

test('display a non-default thumbnail', async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );

  // retrieve the pet thumbnail
  const petThumbnail = await pet.findByTestId('thumbnail');
  // assert if the petThumbnail element contains the correct src
  expect(petThumbnail.src).toContain('1.jpg');
  // unmount the component
  pet.unmount();
});