import { expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
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

test("gives an empty list with no animal provided", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe('loading');
});

test("gives back breeds when given an animal", async () => {
  // mock object response
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];
  // mock fetch response
  fetch.mockResponseOnce(
    JSON.stringify({
      animal: 'dog',
      breeds,
    })
  );

  // render the hook
  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  // aspetto che lo status hook sia success
  await waitFor(() => expect(result.current[1]).toBe('success'));

  const [breedList] = result.current;

  expect(breedList).toEqual(breeds);
});