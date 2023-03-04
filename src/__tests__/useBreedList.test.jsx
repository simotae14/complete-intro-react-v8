import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useBreedList from '../useBreedList';

// we need to create a queryClient because it relies on it
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

// define a function to inject the fake Component
function getBreedList(animal) {
  let list;

  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );

  return list;
}

// define the test
test("gives an empty list with no animal", async () => {
  const [breedList, status] = getBreedList();
  expect(breedList).toHaveLength(0);
  expect(status).toBe('loading');
});