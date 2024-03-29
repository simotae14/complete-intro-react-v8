import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from './useBreedList';
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = [ "bird", "cat", "dog", "rabbit", "reptile" ];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj)
        }}
      >
        {
          adoptedPet ? (
            <div className="pet image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>
          ) : null // you have to remove this semi-colon, my auto-formatter adds it back if I delete it
        }
        <label htmlFor="location">
          Location
          <input
            name="location"
            id="location"
            placeholder="Location"
            type="text"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {
              ANIMALS.map((item) => (
                <option key={item}>{item}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            name="breed"
          >
            <option />
            {
              breeds.map((item) => (
                <option key={item}>{item}</option>
              ))
            }
          </select>
        </label>
        <button>
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;