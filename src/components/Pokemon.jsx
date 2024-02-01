import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pokemon.css";
import { Link } from "react-router-dom";
import Spinner from "./Spinner.jsx";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]); //Api for 10 pokemons
  const [pokemon, setPokemon] = useState([]); //Pokemon data
  const apiUrl = "https://pokeapi.co/api/v2/pokemon?offset=&limit=10";
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  //GET request
  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((data) => {
        setPokemons(data.data.results);
        setLoading(false);
        setCounter(1);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  //GET request for each Pokemon
  useEffect(() => {
    pokemons.forEach((p) => {
      axios
        .get(p.url)
        .then((data) => {
          setPokemon((prev) => {
            return [...prev, data.data];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [counter]);

  // Using map to render pokecards
  const pokeCard = pokemon.map((ind, index) => {
    return (
      <div key={ind.name} className="pokeCard">
        <p>Pokemon #{ind.id} </p>
        <img src={ind.sprites.front_default} alt="Pokemon Picture" />
        <p>Name: {ind.name} </p>
        <p>Weight: {ind.weight} </p>
        <p>Height: {ind.height} </p>
        <Link to={`/details/${ind.id}`}>
          <button>See More Details</button>
        </Link>
      </div>
    );
  });

  // FILTERS
  // Sort by weight
  const lightestToHeaviest = () => {
    const sortedData = [...pokemon].sort((a, b) => a.weight - b.weight);
    setPokemon(sortedData);
  };
  const heaviestToLightest = () => {
    const sortedData = [...pokemon].sort((a, b) => b.weight - a.weight);
    setPokemon(sortedData);
  };

  // Sort by height
  const shortestToTallest = () => {
    const sortedData = [...pokemon].sort((a, b) => a.height - b.height);
    setPokemon(sortedData);
  };
  const tallestToShortest = () => {
    const sortedData = [...pokemon].sort((a, b) => b.height - a.height);
    setPokemon(sortedData);
  };

  // Sort by number
  const numberUp = () => {
    const sortedData = [...pokemon].sort((a, b) => a.id - b.id);
    setPokemon(sortedData);
  };
  const numberDown = () => {
    const sortedData = [...pokemon].sort((a, b) => b.id - a.id);
    setPokemon(sortedData);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <section className="filters">
            <div className="filter">
              <span>Sort By Weight</span>
              <div>
                <button onClick={heaviestToLightest}>
                  {" "}
                  Heaviest to Lightest{" "}
                </button>
                <button onClick={lightestToHeaviest}>
                  {" "}
                  Lightest to Heaviest
                </button>
              </div>
            </div>

            <div className="filter">
              <span>Sort By height</span>
              <div>
                <button onClick={tallestToShortest}>
                  {" "}
                  Tallest to Shortest{" "}
                </button>
                <button onClick={shortestToTallest}>
                  {" "}
                  Shortest to Tallest{" "}
                </button>
              </div>
            </div>

            <div className="filter">
              <span>Sort By Number</span>
              <div>
                <button onClick={numberUp}> Going Up </button>
                <button onClick={numberDown}> Going Down </button>
              </div>
            </div>
          </section>
          <div className="reset">
            <button onClick={numberUp} className="reset-btn">
              {" "}
              Default Values{" "}
            </button>
          </div>

          <main className="cardsContainer">{pokeCard}</main>
        </div>
      )}
    </>
  );
};

export default Pokemon;
