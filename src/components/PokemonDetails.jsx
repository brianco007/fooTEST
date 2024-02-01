import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner.jsx";
import "./PokemonDetails.css";
import pokeball from '../assets/pokeball.png'

const PokemonDetails = () => {
  const { id } = useParams();
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const [loading, setLoading] = useState(false);
  const [pokeData, setPokeData] = useState([]);
  
  // states for pokemon pictures
  const [frontPic, setFrontPic] = useState("");
  const [backPic, setBackPic] = useState("");

  //GET request
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setPokeData(res.data);
        setFrontPic(res.data.sprites.front_default);
        setBackPic(res.data.sprites.back_default);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main className="main-details">
          <Link to="/fooTEST">
            <button>Go back</button>
          </Link>

          <section className="details">
          <img src={pokeball} alt="Pokeball1" className="pokeball1" />

            <h1> {pokeData.name} </h1>
            <figure>
              <img src={frontPic} alt="Pokemon picture" />
              <img src={backPic} alt="Pokemon picture" />
            </figure>

            <p>Experience: {pokeData.base_experience} </p>
            <p>Height: {pokeData.height} </p>
            <p>Weight: {pokeData.weight} </p>
            <p>Id: {pokeData.id} </p>
            <p>Order: {pokeData.order} </p>
          </section>
        </main>
      )}
    </>
  );
};

export default PokemonDetails;
