import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {port} from "../Variables/localhost";
const CreateProduct = () => {
    // Définir l'état initial pour le nouveau produit
    const initialProductState = { label: "", description: "", price: "" };

    // Utiliser useState pour gérer l'état des données du formulaire
    const [productData, setProductData] = useState(initialProductState);

    // Utiliser useNavigate pour gérer la navigation
    const navigate = useNavigate();

    // Fonction pour gérer les changements dans les données du formulaire
    const handleData = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    // Fonction pour soumettre les données du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Envoyer une requête POST pour ajouter le nouveau produit
            await axios.post(`http://localhost:${port}/MyWebApi/rest/products`, productData);
            console.log("Produit ajouté avec succès");
            // Réinitialiser l'état du formulaire
            setProductData(initialProductState);
            // Rediriger vers la page 'showproduct'
            navigate('/showproduct');
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
        }
    }

    return (
        <>
            <h1 className="h1">Créer un nouveau produit</h1>
            {/* Formulaire pour ajouter un nouveau produit */}
            <form action="#" onSubmit={handleSubmit}>
                <p>
                    <label className="text-dark" htmlFor="prname">Nom du produit : </label>
                    <input className="form-control" type="text" name="label" id="prname" value={productData.label}
                           onChange={handleData}/>
                </p>
                <p>
                    <label className="form-label" htmlFor="prdec">Description du produit : </label>
                    <textarea className="form-control" name="description" id="description" cols="30" rows="5"
                              value={productData.description} onChange={handleData}></textarea>
                </p>
                <p>
                    <label className="form-label" htmlFor="primg">Prix du produit : </label>
                    <input className="form-control" type="number" name="price" id="prprice" value={productData.price}
                           onChange={handleData}/>
                </p>
                <p><input className="btn btn-primary" type="submit" value="Ajouter le produit"/></p>
            </form>
        </>
    )
}

export default CreateProduct;
