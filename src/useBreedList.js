import { useGetBreedsQuery } from "./petApiService";

export default function useBreedList(animal) {
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  // return value when is empty
  if (!animal) {
    return [[], "loaded"];
  }

  return [breeds ?? [], isLoading ? "loading" : "loaded"];
}
