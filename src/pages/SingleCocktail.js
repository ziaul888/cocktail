import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(`${url} ${id}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic:info,
            strCategory: category,
            strGlass: glass,
            strInstructoins: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail={name,image,category,glass,instructions,ingredients,info}
          setCocktail(newCocktail)
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log();
        setLoading(false);
      }
    }

    getCocktail();
  }, [id]);
if(loading){
  return<Loading/>
}
if(!cocktail){
  return<h2 className="section-title"> no cocktail </h2>
}

 const {image,name,category,ingredients,instructions,info,glass}=cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">back to home</Link>
      <h2 className="section-title">
        {name}
      </h2>
      <div className="drink">
        <img src={image} alt={name}/>
        <div className="drink-info">
          <p>
            <span className="drink-data">name:
            {name}
            </span>
          </p>
          <p>
            <span className="drink-data">category:
            {category}
            </span>
          </p>
          <p>
            <span className="drink-data">info:
            {info}
            </span>
          </p>
          <p>
            <span className="drink-data">glass:
            {glass}
            </span>
          </p>
          
          <p>
            <span className="drink-data">instructions:
            {instructions}
            </span>
          </p>
          <p>
            <span className="drink-data">ingredients:
            </span>
            {ingredients.map((item,index)=>{
       return item? <span key={index}>{item}</span>:null
            })}
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
